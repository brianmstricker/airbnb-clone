import { getAuthSession } from "@/utils/getAuthSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";
import { ZodError } from "zod";
import { placeSchema } from "@/utils/placeSchema";

export const GET = async (req: NextRequest, res: NextResponse) => {
 try {
  const placeId = req.nextUrl.searchParams.get("placeId");
  if (!placeId)
   return NextResponse.json({ message: "Place id missing." }, { status: 401 });
  const session = await getAuthSession();
  if (!session?.user) {
   return NextResponse.json(
    { message: "Unauthorized - Log in" },
    { status: 401 }
   );
  } else if (session.user.email) {
   const userDB = await prisma.user.findUnique({
    where: {
     email: session.user.email,
    },
   });
   if (!userDB) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
   const place = await prisma.place.findUnique({
    where: {
     id: placeId,
     userId: userDB.id,
    },
    include: {
     photos: {
      select: { id: true, url: true, placeId: true, index: true },
      orderBy: { index: "asc" },
     },
     perks: true,
    },
   });
   return NextResponse.json(place, { status: 200 });
  }
 } catch {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
 }
};

export const PUT = async (req: NextRequest, res: NextResponse) => {
 try {
  const placeId = req.nextUrl.searchParams.get("placeId");
  if (!placeId)
   return NextResponse.json({ message: "Place id missing." }, { status: 401 });
  const session = await getAuthSession();
  if (!session?.user) {
   return NextResponse.json(
    { message: "Unauthorized - Log in" },
    { status: 401 }
   );
  } else if (session.user.email) {
   const userDB = await prisma.user.findUnique({
    where: {
     email: session.user.email,
    },
   });
   if (!userDB) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
   const body = await req.json();
   const placeData = placeSchema.parse(body);
   const { perks, photos, ...rest } = placeData;
   const editedPlace = await prisma.place.update({
    where: {
     id: placeId,
     userId: userDB.id,
    },
    include: {
     photos: {
      select: { id: true, url: true, placeId: true, index: true },
      orderBy: { index: "asc" },
     },
     perks: true,
    },
    data: {
     ...rest,
    },
   });
   if (editedPlace && perks) {
    await prisma.perk.deleteMany({
     where: {
      placeId: editedPlace.id,
     },
    });
    if (perks && perks.length > 0) {
     const newPerks = perks.map((perk) => {
      if (typeof perk === "object") {
       return {
        name: perk.name,
       };
      }
      return {
       name: perk,
       placeId: editedPlace.id,
      };
     });
     if (newPerks.length > 0) {
      await prisma.perk.createMany({
       data: newPerks.map((perk) => {
        return {
         name: perk.name,
         placeId: editedPlace.id,
        };
       }),
      });
     }
    }
   }
   if (editedPlace && photos && photos.length > 0) {
    const oldPhotos = photos.filter((photo) => photo.url);
    const newPhotos = photos.filter((photo) => !photo.url);
    // console.log("old", oldPhotos);
    // console.log("new", newPhotos);
    const photoIdToIndexMap = new Map();
    oldPhotos.forEach(async (photo, index) => {
     photoIdToIndexMap.set(photo.id, index);
     await prisma.photo.deleteMany({
      where: {
       placeId: editedPlace.id,
       id: { notIn: oldPhotos.map((photo) => photo.id) },
      },
     });
    });
    for (const photo of oldPhotos) {
     const originalIndex = photoIdToIndexMap.get(photo.id);
     await prisma.photo.update({
      where: { placeId: editedPlace.id, id: photo.id },
      data: { index: originalIndex },
     });
    }
    if (newPhotos.length > 0) {
     const photosData = newPhotos.map((photo) => {
      return {
       url: photo,
       placeId: editedPlace.id,
       index: oldPhotos.length + photos.indexOf(photo),
      };
     });
     await prisma.photo.createMany({
      data: photosData,
     });
    }
   }
   if (!editedPlace)
    return NextResponse.json(
     { message: "Something went wrong" },
     { status: 500 }
    );
   return NextResponse.json(editedPlace, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  if (error instanceof ZodError) {
   return NextResponse.json(error.issues, { status: 400 });
  }
  return NextResponse.json(
   { message: "Something went wrong" },
   { status: 500 }
  );
 }
};

export const DELETE = async (req: NextRequest, res: NextResponse) => {
 try {
  const session = await getAuthSession();
  if (!session?.user) {
   return NextResponse.json(
    { message: "Unauthorized - Log in" },
    { status: 401 }
   );
  } else if (session.user.email) {
   const userDB = await prisma.user.findUnique({
    where: {
     email: session.user.email,
    },
   });
   if (!userDB) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
   }
   const id = req.nextUrl.searchParams.get("id");
   if (id) {
    await prisma.place.delete({
     where: {
      id,
     },
    });
    return NextResponse.json(id, { status: 200 });
   }
   return NextResponse.json(
    { message: "Something went wrong" },
    { status: 500 }
   );
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong" },
   { status: 500 }
  );
 }
};

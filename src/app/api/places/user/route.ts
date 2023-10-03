import { getAuthSession } from "@/utils/getAuthSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";
import { ZodError } from "zod";
import { placeSchema } from "@/utils/placeSchema";

// GET /api/places/user - places for a user
export const GET = async (req: NextRequest, res: NextResponse) => {
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
   const places = await prisma.place.findMany({
    where: {
     userId: userDB.id,
    },
    include: {
     photos: true,
     perks: true,
    },
    orderBy: {
     createdAt: "desc",
    },
   });
   return NextResponse.json(places, { status: 200 });
  }
 } catch {
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
 }
};

// POST /api/places/user
export const POST = async (req: NextRequest, res: NextResponse) => {
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
   const body = await req.json();
   const placeData = placeSchema.parse(body);
   const { perks, photos, ...rest } = placeData;
   const newPlace = await prisma.place.create({
    data: {
     ...rest,
     userId: userDB.id,
    },
   });
   if (newPlace && perks && perks.length > 0) {
    const perksData = perks.map((perkName) => {
     return {
      name: perkName,
      placeId: newPlace.id,
     };
    });
    await prisma.perk.createMany({
     data: perksData,
    });
   }
   if (newPlace && photos && photos.length > 0) {
    const photosData = photos.map((photo) => {
     return {
      url: photo,
      placeId: newPlace.id,
     };
    });
    await prisma.photo.createMany({
     data: photosData,
    });
   }
   return NextResponse.json(newPlace, { status: 201 });
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

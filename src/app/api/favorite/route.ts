import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";
import { getAuthSession } from "@/utils/getAuthSession";
import client from "@/app/lib/auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
 try {
  client.$connect();
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
   const findFavorite = await prisma.favorite.findUnique({
    where: {
     userEmail_placeId: {
      placeId: body.placeId,
      userEmail: userDB.email as string,
     },
    },
   });
   if (findFavorite) {
    await prisma.favorite.delete({
     where: {
      id: findFavorite.id,
     },
    });
    return NextResponse.json(findFavorite.id, { status: 200 });
   }
   const favorite = await prisma.favorite.create({
    data: {
     placeId: body.placeId,
     userEmail: userDB.email as string,
    },
   });
   return NextResponse.json(favorite, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
};

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
   const favorites = await prisma.favorite.findMany({
    where: {
     userEmail: userDB.email as string,
    },
    include: {
     place: {
      select: {
       name: true,
       id: true,
       address: true,
       photos: true,
       rating: true,
      },
     },
    },
   });
   return NextResponse.json(favorites, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
};

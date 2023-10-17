import prisma from "@/app/lib/auth";
import { getAuthSession } from "@/utils/getAuthSession";
import { NextRequest, NextResponse } from "next/server";

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
   const reserve = await prisma.reserve.create({
    data: {
     userEmail: userDB.email as string,
     placeId: body.placeId,
     checkInDate: body.checkInDate,
     checkOutDate: body.checkOutDate,
     guests: parseInt(body.guests),
     price: body.price.toString(),
    },
   });
   return NextResponse.json(reserve, { status: 200 });
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
   const reserves = await prisma.reserve.findMany({
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
       checkInTime: true,
       checkOutTime: true,
      },
     },
    },
   });
   return NextResponse.json(reserves, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
};

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";
import { getAuthSession } from "@/utils/getAuthSession";

export async function GET(
 req: NextRequest,
 { params }: { params: { placeId: string } },
 res: NextResponse
) {
 try {
  const placeId = params.placeId;
  if (!placeId)
   return NextResponse.json({ message: "Place not found." }, { status: 404 });
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
   const rating = await prisma.rating.findUnique({
    where: {
     userEmail_placeId: {
      userEmail: userDB.email as string,
      placeId: placeId,
     },
    },
   });
   if (!rating) return NextResponse.json({}, { status: 200 });
   if (rating) return NextResponse.json(rating, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

export async function POST(
 req: NextRequest,
 { params }: { params: { placeId: string } },
 res: NextResponse
) {
 try {
  const placeId = params.placeId;
  if (!placeId)
   return NextResponse.json({ message: "Place not found." }, { status: 404 });
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
   const rating = await prisma.rating.create({
    data: {
     rating: body.rating,
     placeId: placeId,
     userEmail: userDB.email as string,
    },
   });
   return NextResponse.json(rating, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

export async function DELETE(
 req: NextRequest,
 { params }: { params: { placeId: string } },
 res: NextResponse
) {
 try {
  const placeId = params.placeId;
  if (!placeId)
   return NextResponse.json({ message: "Place not found." }, { status: 404 });
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
   const rating = await prisma.rating.delete({
    where: {
     userEmail_placeId: {
      userEmail: userDB.email as string,
      placeId: placeId,
     },
    },
   });
   return NextResponse.json(rating, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

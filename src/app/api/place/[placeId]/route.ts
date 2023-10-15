import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

export async function GET(
 req: NextRequest,
 { params }: { params: { placeId: string } },
 res: NextResponse
) {
 try {
  const placeId = params.placeId;
  const place = await prisma.place.findUnique({
   where: { id: placeId as string },
   include: {
    photos: {
     select: { id: true, url: true, placeId: true, index: true },
     orderBy: { index: "asc" },
    },
    perks: true,
    user: {
     select: { name: true, image: true, email: true },
    },
   },
  });
  if (!place) {
   return NextResponse.json({ message: "Place not found." }, { status: 404 });
  }
  return NextResponse.json(place, { status: 200 });
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

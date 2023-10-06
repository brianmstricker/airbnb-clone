import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

export async function GET(req: NextRequest, res: NextResponse) {
 try {
  const placeId = req.nextUrl.searchParams.get("placeId");
  const place = await prisma.place.findUnique({
   where: { id: placeId as string },
   include: {
    perks: true,
    photos: true,
    user: {
     select: { name: true, image: true },
    },
   },
  });
  return NextResponse.json(place, { status: 200 });
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

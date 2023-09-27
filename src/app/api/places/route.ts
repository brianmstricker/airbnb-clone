import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

// GET /api/places - for all places
export async function GET(req: NextRequest, res: NextResponse) {
 try {
  const places = await prisma.place.findMany({
   include: { photos: true, favorites: true },
  });
  return NextResponse.json(places);
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

// GET /api/places - for all places
export async function GET(req: NextRequest, res: NextResponse) {
 try {
  const typeFilter = req.nextUrl.searchParams.get("search_type");
  if (typeFilter === "all places" || typeFilter === "undefined") {
   const places = await prisma.place.findMany({
    include: { photos: true },
   });
   return NextResponse.json(places);
  }
  if (typeFilter) {
   const lastChar = typeFilter?.slice(-1);
   if (lastChar === "s") {
    const newFilter = typeFilter?.slice(0, -1);
    const places = await prisma.place.findMany({
     where: {
      type: {
       contains: newFilter as string,
      },
     },
     include: { photos: true },
    });
    return NextResponse.json(places);
   }
   const places = await prisma.place.findMany({
    where: {
     type: {
      contains: typeFilter as string,
     },
    },
    include: { photos: true },
   });
   return NextResponse.json(places);
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

// GET /api/places - for all places
export async function GET(req: NextRequest, res: NextResponse) {
 try {
  const typeFilter = req.nextUrl.searchParams.get("search_type");
  if (typeFilter === "all places" || typeFilter === "undefined" || typeFilter === "" || !typeFilter) {
   const places = await prisma.place.findMany({
    include: {
     photos: {
      select: { id: true, url: true, placeId: true, index: true },
      orderBy: { index: "asc" },
     },
     rating: true,
    },
   });
   if (places.length === 0 || !places) {
    return NextResponse.json({ message: "No places found." });
   }
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
       mode: "insensitive",
      },
     },
     include: {
      photos: {
       select: { id: true, url: true, placeId: true, index: true },
       orderBy: { index: "asc" },
      },
      rating: true,
     },
    });
    if (!places || places.length === 0) return NextResponse.json({ message: "No places found.", status: 404 });
    return NextResponse.json(places);
   }
   const places = await prisma.place.findMany({
    where: {
     type: {
      contains: typeFilter as string,
      mode: "insensitive",
     },
    },
    include: {
     photos: {
      select: { id: true, url: true, placeId: true, index: true },
      orderBy: { index: "asc" },
     },
     rating: true,
    },
   });
   if (!places) return NextResponse.json({ message: "No places found." });
   if (places.length === 0 || !places) {
    return NextResponse.json({});
   }
   return NextResponse.json(places);
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
 }
}

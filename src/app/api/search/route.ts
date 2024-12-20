import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

export const GET = async (req: NextRequest, res: NextResponse) => {
 try {
  const location = req.nextUrl.searchParams.get("location");
  const guests = req.nextUrl.searchParams.get("guests");
  if (!location) return NextResponse.json({ message: "Location is required" }, { status: 400 });
  const places = await prisma.place.findMany({
   where: {
    address: {
     contains: location as string,
     mode: "insensitive",
    },
    guests: {
     gte: parseInt(guests || 1),
    },
   },
   include: {
    photos: {
     select: { id: true, url: true, placeId: true, index: true },
     orderBy: { index: "asc" },
    },
    perks: true,
   },
   orderBy: {
    createdAt: "desc",
   },
  });
  return NextResponse.json(places, { status: 200 });
 } catch (error) {
  console.log(error);
  return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
 }
};
// export const POST = async (req: NextRequest, res: NextResponse) => {
//  try {
//   const body = await req.json();
//   const { location, guests } = body;
//   const places = await prisma.place.findMany({
//    where: {
//     address: {
//      contains: location,
//     },
//     guests: {
//      gte: parseInt(guests || 1),
//     },
//    },
//    include: {
//     photos: true,
//     perks: true,
//    },
//    orderBy: {
//     createdAt: "desc",
//    },
//   });
//   return NextResponse.json(places, { status: 200 });
//  } catch (error) {
//   console.log(error);
//   return NextResponse.json(
//    { message: "Something went wrong" },
//    { status: 500 }
//   );
//  }
// };

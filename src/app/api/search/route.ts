import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

export const POST = async (req: NextRequest, res: NextResponse) => {
 try {
  const body = await req.json();
  const { location, guests } = body;
  console.log(location, guests);
  const places = await prisma.place.findMany({
   where: {
    address: location,
    beds: guests,
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
 } catch (error) {
  return NextResponse.json(
   { message: "Something went wrong" },
   { status: 500 }
  );
 }
};

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
  const rating = await prisma.rating.findMany({
   where: {
    placeId: placeId,
   },
  });
  if (!rating) return NextResponse.json(0, { status: 200 });
  if (rating) return NextResponse.json(rating, { status: 200 });
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { message: "Something went wrong." },
   { status: 500 }
  );
 }
}

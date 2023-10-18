import prisma from "@/app/lib/auth";
import { getAuthSession } from "@/utils/getAuthSession";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
 req: NextRequest,
 { params }: { params: { placeId: string } },
 res: NextResponse
) => {
 try {
  const placeId = params.placeId;
  const userEmail = req.nextUrl.searchParams.get("email");
  if (!userEmail)
   return NextResponse.json({ message: "Email is required." }, { status: 400 });
  if (userEmail) {
   const findReserve = await prisma.reserve.findFirst({
    where: {
     placeId: placeId,
     userEmail: userEmail,
    },
   });
   if (!findReserve) {
    return NextResponse.json(
     { reserveStatus: "No reservation found." },
     { status: 404 }
    );
   }
   return NextResponse.json(findReserve, { status: 200 });
  }
 } catch (error) {
  console.log(error);
  return NextResponse.json(
   { reserveStatus: "Something went wrong." },
   { status: 500 }
  );
 }
};

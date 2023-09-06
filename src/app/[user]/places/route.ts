import { getAuthSession } from "@/utils/getAuthSession";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/auth";

// GET /api/userId/places - for all places/users
export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
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
      const places = await prisma.place.findMany({
        where: {
          userId: userDB.id,
        },
      });
      return NextResponse.json(places, { status: 200 });
    }
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
};

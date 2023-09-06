import { getAuthSession } from "@/utils/getAuthSession";
import { placeSchema } from "@/utils/placeSchema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/app/lib/auth";

// POST /api/places
export const POST = async (req: NextRequest, res: NextResponse) => {
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
      const body = await req.json();
      const placeData = placeSchema.parse(body);
      const { perks, photos, ...rest } = placeData;
      const newPlace = await prisma.place.create({
        data: {
          ...rest,
          userId: userDB.id,
        },
      });
      if (newPlace && perks && perks.length > 0) {
        const perksData = perks.map((perkName) => {
          return {
            name: perkName,
            placeId: newPlace.id,
          };
        });
        await prisma.perk.createMany({
          data: perksData,
        });
      }
      if (newPlace && photos && photos.length > 0) {
        const photosData = photos.map((photo) => {
          return {
            url: photo,
            placeId: newPlace.id,
          };
        });
        await prisma.photo.createMany({
          data: photosData,
        });
      }
      return NextResponse.json(newPlace, { status: 201 });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(error.issues, { status: 400 });
    }
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
// GET /api/places - for all places/users

export const GET = async (req: NextRequest, res: NextResponse) => {};

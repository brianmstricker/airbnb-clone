import prisma from "@/app/lib/auth";
import LargeScreenContent from "./LargeScreenContent";
import SmallScreenContent from "./SmallScreenContent";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
 const { placeId } = params;
 const place = await prisma.place.findUnique({
  where: { id: placeId },
  include: {
   perks: true,
   photos: true,
   user: {
    select: { name: true, image: true },
   },
  },
 });
 return (
  <div>
   <LargeScreenContent place={place} />
   <SmallScreenContent place={place} />
  </div>
 );
};
export default PlacePage;

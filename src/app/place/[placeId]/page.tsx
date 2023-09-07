import prisma from "@/app/lib/auth";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
  const { placeId } = params;
  const place = await prisma.place.findUnique({ where: { id: placeId } });
  // console.log(place);
  return <div>PlacePage</div>;
};
export default PlacePage;

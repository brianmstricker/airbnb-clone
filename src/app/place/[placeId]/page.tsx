import { getAuthSession } from "@/utils/getAuthSession";
import LargeScreenContent from "./LargeScreenContent";
import SmallScreenContent from "./SmallScreenContent";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
 const { placeId } = params;
 const placeJSON = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/place/${placeId}`
 );
 const place = await placeJSON.json();
 if (!place.id) {
  return (
   <div className="pb-24 w-full h-screen flex flex-col items-center justify-center">
    <span className="mb-4">Place not found</span>
   </div>
  );
 }
 const session = await getAuthSession();
 if (!session?.user)
  return (
   <div>
    <LargeScreenContent place={place} />
    <SmallScreenContent place={place} />
   </div>
  );
 if (session?.user) {
  const reserveFetch = await fetch(
   `${process.env.NEXT_PUBLIC_SITE_URL}/api/place/reserve/${place.id}?email=${session.user.email}`
  );
  const reserve = await reserveFetch.json();
  return (
   <>
    <LargeScreenContent place={place} reserve={reserve} />
    <SmallScreenContent place={place} reserve={reserve} />
   </>
  );
 }
};
export default PlacePage;

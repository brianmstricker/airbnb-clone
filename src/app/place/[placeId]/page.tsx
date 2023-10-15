import LargeScreenContent from "./LargeScreenContent";
import SmallScreenContent from "./SmallScreenContent";

const PlacePage = async ({ params }: { params: { placeId: string } }) => {
 const { placeId } = params;
 const placeJSON = await fetch(`http://localhost:3000/api/place/${placeId}`);
 const place = await placeJSON.json();
 if (!place.id) {
  return (
   <div className="pb-24 w-full h-screen flex flex-col items-center justify-center">
    <span className="mb-4">Place not found</span>
   </div>
  );
 }
 return (
  <div>
   <LargeScreenContent place={place} />
   <SmallScreenContent place={place} />
  </div>
 );
};
export default PlacePage;

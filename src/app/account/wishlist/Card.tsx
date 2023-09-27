import Favorite from "@/components/Favorite";
import Image from "next/image";
import Link from "next/link";

type FavoriteType = {
 id: string;
 placeId: string;
 place: {
  id: string;
  address: string;
  photos: { url: string }[];
 };
};

const Card = ({ favorite }: { favorite: FavoriteType }) => {
 return (
  <div className="relative">
   <Favorite placeId={favorite.placeId} />
   <Link href={`/place/${favorite.placeId}`} className="w-full relative">
    <div className="relative w-full h-[400px] sm:h-[350px]">
     <Image
      src={favorite.place.photos[0].url}
      fill
      alt="place"
      className="rounded-xl object-cover"
     />
    </div>
    <div>
     <div className="flex justify-between">
      <p className="capitalize font-semibold">
       Home in {favorite.place.address.split(",")[1]}
      </p>
      <p className="font-light">4.82</p>
     </div>
    </div>
   </Link>
  </div>
 );
};
export default Card;

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
    <div className="relative w-full h-full aspect-square">
     <div className="relative w-full h-full">
      <Image
       src={favorite.place.photos[0].url}
       fill
       alt="place"
       className="rounded-xl object-cover"
       sizes="(max-width: 768px) 90vw, (max-width: 1600px) 40vw, 25vw"
       placeholder="blur"
       blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
      />
     </div>
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

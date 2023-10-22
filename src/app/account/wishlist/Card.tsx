import Favorite from "@/components/Favorite";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

type FavoriteType = {
 id: string;
 placeId: string;
 place: {
  id: string;
  address: string;
  photos: { url: string }[];
  name: string;
  rating:
   | {
      userEmail: string;
      placeId: string;
      rating: number;
      id: string;
     }[]
   | [];
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
     <div className="flex justify-between px-1">
      <p className="capitalize font-semibold">
       Home in{" "}
       {favorite.place.address.includes(",")
        ? favorite.place.address.split(",")[1]
        : favorite.place.address}
      </p>
      <div className="flex items-center gap-1">
       <AiFillStar />
       {favorite.place.rating.length === 0 ? (
        <div className="font-light">0.00</div>
       ) : (
        <div className="font-light">
         {(
          favorite.place.rating
           .map((r) => r.rating)
           .reduce((t, c) => t + c, 0) / favorite.place.rating.length
         ).toFixed(2)}
        </div>
       )}
      </div>
     </div>
    </div>
   </Link>
  </div>
 );
};
export default Card;

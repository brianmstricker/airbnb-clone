import Favorite from "@/components/Favorite";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { getAuthSession } from "@/utils/getAuthSession";
import PlaceFilter from "@/components/placefilter/PlaceFilter";

type Place = {
 id: string;
 name: string;
 address: string;
 photos: { url: string }[];
 type: string;
 user: { name: string; image: string };
 beds: number;
 baths: number;
 description: string;
 checkInTime: string;
 checkOutTime: string;
 price: string;
 favorites: { placeId: string; userEmail: string }[];
};

export default async function Home() {
 const session = await getAuthSession();
 const fetchPlaces = await fetch("http://localhost:3000/api/places");
 const getPlaces = await fetchPlaces.json();
 const places = getPlaces.filter((place: Place) => place.photos.length > 0);
 return (
  <main className="max-w-screen-3xl mx-auto px-4">
   <PlaceFilter />
   <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-y-10 gap-x-6">
    {places.map((place: Place) => (
     <div key={place.id} className="relative">
      <Favorite
       placeId={place.id}
       favorited={
        !!place.favorites.find(
         (favorite) =>
          favorite.placeId === place.id &&
          favorite.userEmail === session?.user?.email
        )
       }
      />
      <Link href={`/place/${place.id}`} className="mx-auto w-full">
       <div className="relative w-full h-[400px] sm:h-[250px]">
        <Image
         src={place.photos[0].url}
         fill
         alt="place"
         className="rounded-xl object-cover"
        />
       </div>
       <div className="mt-2 text-[.95rem] px-2">
        <div className="flex justify-between items-center">
         <div className="capitalize font-semibold ">
          {place.address.split(",", 2).join(",")}
         </div>
         <div className="flex items-center gap-1">
          <AiFillStar size={14} />
          <span className="font-light">4.82</span>
         </div>
        </div>
        <div>
         <span className="font-semibold">${place.price}</span> night
        </div>
       </div>
      </Link>
     </div>
    ))}
   </div>
  </main>
 );
}

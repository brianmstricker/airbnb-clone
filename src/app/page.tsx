import Favorite from "@/components/Favorite";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
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
 const fetchPlaces = await fetch("http://localhost:3000/api/places");
 const getPlaces = await fetchPlaces.json();
 const places = getPlaces.filter((place: Place) => place.photos.length > 0);
 return (
  <main className="pt-20 md:pt-0 pb-52">
   <div className="contain-filter">
    <PlaceFilter />
   </div>
   <div className="contain">
    <div className="grid grid-cols-1 xxxs:grid-cols-2  mdlg:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-y-24 gap-x-6">
     {places.map((place: Place) => (
      <div key={place.id} className="relative">
       <Favorite placeId={place.id} />
       <Link href={`/place/${place.id}`} className="mx-auto w-full h-full">
        <div className="relative w-full h-full aspect-[16/12]">
         <div className="relative w-full h-full">
          <Image
           src={place.photos[0].url}
           fill
           alt="place"
           className="rounded-xl object-cover"
          />
         </div>
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
   </div>
  </main>
 );
}

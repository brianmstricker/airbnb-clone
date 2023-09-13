import prisma from "@/app/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

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
};

export default async function Home() {
 const getPlaces = await prisma.place.findMany({
  include: { photos: true },
 });
 const places = getPlaces.filter((place) => place.photos.length > 0);
 return (
  <main className="max-w-screen-3xl mx-auto py-12 px-4">
   <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-y-10 gap-x-6">
    {places.map((place) => (
     <Link
      href={`/place/${place.id}`}
      key={place.id}
      className="mx-auto w-full"
     >
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
    ))}
   </div>
  </main>
 );
}

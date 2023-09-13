"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key } from "react";
import Image from "next/image";

interface PlaceType {
 id: Key;
 name: String;
 description: String;
 address: String;
 baths: Number;
 beds: Number;
 checkInTime: String;
 checkOutTime: String;
 perks: Array<Object>;
 price: String;
 photos: Array<Object>;
 type: String;
 userId: String;
}

const PlacesPage = () => {
 const { data, isLoading, error } = useQuery({
  queryKey: ["places"],
  queryFn: async () => {
   const { data } = await axios.get("/api/places/user");
   return data;
  },
 });
 return (
  <main>
   <Link
    href="/account/places/create"
    className="block w-fit mx-auto px-4 py-2 bg-primary text-white rounded-md mt-2 hover:bg-rose-400"
   >
    Add A Place
   </Link>
   <div className="mt-8 flex flex-col gap-4">
    {isLoading ? (
     <span>Loading...</span>
    ) : error ? (
     <span>Something went wrong.</span>
    ) : (
     data?.map((place: PlaceType) => (
      <Link
       href={`/place/${place.id}`}
       key={place.id}
       className="border-2 p-2 xxs:p-4 flex flex-col xxs:flex-row gap-3"
      >
       {place.photos && place.photos[0]?.url && (
        <div className="relative xxs:w-[300px] w-full h-[175px] shrink-0 mx-auto xxs:mx-0">
         <Image
          src={place.photos[0].url}
          alt={place.name as string}
          fill
          className="rounded-md object-cover"
         />
        </div>
       )}
       <div className="flex flex-col justify-between">
        <div>
         <h2 className="text-2xl font-medium capitalize">{place.name}</h2>
         <p className="capitalize text-gray-600">{place.address}</p>
         <div className="mt-4">
          <span className="font-bold">${place.price}</span> per night
         </div>
        </div>
        <p className="text-gray-500">
         {place.description.length > 250
          ? place.description.substring(0, 250)
          : place.description}
        </p>
       </div>
      </Link>
     ))
    )}
   </div>
  </main>
 );
};
export default PlacesPage;

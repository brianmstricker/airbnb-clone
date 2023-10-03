"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Key, useState } from "react";
import Image from "next/image";
import { CircleLoader } from "react-spinners";
import { BsTrash } from "react-icons/bs";

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
 photos: { url: string }[];
 type: String;
 userId: String;
}

const PlacesPage = () => {
 const [places, setPlaces] = useState<PlaceType[]>([]);
 const { data, isLoading, error } = useQuery({
  queryKey: ["places"],
  queryFn: async () => {
   const { data } = await axios.get("/api/places/user");
   setPlaces(data);
   return data;
  },
 });
 async function handleDelete(id: Key) {
  try {
   await axios.delete(`/api/places/user?id=${id}`);
   setPlaces((places) => places.filter((place) => place.id !== id));
  } catch (error) {
   console.log(error);
  }
 }
 return (
  <main>
   <Link
    href="/account/places/create"
    className="block w-fit mx-auto px-4 py-2 bg-primary text-white rounded-md mt-3 hover:bg-rose-400"
   >
    Add A Place
   </Link>
   <div className="mt-8 flex flex-col gap-4">
    {isLoading ? (
     <div className="flex items-center w-full justify-center relative top-48">
      <CircleLoader size={80} color="#ff385c" />
     </div>
    ) : error ? (
     <span>Something went wrong.</span>
    ) : (
     places?.map((place: PlaceType) => (
      <div key={place.id} className="relative">
       <button
        className="absolute -top-2 -right-2 hover:scale-110 duration-150"
        onClick={() => handleDelete(place.id)}
       >
        <BsTrash size={24} className="fill-gray-600" />
       </button>
       <Link
        href={`/place/${place.id}`}
        key={place.id}
        className="border-2 rounded-md p-4 flex flex-col md:flex-row gap-3 items-center"
       >
        {place.photos && place.photos[0]?.url && (
         <div className="relative md:w-[300px] w-full shrink-0 mx-auto xxs:mx-0 aspect-square h-full max-h-[230px] lg:max-h-[200px]">
          <Image
           src={place.photos[0].url}
           alt={place.name as string}
           fill
           className="rounded-md object-cover"
          />
         </div>
        )}
        <div className="flex flex-col justify-between w-full overflow-hidden">
         <div>
          <h2 className="text-2xl font-medium capitalize">{place.name}</h2>
          <p className="capitalize text-gray-600">{place.address}</p>
          <div className="mt-4">
           <span className="font-bold">${place.price}</span> per night
          </div>
         </div>
         <div className="overflow-hidden">
          <p className="text-gray-500 hidden md:block">
           {place.description.length > 250
            ? place.description.substring(0, 250) + "..."
            : place.description}
          </p>
          <p className="text-gray-500 md:hidden block">
           {place.description.length > 100
            ? place.description.substring(0, 100) + "..."
            : place.description}
          </p>
         </div>
        </div>
       </Link>
      </div>
     ))
    )}
   </div>
  </main>
 );
};
export default PlacesPage;

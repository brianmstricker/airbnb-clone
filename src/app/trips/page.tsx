"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CircleLoader } from "react-spinners";

type ReserveType = {
 id: string;
 placeId: string;
 checkInDate: string;
 checkOutDate: string;
 guests: number;
 price: string;
 place: {
  name: string;
  photos: { url: string }[];
  id: string;
  address: string;
  checkInTime: string;
  checkOutTime: string;
 };
 userEmail: string;
};

const TripPage = () => {
 const session = useSession();
 const [reserves, setReserves] = useState([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  if (!session?.data?.user) {
   setLoading(false);
   return;
  }
  axios.get("/api/reserve").then((res) => {
   setReserves(res.data);
   setLoading(false);
  });
 }, [session?.data?.user]);
 if (loading)
  return (
   <div className="!max-w-[1500px] contain pt-5">
    <h1 className="text-3xl font-semibold">Trips</h1>
    <Border />
    Fetching...
    <CircleLoader color={"#FF385C"} size={80} className="mx-auto mt-10" />
   </div>
  );
 return (
  <div className="!max-w-[1500px] contain pt-5">
   <h1 className="text-3xl font-semibold">Trips</h1>
   <Border />
   {reserves.length === 0 ? (
    <div>
     <h2 className="text-2xl font-medium">No trips booked...yet!</h2>
     <p className="mt-1 font-light">
      Time to dust off your bags and start planning your next adventure
     </p>
     <Link
      href={"/"}
      className="px-6 py-2.5 mt-3 block w-fit border border-black font-semibold rounded-lg"
     >
      Start searching
     </Link>
    </div>
   ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
     {reserves.map((reserve: ReserveType) => (
      <Link
       href={`/place/${reserve.placeId}`}
       key={reserve.id}
       className="border border-gray-300 rounded-2xl"
      >
       <div className="relative w-full h-[150px] [@media(min-width:500px)]:h-[200px] xl:h-[175px]">
        <Image
         src={reserve.place.photos[0].url}
         fill
         alt="Image of place"
         className="object-cover rounded-t-2xl"
         sizes="(max-width: 768px) 90vw, 70vw"
         placeholder="blur"
         blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
        />
       </div>
       <h2 className="font-medium text-xl md:text-2xl px-3 pt-3 truncate">
        {reserve.place.name}
       </h2>
       <div className="flex flex-col gap-2 p-3 text-xs [@media(min-width:350px)]:text-sm [@media(min-width:450px)]:text-base [@media(min-width:640px)]:text-sm [@media(min-width:750px)]:text-base">
        <div className="flex items-center gap-1.5">
         <span className="font-semibold">Check In:</span>{" "}
         {new Date(reserve.checkInDate).toISOString().substring(0, 10)}
         <div className="w-[2px] h-[2px] bg-black rounded-full" />
         <span className="font-semibold">by:</span> {reserve.place.checkInTime}
        </div>
        <div className="flex items-center gap-1.5">
         <span className="font-semibold">Check Out:</span>{" "}
         {new Date(reserve.checkOutDate).toISOString().substring(0, 10)}
         <div className="w-[2px] h-[2px] bg-black rounded-full" />
         <span className="font-semibold">by:</span> {reserve.place.checkOutTime}
        </div>
        <div>
         <span className="font-semibold">Guests:</span> {reserve.guests}
        </div>
        <div>
         <span className="font-semibold">Price:</span> ${reserve.price}
        </div>
       </div>
      </Link>
     ))}
    </div>
   )}
   {reserves.length === 0 && <Border className="mt-11" />}
  </div>
 );
};

function Border({ className }: { className?: string }) {
 return <div className={className + " w-full h-[1px] bg-gray-300/90 my-7"} />;
}
export default TripPage;

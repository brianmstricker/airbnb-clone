import { Place, Reserve } from "./LargeScreenContent";
import { AiFillStar, AiOutlineHeart } from "react-icons/ai";
import Image from "next/image";
import { BsCheckCircle, BsDoorClosed } from "react-icons/bs";
import { PiMedalMilitary } from "react-icons/pi";
import { LuCalendarX } from "react-icons/lu";
import Border from "./Border";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import ImageCarousel from "./ImageCarousel";
import MobileReserveWidget from "./MobileReserveWidget";
import Favorite from "@/components/Favorite";
import Share from "@/components/Share";

const SmallScreenContent = ({
 place,
 reserve,
}: {
 place: Place;
 reserve?: Reserve;
}) => {
 if (!place.checkInTime.includes(" ")) {
  const lastIndex = place.checkInTime.search(/\d(?![\d:]|\d{2}\s*(am|pm))/);
  if (lastIndex !== -1) {
   place.checkInTime =
    place.checkInTime.slice(0, lastIndex + 1) +
    " " +
    place.checkInTime.slice(lastIndex + 1);
  }
 }
 if (!place.checkOutTime.includes(" ")) {
  const lastIndex = place.checkOutTime.search(/\d(?![\d:]|\d{2}\s*(am|pm))/);
  if (lastIndex !== -1) {
   place.checkOutTime =
    place.checkOutTime.slice(0, lastIndex + 1) +
    " " +
    place.checkOutTime.slice(lastIndex + 1);
  }
 }
 return (
  <div className="md:hidden mx-auto pb-20">
   {place && (
    <div>
     <div className="px-4 py-4 text-sm flex items-center justify-between absolute z-10 w-full">
      <Link
       href="/"
       className="flex items-center gap-3 bg-white p-2 rounded-full"
      >
       <FaChevronLeft size={20} />
      </Link>
      <div className="flex items-center pr-2 gap-4">
       <div className="bg-white p-2 rounded-full">
        <Share smallPlacePage />
       </div>
       <div className="bg-white p-1 rounded-full">
        <Favorite placeId={place.id} placePage smallPlacePage />
       </div>
      </div>
     </div>
     {place.photos && place.photos.length > 0 && (
      <ImageCarousel photoUrls={place.photos.map((p) => p.url)} />
     )}
     <div className="flex flex-col justify-center px-8 pb-8 relative">
      <h2 className="text-2xl font-semibold mt-4 capitalize">{place.name}</h2>
      <div className="mt-4 text-base font-semibold">
       Entire {place.type} in {place.address.split(",", 2).join(",")}
      </div>
      <div className="relative">
       <ol className="text-sm text-gray-800 flex gap-3 items-center mt-[2px]">
        <li>
         <span>{place.guests} Guests</span>
        </li>
        <li className="flex items-center relative rounded-full">
         <div className="w-[2px] h-[2px] bg-gray-800 absolute -left-[6px]" />
         <span>
          {place.beds} {place.beds === 1 ? "Bed" : "Beds"}
         </span>
        </li>
        <li className="flex items-center relative rounded-full">
         <div className="w-[2px] h-[2px] bg-gray-800 absolute -left-[6px]" />
         <span>
          {place.baths} {place.baths === 1 ? "Bath" : "Baths"}
         </span>
        </li>
       </ol>
       <div className="flex gap-4 items-center text-sm mt-1">
        <div className="flex items-center gap-1 relative">
         <AiFillStar size={16} />
         <span className="font-bold">4.90</span>
         <div className="absolute w-[2px] h-[2px] bg-black -right-[10px] rounded-full" />
        </div>
        <span className="underline font-medium tracking-tight">
         553 reviews
        </span>
       </div>
       <Border small />
       <div className="flex items-start gap-3">
        <Image
         src={place.user.image as string}
         alt="user"
         width={40}
         height={40}
         className="rounded-full"
        />
        <div>
         <div className="font-semibold">
          Hosted by {place.user.name.split(" ")[0]}
         </div>
         <div className="text-sm text-gray-500">New to hosting</div>
        </div>
       </div>
       <Border small />
       <div className="flex gap-4">
        <BsDoorClosed size={28} />
        <p>
         <span className="font-semibold">Self check-in</span>
         <br />
         <span className="text-sm text-gray-500">
          Check yourself in with the keypad.
         </span>
        </p>
       </div>
       <div className="mt-6 flex gap-4">
        <PiMedalMilitary size={28} />
        <p>
         <span className="font-semibold">{place.user.name} is a Superhost</span>
         <br />
         <span className="text-sm text-gray-500">
          Superhosts are experienced, highly rated hosts.
         </span>
        </p>
       </div>
       <div className="mt-6 flex items-center gap-4">
        <LuCalendarX size={28} />
        <p>
         <span className="font-semibold">Free cancellation before Oct 20.</span>
        </p>
       </div>
       <Border />
       <div>
        <p>{place.description}</p>
       </div>
       {place.perks && place.perks.length > 0 && (
        <>
         <Border />
         <div>
          <h3 className="font-bold text-2xl">What this place offers</h3>
          <div className="mt-4 grid grid-cols-2">
           {place.perks.map((perk) => (
            <ul
             key={perk.name}
             className="text-gray-600 capitalize list-disc ml-4"
            >
             <li className="mt-2">{perk.name}</li>
            </ul>
           ))}
          </div>
         </div>
        </>
       )}
       {place.perks && place.perks.length > 0 ? (
        <Border />
       ) : (
        <div className="w-full h-[1px] bg-gray-300 mt-32 mb-10" />
       )}
       <div>
        <div>
         <h3 className="font-bold text-2xl">Where you&apos;ll be</h3>
         <div className="mt-2">
          <iframe
           className="border-none w-full h-[50vh]"
           src={`https://maps.google.com/maps?width=100%25&height=600&hl=en&q=${encodeURIComponent(
            place.address
           )}+()&t=&z=11&ie=UTF8&iwloc=B&output=embed`}
          ></iframe>
         </div>
        </div>
        <Border />
        <div>
         <div className="mt-4 flex flex-col">
          <div className="text-gray-500 text-sm">
           <h4 className="font-semibold text-2xl text-black">
            Cancellation policy
           </h4>
           <span className="block mt-2">
            Free cancellation before 4:00 PM on Sep 11.
           </span>
           <span className="block mt-2">
            Review the Host&apos;s full cancellation policy which applies even
            if you cancel for illness or disruptions caused by COVID-19.
           </span>
          </div>
          <Border small />
          <div className="text-gray-500 text-sm">
           <h4 className="font-semibold text-2xl text-black">House rules</h4>
           <span className="block mt-2">Check-in by: {place.checkInTime}</span>
           <span className="block mt-2">
            Check out before {place.checkOutTime}
           </span>
           <span className="block mt-2">No parties or events</span>
           <span className="block mt-2"></span>
          </div>
          <Border small />
          <div className="text-gray-500 text-sm">
           <h4 className="font-semibold text-2xl text-black">
            Safety & Property
           </h4>
           <span className="block mt-2">Security camera/recording device</span>
           <span className="block mt-2">
            Pool/hot tub without a gate or lock
           </span>
           <span className="block mt-2">
            Nearby lake, river, other body of water
           </span>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
     {reserve === undefined && (
      <MobileReserveWidget
       price={place.price}
       placeId={place.id}
       // placeRating={place.rating}
      />
     )}
     {reserve?.reserveStatus !== "reserved" && (
      <MobileReserveWidget
       price={place.price}
       placeId={place.id}
       // placeRating={place.rating}
      />
     )}
     {reserve && reserve.reserveStatus === "reserved" && (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-t-gray-300 w-screen z-50 px-6 py-4">
       <div className="flex items-center gap-3 justify-center">
        <h2 className="text-lg font-semibold">Currently Reserved</h2>{" "}
        <BsCheckCircle size={24} className="fill-green-600" />
       </div>
       <div className="text-center">
        From{" "}
        {new Date(reserve.checkInDate)
         .toUTCString()
         .split(" ")
         .slice(0, 3)
         .join(" ")}{" "}
        to{" "}
        {new Date(reserve.checkOutDate)
         .toUTCString()
         .split(" ")
         .slice(0, 3)
         .join(" ")}
       </div>
      </div>
     )}
    </div>
   )}
  </div>
 );
};
export default SmallScreenContent;

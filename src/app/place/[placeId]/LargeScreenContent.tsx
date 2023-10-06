import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import Image from "next/image";
import { BsDoorClosed } from "react-icons/bs";
import { PiMedalMilitary } from "react-icons/pi";
import { LuCalendarX } from "react-icons/lu";
import Border from "./Border";
import ReserveWidget from "./ReserveWidget";
import LargeImageContent from "./LargeImageContent";

export type Place = {
 name: string;
 address: string;
 createdAt: Date;
 userId: string;
 photos: { url: string; id: string; placeId: string }[];
 type: string;
 user: { name: string; image: string };
 beds: number;
 baths: number;
 description: string;
 id: string;
 perks?: { name: string; id: string; placeId: string }[];
 checkInTime: string;
 checkOutTime: string;
 price: string;
 trending: boolean;
 view: boolean;
 omg: boolean;
};

const LargeScreenContent = ({ place }: { place: Place }) => {
 return (
  <div className="hidden md:block max-w-6xl mx-auto pb-12 pt-28">
   {place && (
    <div className="flex flex-col justify-center px-8 pb-8 relative">
     <h2 className="text-2xl font-semibold capitalize">{place.name}</h2>
     <div className="mt-2 text-sm flex justify-between items-center">
      <a
       href={`https://www.google.com/maps/place/${place.address}`}
       target="_blank"
       className="underline font-medium"
      >
       {place.address}
      </a>
      <div className="flex gap-4">
       <div className="flex items-center gap-2">
        <FiShare size={18} /> <span className="underline">Share</span>
       </div>
       <div className="flex items-center gap-2">
        <AiOutlineHeart size={18} /> <span className="underline">Save</span>
       </div>
      </div>
     </div>
     <div className="mt-6 flex">
      {place.photos && place.photos[0]?.url && (
       <div className="w-full relative h-[50vh] lg:h-[52vh]">
        <Image
         src={place.photos[0].url}
         alt="photo of place"
         fill
         className="rounded-l-xl object-cover"
        />
       </div>
      )}
      {place.photos && place.photos.length >= 5 && (
       <LargeImageContent photos={place.photos} />
      )}
     </div>
     <div className="relative">
      <div className="mt-10">
       <div className="max-w-sm lg:max-w-xl">
        <div className="text-xl flex justify-between">
         <div>
          <p className="font-medium">
           Entire <span className="capitalize">{place.type}</span> hosted by{" "}
           {place.user.name}
          </p>
          <ol className="text-base mt-2 text-gray-800 flex gap-6 items-center">
           <li>
            <span>{place.beds * 2} Guests</span>
           </li>
           <li className="flex items-center relative rounded-full">
            <div className="w-[2px] h-[2px] bg-black absolute -left-3" />
            <span>
             {place.beds} {place.beds === 1 ? "Bed" : "Beds"}
            </span>
           </li>
           <li className="flex items-center relative rounded-full">
            <div className="w-[2px] h-[2px] bg-black absolute -left-3" />
            <span>
             {place.baths} {place.baths === 1 ? "Bath" : "Baths"}
            </span>
           </li>
          </ol>
         </div>
         <div>
          <Image
           src={place.user.image as string}
           alt="user"
           width={60}
           height={60}
           className="rounded-full"
          />
         </div>
        </div>
        <Border />
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
          <span className="font-semibold">
           {place.user.name} is a Superhost
          </span>
          <br />
          <span className="text-sm text-gray-500">
           Superhosts are experienced, highly rated hosts who are committed to
           providing great stays for guests.
          </span>
         </p>
        </div>
        <div className="mt-6 flex items-center gap-4">
         <LuCalendarX size={28} />
         <p>
          <span className="font-semibold">
           Free cancellation before Oct 20.
          </span>
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
       </div>
       {place.perks && place.perks.length > 0 ? (
        <Border />
       ) : (
        <div className="w-full h-[1px] bg-gray-300 mt-32 mb-10" />
       )}
       <div>
        <div>
         <h3 className="font-bold text-2xl">Where you&apos;ll be</h3>
         google maps here
        </div>
        <Border />
        <div>
         <h3 className="font-bold text-2xl">Things to know</h3>
         <div className="mt-4 flex justify-between items-start">
          <div>
           <h4 className="font-semibold">House rules</h4>
           <span className="block mt-4">Check-in: {place.checkInTime}</span>
           <span className="block mt-4">
            Check out before {place.checkOutTime}
           </span>
           <span className="block mt-4">No parties or events</span>
           <span className="block mt-4"></span>
          </div>
          <div>
           <h4 className="font-semibold">Safety & Property</h4>
           <span className="block mt-4">Security camera/recording device</span>
           <span className="block mt-4">
            Pool/hot tub without a gate or lock
           </span>
           <span className="block mt-4">
            Nearby lake, river, other body of water
           </span>
          </div>
          <div>
           <h4 className="font-semibold">Cancellation policy</h4>
           <span className="block mt-4">
            Free cancellation before 4:00 PM on Sep 11.
           </span>
           <span className="block mt-4 max-w-[400px]">
            Review the Host’s full cancellation policy which applies even if you
            cancel for illness or disruptions caused by COVID-19.
           </span>
          </div>
         </div>
        </div>
       </div>
      </div>
      <ReserveWidget price={place.price} />
     </div>
    </div>
   )}
  </div>
 );
};
export default LargeScreenContent;

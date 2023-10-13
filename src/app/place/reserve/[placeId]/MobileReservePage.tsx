import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";

const MobileReservePage = ({
 image,
 type,
 name,
 checkIn,
 checkOut,
 price,
 nights,
 id,
 guests,
}: {
 image: string;
 type: string;
 name: string;
 checkIn: string;
 checkOut: string;
 price: number;
 nights: number;
 id: string;
 guests: number;
}) => {
 const priceTimesNights = price * nights;
 const serviceFee = priceTimesNights * 0.08;
 const total = priceTimesNights + 50 + serviceFee;
 return (
  <main className="w-screen min-h-screen py-6 block md:hidden">
   <div className="flex items-center relative contain">
    <Link href={`/place/${id}`}>
     <FaChevronLeft />
    </Link>
    <h2 className="absolute right-1/2 left-1/2 w-max translate-x-[-50%] font-bold">
     Confirm and pay
    </h2>
   </div>
   <div className="pt-10 flex gap-3 flex-col contain [@media(min-width:375px)]:flex-row">
    <div className="relative h-full aspect-[16/13] w-[126px] shrink-0">
     <Image
      src={image as string}
      alt="image of place"
      fill
      className="rounded-xl object-cover"
      sizes="(max-width: 768px) 90vw, (max-width: 1600px) 40vw, 25vw"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
     />
    </div>
    <div className="flex flex-col relative py-[2px] justify-between">
     <div className="flex flex-col">
      <span className="text-[.7rem] text-gray-600 capitalize">{type}</span>
      <span className="text-[.85rem] leading-4">{name}</span>
     </div>
     <div className="flex items-center text-[.75rem] mt-1 gap-[2px]">
      <AiFillStar />
      <span>4.92</span>
     </div>
    </div>
   </div>
   <Separator />
   <div className="contain">
    <h3 className="font-semibold text-xl tracking-wide">Your Trip</h3>
    <div className="flex flex-col gap-4 mt-5">
     <div className="flex flex-col gap-2">
      <span className="font-semibold">Dates</span>
      <div className="tracking-tighter">
       <span>{checkIn}</span> - <span>{checkOut}</span>
      </div>
     </div>
     <div className="flex flex-col gap-2">
      <span className="font-semibold">Guests</span>
      <div className="tracking-tighter">
       <span>{guests}</span> guest
      </div>
     </div>
    </div>
   </div>
   <Separator />
   <div className="contain">
    <h3 className="font-semibold text-xl tracking-wide">Price Details</h3>
    <div className="mt-5 flex flex-col gap-3">
     <div className="flex items-center justify-between">
      <span>
       ${price} x {nights} nights
      </span>
      <span>${priceTimesNights.toFixed(2)}</span>
     </div>
     <div className="flex items-center justify-between">
      <span>Cleaning fee</span>
      <span>$50</span>
     </div>
     <div className="flex items-center justify-between">
      <span>Airbnb service fee</span>
      <span>${serviceFee.toFixed(2)}</span>
     </div>
     <div className="flex items-center justify-between border-t border-t-gray-300 pt-3">
      <span className="font-semibold">
       Total <span className="underline">(USD)</span>
      </span>
      <span className="font-semibold">${total.toFixed(2)}</span>
     </div>
    </div>
   </div>
   <div className="flex items-center justify-center mt-6">
    <button className="w-fit bg-primary py-4 px-6 text-white">
     Confirm and pay
    </button>
   </div>
  </main>
 );
};

function Separator() {
 return <div className="w-full h-2 bg-gray-200/90 my-6" />;
}

export default MobileReservePage;

import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { FaChevronLeft } from "react-icons/fa";

const LargeReservePage = ({
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
 price: string;
 nights: number;
 id: string;
 guests: number;
}) => {
 const priceTimesNights = parseInt(price) * nights;
 const serviceFee = priceTimesNights * 0.08;
 const total = priceTimesNights + 50 + serviceFee;
 return (
  <main className="hidden md:flex max-w-6xl mx-auto pb-20 pt-36 gap-12 lg:gap-16 xl:gap-28 px-9 lg:px-12">
   <div>
    <div className="flex gap-6 items-end relative">
     <Link href={`/place/${id}`} className="absolute -left-8 top-1/2">
      <FaChevronLeft className="fill-gray-500 relative -top-1.5" />
     </Link>
     <h1 className="text-3xl font-semibold">Confirm and pay</h1>
    </div>
    <div className="mt-12">
     <h2 className="text-2xl font-semibold">Your trip</h2>
     <div className="flex flex-col gap-8 mt-5">
      <div className="flex flex-col gap-3">
       <span className="font-semibold">Dates</span>
       <span className="text-black/90">
        {checkIn} - {checkOut}
       </span>
      </div>
      <div className="flex flex-col gap-3">
       <span className="font-semibold">Guests</span>
       <span className="text-black/90">{guests} guest(s)</span>
      </div>
     </div>
    </div>
    <div className="bg-gray-300/80 w-full h-[1px] mt-10 mb-9" />
    <div>
     <h2 className="text-2xl font-semibold">Cancellation policy</h2>
     <p className="mt-5">
      Free cancellation before Dec 7. Cancel before Dec 30 for a partial refund.
     </p>
    </div>
    <div className="bg-gray-300/80 w-full h-[1px] mt-10 mb-9" />
    <div>
     <h2 className="text-2xl font-semibold">Ground rules</h2>
     <div className="mt-5">
      <p>
       We ask every guest to remember a few simple things about what makes a
       great guest.
      </p>
      <ul className="list-disc mt-5 ml-5">
       <li>Follow the house rules</li>
       <li>Treat your Host&apos;s home like your own</li>
      </ul>
     </div>
    </div>
    <div className="bg-gray-300/80 w-full h-[1px] mt-10 mb-9" />
    <p className="text-xs text-gray-800">
     By selecting the button below, I agree to the{" "}
     <span className="font-bold underline">Host&apos;s House Rules</span>,
     <span className="font-bold underline">Ground rules for guests</span>,{" "}
     <span className="font-bold underline">
      Airbnb&apos;s Rebooking and Refund Policy
     </span>
     , and that Airbnb can{" "}
     <span className="font-bold underline">charge my payment method</span> if
     I&apos;m responsible for damage.
    </p>
    <button className="bg-primary mt-10 text-white px-6 py-4 rounded-lg">
     Confirm and pay
    </button>
   </div>
   <div className="mt-[5.15rem] w-[130%] lg:w-full">
    <div className="border rounded-xl border-gray-300/80 sticky top-[150px] p-5">
     <div className="flex gap-3 flex-row">
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
      <div className="flex flex-col relative justify-between">
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
     <div className="bg-gray-300/80 w-full h-[1px] mt-6 mb-5" />
     <div className="flex flex-col gap-6 text-sm lg:text-base">
      <h3 className="text-xl font-semibold">Price details</h3>
      <div className="flex justify-between items-center">
       <span>
        ${parseInt(price).toFixed(2)} x {nights} nights
       </span>
       <span>${priceTimesNights.toFixed(2)}</span>
      </div>
      <div className="flex justify-between items-center">
       <span>Cleaning fee</span>
       <span>$50</span>
      </div>
      <div className="flex justify-between items-center">
       <span>Airbnb service fee</span>
       <span>${total.toFixed(2)}</span>
      </div>
      <div className="bg-gray-300/80 w-full h-[1px]" />
      <div className="font-bold flex justify-between items-center">
       <span>
        Total <span className="underline">(USD)</span>
       </span>
       <span>${total.toFixed(2)}</span>
      </div>
     </div>
    </div>
   </div>
  </main>
 );
};
export default LargeReservePage;

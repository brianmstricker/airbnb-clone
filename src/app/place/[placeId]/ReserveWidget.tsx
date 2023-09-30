"use client";
import { useForm } from "react-hook-form";
import Border from "./Border";

type ReserveWidgetForm = {
 checkIn: string;
 checkOut: string;
 guests: number;
};

const ReserveWidget = ({
 price,
 smallScreen,
}: {
 price: String;
 smallScreen?: boolean;
}) => {
 const inDate = new Date();
 const outDate = new Date();
 const checkInDate = inDate.getDate() + 5;
 const checkOutDate = outDate.getDate() + 10;
 inDate.setDate(checkInDate);
 outDate.setDate(checkOutDate);
 const inDateValue = inDate.toLocaleDateString("en-CA");
 const outDateValue = outDate.toLocaleDateString("en-CA");
 const reserve = useForm<ReserveWidgetForm>({
  defaultValues: {
   checkIn: inDateValue,
   checkOut: outDateValue,
   guests: 1,
  },
 });
 const {
  register,
  watch,
  handleSubmit,
  formState: { errors, isDirty },
 } = reserve;
 const checkInValue = watch("checkIn");
 const checkOutValue = watch("checkOut");
 const amountNights =
  Number(checkOutValue.split("-").join("")) -
  Number(checkInValue.split("-").join(""));
 return (
  <div>
   {!smallScreen ? (
    <div className="border border-gray-300 rounded-lg mt-10 absolute top-0 right-0 w-[45%] lg:w-[35%]">
     <div className="rounded-lg shadow-lg py-6 px-4">
      <div className="flex justify-between items-center mx-1">
       <p>
        <span className="font-bold text-2xl">${price}</span>&nbsp;night
       </p>
       <p>reviews</p>
      </div>
      <div className="mt-4 border border-gray-400 rounded-lg text-xs lg:text-sm mx-1 text-gray-700 overflow-hidden">
       <div className="flex">
        <div className="flex flex-col w-full p-2">
         <label htmlFor="checkIn" className="font-semibold">
          Check in
         </label>
         <input type="date" id="checkIn" {...register("checkIn")} />
        </div>
        <div className="flex flex-col w-full border-l border-gray-400 p-2">
         <label htmlFor="checkOut" className="font-semibold">
          Check out
         </label>
         <input type="date" id="checkOut" {...register("checkOut")} />
        </div>
       </div>
       <div className="border-t border-gray-400 p-2 flex flex-col">
        <label htmlFor="guests" className="font-semibold">
         Guests
        </label>
        <input
         type="number"
         id="guests"
         placeholder="1 guest"
         className="p-1 relative -left-[1px]"
        />
       </div>
      </div>
      <div className="flex justify-between items-center mt-4 mx-1">
       <button className="bg-gradient-to-r from-rose-600 via-rose-500 to-primary text-white w-full rounded-lg py-3 font-medium">
        Reserve
       </button>
      </div>
      <span className="block text-center mt-3 text-gray-700 text-sm">
       You won&apos;t be charged yet
      </span>
      <div className="grid grid-cols-2 mx-1 -mb-4">
       {isDirty ? (
        <>
         <p className="text-gray-700 mt-4 underline underline-offset-2">
          ${price} x {amountNights} nights
         </p>
         <p className="text-gray-700 mt-4 text-right">
          ${Number(price) * Number(amountNights)}
         </p>{" "}
        </>
       ) : (
        <>
         <p className="text-gray-700 mt-4 underline underline-offset-2">
          ${price} x 5 nights
         </p>
         <p className="text-gray-700 mt-4 text-right">${Number(price) * 5}</p>
        </>
       )}
       <p className="text-gray-700 mt-4 underline underline-offset-2">
        Cleaning fee
       </p>
       <p className="text-gray-700 mt-4 text-right">$50</p>
       <p className="text-gray-700 mt-4 underline underline-offset-2">
        Airbnb service fee
       </p>
       {isDirty ? (
        <p className="text-gray-700 mt-4 text-right">
         ${Number(price) * amountNights * 0.8}
        </p>
       ) : (
        <p className="text-gray-700 mt-4 text-right">
         ${Number(price) * 5 * 0.8}
        </p>
       )}
      </div>
      <Border />
      <p className="grid grid-cols-2 mx-1 font-bold -mt-4">
       <span className="w-max">Total before taxes:</span>
       <span className="text-right">
        {isDirty ? (
         <span>
          $
          {Number(price) * amountNights +
           50 +
           Number(price) * amountNights * 0.8}
         </span>
        ) : (
         <span>${Number(price) * 5 + 50 + Number(price) * 5 * 0.8}</span>
        )}
       </span>
      </p>
     </div>
    </div>
   ) : (
    <div className="fixed bottom-0 bg-white w-full px-4 py-5 border-t border-t-gray-300">
     <div className="flex flex-col text-sm">
      <div className="block">
       <span className="font-bold">${price}</span> night
      </div>
      <div className="flex gap-4">
       <div>{checkInValue}</div>
       <div>{checkOutValue}</div>
      </div>
     </div>
    </div>
   )}
  </div>
 );
};
export default ReserveWidget;

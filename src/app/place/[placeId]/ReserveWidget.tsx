"use client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { useForm } from "react-hook-form";
import Border from "./Border";
import { format } from "date-fns";
import { useState } from "react";

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
 const [showCalendar, setShowCalendar] = useState(false);
 const inDate = new Date();
 const outDate = new Date();
 const checkInDate = inDate.getDate() + 5;
 const checkOutDate = outDate.getDate() + 10;
 inDate.setDate(checkInDate);
 outDate.setDate(checkOutDate);
 const inDateValue = format(inDate, "yyyy-MM-dd");
 const outDateValue = format(outDate, "yyyy-MM-dd");
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
 const selectionRange = {
  startDate: new Date(checkInValue),
  endDate: new Date(checkOutValue),
  key: "selection",
 };
 const handleSelect = (ranges) => {
  reserve.setValue(
   "checkIn",
   ranges.selection.startDate.toLocaleDateString("en-US")
  );
  reserve.setValue(
   "checkOut",
   ranges.selection.endDate.toLocaleDateString("en-US")
  );
 };
 return (
  <>
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
         ${(Number(price) * amountNights * 0.08).toFixed(2)}
        </p>
       ) : (
        <p className="text-gray-700 mt-4 text-right">
         ${(Number(price) * 5 * 0.08).toFixed(2)}
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
          {(
           Number(price) * amountNights +
           50 +
           Number(price) * amountNights * 0.08
          ).toFixed(2)}
         </span>
        ) : (
         <span>
          ${(Number(price) * 5 + 50 + Number(price) * 5 * 0.08).toFixed(2)}
         </span>
        )}
       </span>
      </p>
     </div>
    </div>
   ) : (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-t-gray-300 w-screen z-50 px-6 py-4">
     <div className="flex justify-between items-center">
      <div className="flex flex-col text-sm">
       <div>
        <span className="font-bold">${price}</span> night
       </div>
       <div
        onClick={() => setShowCalendar(true)}
        className="flex w-fit relative font-medium"
       >
        <div>
         {format(new Date(checkInValue), "MMM-dd").split("-")[0]}{" "}
         {checkInValue.split("/")[1] || checkInValue.split("-")[2]}
        </div>
        <div>
         {checkInValue.slice(5, 7) === checkOutValue.slice(5, 7) ? (
          <div>
           <span className="px-1">-</span>
           {checkOutValue.split("/")[1] || checkOutValue.split("-")[2]}
          </div>
         ) : (
          <div>
           &nbsp;-&nbsp;
           {format(new Date(checkOutValue), "MMM-dd").split("-").join(" ")}
          </div>
         )}
        </div>
        <div className="w-full h-[1px] bg-gray-700 absolute bottom-[3px]" />
       </div>
      </div>
      <button className="bg-gradient-to-r from-primary via-rose-600 to-primary/70 text-white w-fit rounded-lg py-3 font-medium px-5">
       Reserve
      </button>
     </div>
    </div>
   )}
   {showCalendar && (
    <div className="fixed inset-0 bg-gray-800/50 w-screen h-screen z-[99]">
     <div className="fixed inset-0 bg-white w-screen h-screen mt-4 rounded-t-xl px-6 py-2">
      <div className="flex justify-between items-center">
       <span
        onClick={() => setShowCalendar(false)}
        className="text-xl font-medium"
       >
        x
       </span>
       <span className="text-sm underline">Clear dates</span>
      </div>
      <div className="my-6 flex flex-col gap-2">
       <span className="text-2xl font-medium">5 nights</span>
       <span className="text-sm text-gray-500">
        Oct 12, 2023 - Oct 17, 2023
       </span>
      </div>
      <DateRangePicker
       ranges={[selectionRange]}
       onChange={handleSelect}
       minDate={inDate}
       rangeColors={["#FD5B61"]}
      />
     </div>
    </div>
   )}
  </>
 );
};
export default ReserveWidget;

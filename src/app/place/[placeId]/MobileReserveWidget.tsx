"use client";
import { format, intervalToDuration } from "date-fns";
import Link from "next/link";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useForm } from "react-hook-form";
import { AiFillStar } from "react-icons/ai";

type ReserveWidgetForm = {
 checkIn: string;
 checkOut: string;
 guests: number;
};

const MobileReserveWidget = ({
 price,
 placeId,
 rating,
}: {
 price: string;
 placeId: string;
 rating:
  | {
     userEmail: string;
     placeId: string;
     rating: number;
     id: string;
    }[]
  | [];
}) => {
 const [showCalendar, setShowCalendar] = useState(false);
 const inDate = new Date();
 const outDate = new Date();
 const checkInDate = inDate.getDate() + 5;
 const checkOutDate = outDate.getDate() + 10;
 inDate.setDate(checkInDate);
 outDate.setDate(checkOutDate);
 const inDateValue = new Date(inDate).toLocaleDateString("en-US");
 const outDateValue = new Date(outDate).toLocaleDateString("en-US");
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
 const selectionRange = {
  startDate: new Date(checkInValue),
  endDate: new Date(checkOutValue),
  key: "selection",
 };
 const handleSelect = (ranges: any) => {
  reserve.setValue("checkIn", ranges.selection.startDate.toLocaleDateString("en-US"));
  reserve.setValue("checkOut", ranges.selection.endDate.toLocaleDateString("en-US"));
 };
 const amountNights = intervalToDuration({
  start: new Date(checkInValue),
  end: new Date(checkOutValue),
 });
 return (
  <>
   <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-t-gray-300 w-screen z-50 px-6 py-4">
    <div className="flex justify-between items-center">
     <div className="flex flex-col text-sm">
      <div>
       <span className="font-bold">${price}</span> night
      </div>
      <div onClick={() => setShowCalendar(true)} className="flex w-fit relative font-medium">
       <div>
        {format(new Date(checkInValue), "MMM").split("/")[0]} {checkInValue.split("/")[1]}
       </div>
       <div>
        {checkInValue.split("/")[0] === checkOutValue.split("/")[0] ? (
         <div>
          <span className="px-1">-</span>
          {checkOutValue.split("/")[1]}
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
     <Link
      href={`/place/reserve/${placeId}?checkIn=${checkInValue}&checkOut=${checkOutValue}&guests=${reserve.getValues("guests")}`}
      className="bg-gradient-to-r from-primary via-blue-600 to-primary/70 text-white w-fit rounded-lg py-3 font-medium px-5"
     >
      Reserve
     </Link>
    </div>
   </div>
   {showCalendar && (
    <div className="fixed inset-0 bg-gray-800/50 w-screen h-screen z-[99]">
     <div className="fixed inset-0 bg-white w-screen h-screen mt-4 rounded-t-xl px-6 py-2">
      <div className="flex justify-between items-center">
       <span onClick={() => setShowCalendar(false)} className="text-xl font-medium">
        x
       </span>
       <span
        onClick={() => {
         reserve.setValue("checkIn", inDateValue);
         reserve.setValue("checkOut", outDateValue);
        }}
        className="text-sm underline"
       >
        Reset dates
       </span>
      </div>
      <div className="mt-4 flex flex-col gap-2">
       <div className="text-2xl font-medium">
        {(amountNights?.years as number) > 0 && <span>{amountNights.years} year(s)</span>}{" "}
        {(amountNights?.months as number) > 0 && <span>{amountNights.months} month(s)</span>} <span>{amountNights?.days} night(s)</span>
       </div>
       <span className="text-sm text-gray-500">
        {format(new Date(checkInValue), "PP")} - {format(new Date(checkOutValue), "PP")}
       </span>
      </div>
      <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} minDate={inDate} rangeColors={["#FD5B61"]} />
     </div>
     <div className="flex justify-between items-center absolute bottom-0 w-full px-6 py-4 border-t border-t-gray-300/90">
      <div className="flex flex-col gap-[2px]">
       <div>
        <span className="font-bold tracking-wide">${price}</span> <span className="text-sm">night</span>
       </div>
       <div className="flex items-center text-xs font-medium gap-1">
        <AiFillStar />
        {rating.length === 0 ? "0.00" : (rating.map((r) => r.rating).reduce((t, c) => t + c, 0) / rating.length).toFixed(2)}
       </div>
      </div>
      <button className="bg-black/90 text-white px-6 py-3 font-bold rounded-lg" onClick={() => setShowCalendar(false)}>
       Save
      </button>
     </div>
    </div>
   )}
  </>
 );
};
export default MobileReserveWidget;

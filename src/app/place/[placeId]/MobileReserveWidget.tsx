"use client";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useState } from "react";
import { DateRangePicker } from "react-date-range";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

type ReserveWidgetForm = {
 checkIn: string;
 checkOut: string;
 guests: number;
};

const MobileReserveWidget = ({ price }: { price: String }) => {
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
export default MobileReserveWidget;

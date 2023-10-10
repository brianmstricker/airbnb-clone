"use client";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";

const MobileSearchModal = ({
 hideMenu,
 currentSearchText,
 currentGuestCount,
}: {
 hideMenu: () => void;
 currentSearchText: string | null;
 currentGuestCount: string | null;
}) => {
 const [placeText, setPlaceText] = useState(
  currentSearchText !== "Anywhere" ? currentSearchText : ""
 );
 const [showWhoMenu, setShowWhoMenu] = useState(false);
 const [showWhereMenu, setShowWhereMenu] = useState(true);
 const [guestCount, setGuestCount] = useState(
  currentGuestCount !== "Add guests" ? parseInt(currentGuestCount as string) : 0
 );
 return (
  <div className="z-[99] fixed inset-0 bg-white w-screen h-screen md:hidden">
   <div className="flex p-6 items-center relative">
    <div
     className="border border-gray-400 rounded-full w-8 h-8 flex items-center justify-center z-10"
     onClick={hideMenu}
    >
     <span className="font-bold relative -top-[1px]">x</span>
    </div>
    <div className="absolute right-1/2 left-1/2 translate-x-[-50%] h-fit w-fit">
     <span className="font-semibold text-lg">Stays</span>
     <div className="w-full h-[2px] bg-black" />
    </div>
   </div>
   {showWhereMenu ? (
    <div className="border mx-3 border-gray-200 rounded-3xl shadow-lg drop-shadow-lg">
     <div className="p-5 pb-7">
      <div className="text-2xl font-bold tracking-wide">Where to?</div>
      <label className="border border-gray-400 w-full mt-2 rounded-xl flex items-center h-[60px] gap-3">
       <div className="pl-4">
        <FiSearch size={18} />
       </div>
       <input
        className="bg-transparent w-full h-[50%] border-none outline-none text-sm placeholder:text-gray-500 capitalize"
        placeholder="Search destinations"
        value={placeText as string}
        onChange={(e) => setPlaceText(e.target.value)}
       />
      </label>
     </div>
    </div>
   ) : (
    <div
     onClick={() => {
      setShowWhereMenu(true);
      setShowWhoMenu(false);
     }}
     className="border mx-3 rounded-xl border-gray-200/95 shadow-sm drop-shadow-sm"
    >
     <div className="flex justify-between w-full p-4 text-sm">
      <span className="text-gray-700">Where</span>
      <span className="font-medium">
       {placeText && placeText !== " " ? placeText : "I'm flexible"}
      </span>
     </div>
    </div>
   )}
   {!showWhoMenu ? (
    <div
     onClick={() => {
      setShowWhoMenu(true);
      setShowWhereMenu(false);
     }}
     className="border border-gray-200/95 mx-3 rounded-xl shadow-sm drop-shadow-sm mt-4 py-4 px-5 flex justify-between"
    >
     <div className="text-sm text-gray-600/90 font-medium">Who</div>
     <div className="text-sm text-black/95 font-medium">
      {guestCount === 0 ? "Add guests" : guestCount + " guest(s)"}
     </div>
    </div>
   ) : (
    <div className="border border-gray-200 mx-3 rounded-3xl shadow-lg drop-shadow-lg mt-4 py-4 px-5 flex flex-col gap-4">
     <div className="text-2xl font-bold tracking-wide">Who&apos;s Coming?</div>
     <div className="flex justify-between">
      <div className="font-medium">Guests</div>
      <div className="flex items-center gap-3">
       <div onClick={() => setGuestCount(guestCount - 1)}>
        <AiOutlineMinusCircle
         size={30}
         className={"fill-gray-900/70" + (guestCount === 0 ? " hidden" : "")}
        />
       </div>
       <div
        className={
         "text-lg text-gray-900/70" +
         (guestCount === 0 ? " !text-black/90" : "")
        }
       >
        {guestCount}
       </div>
       <div onClick={() => setGuestCount(guestCount + 1)}>
        <AiOutlinePlusCircle size={30} className="fill-gray-900/70" />
       </div>
      </div>
     </div>
    </div>
   )}
   <div className="absolute bottom-5 px-5 w-full flex justify-between items-center">
    <div
     onClick={() => {
      setPlaceText("");
      setGuestCount(0);
     }}
     className="font-semibold underline"
    >
     Clear all
    </div>
    <Link
     href={`/search?location=${encodeURIComponent(
      placeText as string
     )}&guests=${guestCount === 0 ? 1 : guestCount}`}
     onClick={() => hideMenu()}
     className="flex items-center gap-3 text-white px-5 py-3 rounded-md font-medium bg-gradient-to-r from-primary to-primary/90"
    >
     <FiSearch size={18} />
     Search
    </Link>
   </div>
  </div>
 );
};
export default MobileSearchModal;

"use client";
import { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LargeSearchBar = ({
 placePage,
 showSearchMenu,
 setShowSearchMenu,
}: {
 placePage: boolean;
 showSearchMenu: boolean;
 setShowSearchMenu: (arg: boolean) => void;
}) => {
 const searchParams = useSearchParams();
 const [placeText, setPlaceText] = useState(searchParams.get("location") || "");
 const [guestCount, setGuestCount] = useState(
  searchParams.get("guests")?.split(" ")[0] || ""
 );
 useEffect(() => {
  searchParams.get("location") === null
   ? setPlaceText("")
   : setPlaceText(searchParams.get("location") as string);
  searchParams.get("guests") === null
   ? setGuestCount("")
   : setGuestCount(searchParams.get("guests")?.split(" ")[0] as string);
 }, [searchParams]);
 useEffect(() => {
  if (showSearchMenu) {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "hidden") : null;
  } else {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "auto") : null;
  }
 }, [showSearchMenu]);
 return (
  <>
   {!showSearchMenu && (
    <div
     onClick={() => setShowSearchMenu(true)}
     className={
      "flex gap-4 border-2 border-gray-200 pl-5 pr-2 py-2 rounded-full items-center shadow-sm shadow-gray-200 hover:shadow-gray-800/25 duration-200 ml-0 lg:ml-28 tracking-tight text-[.9rem] cursor-pointer" +
      (placePage ? " absolute left-24 lg:static" : "")
     }
    >
     {placePage ? (
      <div className="font-medium pr-24">Start your search</div>
     ) : (
      <>
       <div className="font-medium capitalize">
        {placeText !== "" ? placeText : "Anywhere"}
       </div>
       <div className="w-[1px] h-6 bg-gray-200" />
       <div className="font-medium">Any week</div>
       <div className="w-[1px] h-6 bg-gray-200" />
       <div className="text-gray-400">
        {guestCount === ""
         ? "Add guests"
         : parseInt(guestCount) === 1
         ? "1 guest"
         : guestCount + " guests"}
       </div>
      </>
     )}
     <div className="bg-primary rounded-full p-2 text-white">
      <ImSearch size={12} />
     </div>
    </div>
   )}
   {showSearchMenu && (
    <>
     <div className="w-fit">
      <span>Search</span>
      <div className="w-full h-[2px] bg-black rounded-full" />
     </div>
     <form
      onSubmit={() => {}}
      className="flex items-center border border-gray-300 rounded-full absolute top-14 left-0 right-[5.5rem] w-fit mx-auto bg-gray-200/60"
     >
      <label
       className="flex flex-col w-full h-full py-3 pl-8 pr-4 hover:bg-gray-300/50 rounded-full"
       htmlFor="location"
       onMouseOver={() => {
        const divSeparator = document.getElementById("divSeparator");
        divSeparator?.classList.remove("bg-gray-300");
       }}
       onMouseLeave={() => {
        const divSeparator = document.getElementById("divSeparator");
        divSeparator?.classList.add("bg-gray-300");
       }}
      >
       <span className="font-semibold text-xs">Where</span>
       <input
        className="text-sm outline-none border-none bg-transparent placeholder:text-black/60 capitalize"
        type="text"
        placeholder="Search destinations"
        id="location"
        value={placeText}
        onChange={(e) => setPlaceText(e.target.value)}
       />
      </label>
      <div className="w-[1px] h-10 bg-gray-300" id="divSeparator" />
      <div
       className="flex items-center pr-2 rounded-full relative hover:bg-gray-300/50"
       id="hoverDiv"
      >
       <label
        className="flex flex-col w-full h-full py-3 pl-4"
        htmlFor="guests"
        onMouseOver={() => {
         const divSeparator = document.getElementById("divSeparator");
         divSeparator?.classList.remove("bg-gray-300");
        }}
        onMouseLeave={() => {
         const divSeparator = document.getElementById("divSeparator");
         divSeparator?.classList.add("bg-gray-300");
        }}
       >
        <span className="font-semibold text-xs">Who</span>
        <input
         className="text-sm outline-none border-none bg-transparent placeholder:text-black/60 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
         type="number"
         placeholder={"Add guests"}
         id="guests"
         value={guestCount}
         onChange={(e) => setGuestCount(e.target.value)}
        />
       </label>
       <Link
        href={
         "/search?location=" +
         encodeURIComponent(placeText) +
         "&guests=" +
         (guestCount || 1)
        }
        onClick={() => setShowSearchMenu(false)}
        id="LargeSearchSubmitButton"
        className="bg-primary flex w-full h-full rounded-full p-4 text-white z-10"
        onMouseOver={() => {
         const hoverDiv = document.getElementById("hoverDiv");
         hoverDiv?.classList.remove("hover:bg-gray-300/50");
         const divSeparator = document.getElementById("divSeparator");
         divSeparator?.classList.add("bg-gray-300");
        }}
        onMouseLeave={() => {
         const hoverDiv = document.getElementById("hoverDiv");
         hoverDiv?.classList.add("hover:bg-gray-300/50");
        }}
       >
        <ImSearch size={16} />
       </Link>
      </div>
      <div className="bg-transparent absolute w-12 h-16 right-0" />
     </form>
    </>
   )}
  </>
 );
};
export default LargeSearchBar;

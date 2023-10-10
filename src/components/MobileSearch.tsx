"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import MobileSearchModal from "./MobileSearchModal";

const MobileSearch = () => {
 const pathname = usePathname();
 const searchParams = useSearchParams();
 const [showSearchMenu, setShowSearchMenu] = useState(false);
 const [placeText, setPlaceText] = useState(searchParams.get("location"));
 const [guestCount, setGuestCount] = useState(searchParams.get("guests"));
 useEffect(() => {
  const location = searchParams.get("location");
  if (!location || location === null) setPlaceText("Anywhere");
  else setPlaceText(location);
  const guests = searchParams.get("guests");
  if (!guests || guests === null) setGuestCount("Add guests");
  else setGuestCount(guests);
 }, [searchParams]);
 if (!pathname) return null;
 const placePage = pathname.includes("/place/");
 if (placePage) return null;
 return (
  <>
   <div className="w-full flex justify-between md:hidden fixed top-0 left-0 z-30 px-6 pt-3 pb-4 bg-white items-center gap-2">
    <div
     className="flex-grow border rounded-full p-3 shadow-md overflow-hidden w-full z-10"
     onClick={() => setShowSearchMenu(true)}
    >
     <div className="flex items-center gap-3">
      <div className="shrink-0">
       <FiSearch size={24} />
      </div>
      <div className="text-sm w-full text-gray-600 overflow-hidden min-w-0">
       <div className="truncate">
        <span className="font-semibold truncate capitalize">{placeText}</span>
       </div>
       <div className="flex min-w-0 items-center gap-2 text-xs">
        <span className="truncate min-w-[50px]">Any week</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="truncate min-w-[50px]">
         {guestCount === "Add guests" ? guestCount : guestCount + " guest(s)"}
        </span>
       </div>
      </div>
     </div>
    </div>
    {/* <div className="border border-gray-400 p-2 rounded-full">
     <TbAdjustmentsHorizontal size={20} />
    </div> */}
   </div>
   {showSearchMenu && (
    <>
     <MobileSearchModal
      hideMenu={() => setShowSearchMenu(false)}
      currentSearchText={placeText}
      currentGuestCount={guestCount}
     />
    </>
   )}
  </>
 );
};
export default MobileSearch;

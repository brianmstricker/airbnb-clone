"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import MobileSearchModal from "./MobileSearchModal";

const MobileSearch = () => {
 const [showSearchMenu, setShowSearchMenu] = useState(false);
 const pathname = usePathname();
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
        <span className="font-semibold truncate">Anywhere</span>
       </div>
       <div className="flex min-w-0 items-center gap-2 text-xs">
        <span className="truncate min-w-[50px]">Any week</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full" />
        <span className="truncate min-w-[50px]">Add guests</span>
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
     <MobileSearchModal hideMenu={() => setShowSearchMenu(false)} />
    </>
   )}
  </>
 );
};
export default MobileSearch;

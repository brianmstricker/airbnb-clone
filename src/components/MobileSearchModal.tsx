import { FiSearch } from "react-icons/fi";

const MobileSearchModal = ({ hideMenu }: { hideMenu: () => void }) => {
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
   <div className="border border-gray-200 mx-3 rounded-3xl shadow-lg drop-shadow-lg">
    <div className="p-5 pb-7">
     <div className="text-2xl font-bold tracking-wide">Where to?</div>
     <label className="border border-gray-400 w-full mt-2 rounded-xl flex items-center h-[60px] gap-3">
      <div className="pl-4">
       <FiSearch size={18} />
      </div>
      <input
       className="bg-transparent w-full h-[50%] border-none outline-none text-sm placeholder:text-gray-500"
       placeholder="Search destinations"
      />
     </label>
    </div>
   </div>
   <div className="border border-gray-200 mx-3 rounded-3xl shadow-lg drop-shadow-lg mt-4 py-4 px-5 flex justify-between">
    <div className="text-sm text-gray-600/90 font-medium">Who</div>
    <div className="text-sm text-black/95 font-medium">Add guests</div>
   </div>
   <div className="absolute bottom-5 px-5 w-full flex justify-between items-center">
    <div className="font-semibold underline">Clear all</div>
    <div className="flex items-center gap-3 text-white px-5 py-3 rounded-md font-medium bg-gradient-to-r from-primary to-primary/90">
     <FiSearch size={18} />
     Search
    </div>
   </div>
  </div>
 );
};
export default MobileSearchModal;

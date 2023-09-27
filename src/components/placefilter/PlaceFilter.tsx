"use client";
import { HiOutlineHome } from "react-icons/hi";
import FilterItem from "./FilterItem";
import {
 MdCabin,
 MdGridOff,
 MdOutlineLocalFireDepartment,
} from "react-icons/md";
import { PiCastleTurretBold, PiLighthouse } from "react-icons/pi";
import {
 GiCampingTent,
 GiTreehouse,
 GiWaterMill,
 GiWindmill,
} from "react-icons/gi";
import { AiOutlinePicture } from "react-icons/ai";
import { TbAdjustmentsHorizontal, TbBeach, TbUfo } from "react-icons/tb";
import { CgGames } from "react-icons/cg";
import { FaChevronRight, FaSkiing } from "react-icons/fa";

const PlaceFilter = () => {
 return (
  <div className="pt-3 pb-12 text-xs text-gray-500 flex justify-between items-center">
   <div className="grid grid-flow-col overflow-clip relative">
    <FilterItem icon={<HiOutlineHome />} text="Tiny homes" />
    <FilterItem icon={<PiCastleTurretBold />} text="Castles" />
    <FilterItem icon={<MdCabin />} text="Cabins" />
    <FilterItem icon={<GiWindmill />} text="Windmills" />
    <FilterItem icon={<GiWaterMill />} text="Lakefront" />
    <FilterItem icon={<AiOutlinePicture />} text="Amazing views" />
    <FilterItem icon={<TbUfo />} text="OMG!" />
    <FilterItem icon={<GiTreehouse />} text="Treehouses" />
    <FilterItem icon={<MdGridOff />} text="Off-the-grid" />
    <FilterItem icon={<MdOutlineLocalFireDepartment />} text="Trending" />
    <FilterItem icon={<CgGames />} text="Play" />
    <FilterItem icon={<TbBeach />} text="Beachfront" />
    <FilterItem icon={<PiLighthouse />} text="Lighthouse" />
    <FilterItem icon={<FaSkiing />} text="Skiing" />
    <FilterItem icon={<GiCampingTent />} text="Camping" />
    <div className="absolute w-9 h-9 bg-white/30 right-2 rounded-full bottom-1" />
   </div>
   <div className="flex items-center gap-5">
    <button className="p-2 flex items-center border rounded-full border-gray-400 text-black">
     <FaChevronRight />
    </button>
    <button className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2">
     <TbAdjustmentsHorizontal size={20} />
     <span>Filters</span>
    </button>
    <button className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2">
     <span className="w-max">Display total before taxes</span>
     <div className="bg-gray-400 w-10 h-6 rounded-full">
      <div className="bg-white w-5 h-5 rounded-full mx-[2px] relative top-[2px]" />
     </div>
    </button>
   </div>
  </div>
 );
};
export default PlaceFilter;

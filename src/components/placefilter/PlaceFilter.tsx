"use client";
import { HiOutlineHome } from "react-icons/hi";
import FilterItem from "./FilterItem";
import {
 MdCabin,
 MdGridOff,
 MdOutlineDirectionsBoatFilled,
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
import { FaChevronLeft, FaChevronRight, FaSkiing } from "react-icons/fa";
import { IoEarth } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";

const PlaceFilter = () => {
 const sliderRef = useRef(null);
 const [sliderPosition, setSliderPosition] = useState(getSliderPosition());
 const slideLeft = () => {
  const slider = sliderRef.current;
  slider ? (slider.scrollLeft -= 500) : null;
 };
 const slideRight = () => {
  const slider = sliderRef.current;
  slider ? (slider.scrollLeft += 500) : null;
 };
 function getSliderPosition() {
  const slider = sliderRef.current;
  if (slider) {
   const sliderPosition = slider.scrollLeft;
   return sliderPosition;
  }
  return 0;
 }
 useEffect(() => {
  const slider = sliderRef.current;
  function handleSliderScroll() {
   setSliderPosition(getSliderPosition());
  }
  if (slider) {
   slider.addEventListener("scroll", handleSliderScroll);
  }
  return () => {
   if (slider) {
    slider.removeEventListener("scroll", handleSliderScroll);
   }
  };
 }, []);
 const maxScroll = sliderRef.current
  ? sliderRef.current.scrollWidth - sliderRef.current.clientWidth
  : 0;
 return (
  <div className="pt-3 pb-12 text-xs text-gray-500 flex justify-between items-center relative">
   <div
    className={
     "absolute w-12 h-14 bg-gradient-to-r from-white via-white/50 to-transparent top-2 left-[26px] z-10 pointer-events-none" +
     (sliderPosition === 0 ? " hidden" : "")
    }
   />
   <button
    className={
     "items-center text-black flex relative group" +
     (sliderPosition === 0 ? " hidden" : "")
    }
    onClick={slideLeft}
   >
    <div className="p-3 border rounded-full border-gray-400 group-hover:scale-105 duration-100 z-10" />
    <FaChevronLeft className="absolute left-1/2 right-1/2 -translate-x-1/2" />
   </button>
   <div
    className="grid grid-flow-col overflow-x-scroll relative whitespace-nowrap scrollbar-hide scroll-smooth overflow-y-hidden top-3"
    id="slider"
    ref={sliderRef}
   >
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
    <FilterItem icon={<MdOutlineDirectionsBoatFilled />} text="Houseboat" />
    <FilterItem icon={<IoEarth />} text="Earthhome" />
   </div>
   <div className="flex items-center gap-5 relative">
    <div className="absolute w-8 h-14 bg-gradient-to-r from-transparent via-white/50 to-white top-0 -left-8 pointer-events-none" />
    <button
     className={
      "items-center text-black flex relative group" +
      (maxScroll - sliderPosition === 0 ? " opacity-40" : "")
     }
     onClick={slideRight}
    >
     <div className="p-3 border rounded-full border-gray-400 group-hover:scale-105 duration-100 z-10" />
     <FaChevronRight className="absolute left-1/2 right-1/2 -translate-x-1/2" />
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

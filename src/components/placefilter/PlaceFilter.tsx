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
import { FaChevronLeft, FaChevronRight, FaSkiing } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const PlaceFilter = () => {
 const sliderRef = useRef(null);
 const [sliderPosition, setSliderPosition] = useState(getSliderPosition());
 const slideLeft = () => {
  const slider = sliderRef.current;
  slider ? (slider.scrollLeft -= 300) : null;
 };
 const slideRight = () => {
  const slider = sliderRef.current;
  slider ? (slider.scrollLeft += 300) : null;
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
 const maxScroll = slider.scrollWidth - slider.clientWidth;
 return (
  <div className="pt-3 pb-12 text-xs text-gray-500 flex justify-between items-center relative">
   <div
    className={
     "absolute w-12 h-14 bg-gradient-to-r from-white via-white/50 to-transparent top-2 left-[30px] z-10" +
     (sliderPosition === 0 ? " hidden" : "")
    }
   />
   <button
    className={
     "p-2 items-center border rounded-full border-gray-400 text-black flex" +
     (sliderPosition === 0 ? " hidden" : "")
    }
   >
    <FaChevronLeft onClick={slideLeft} />
   </button>
   <div
    className="grid grid-flow-col overflow-x-scroll relative whitespace-nowrap scrollbar-hide scroll-smooth"
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
   </div>
   <div className="flex items-center gap-5 relative">
    <div className="absolute w-4 h-14 bg-gradient-to-r from-transparent via-white/50 to-white top-0 -left-4" />
    <button
     className={
      "p-2 flex items-center border rounded-full border-gray-400 text-black" +
      (maxScroll - sliderPosition === 0 ? " opacity-40" : "")
     }
    >
     <FaChevronRight onClick={slideRight} />
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

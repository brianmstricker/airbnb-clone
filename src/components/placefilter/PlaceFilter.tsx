"use client";
import { HiOutlineHome } from "react-icons/hi";
import FilterItem from "./FilterItem";
import {
 MdCabin,
 MdGridOff,
 MdOutlineDirectionsBoatFilled,
 MdOutlineLocalFireDepartment,
} from "react-icons/md";
import { PiCastleTurretBold, PiGridFour, PiLighthouse } from "react-icons/pi";
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
import { BsCheckLg, BsSearch } from "react-icons/bs";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PlaceFilter = ({ searchPage }: { searchPage?: boolean }) => {
 const searchParams = useSearchParams();
 const total = searchParams.get("total");
 const [url, setUrl] = useState<null | string>(null);
 const [prevSearchParams, setPrevSearchParams] = useState<null | string>(null);
 useEffect(() => {
  setUrl(window.location.href);
  let searchParamsMinusTotal = searchParams.toString();
  searchParamsMinusTotal = searchParamsMinusTotal.replace("total=true", "");
  setPrevSearchParams(searchParamsMinusTotal);
 }, [searchParams]);
 const sliderRef = useRef(null);
 const [sliderPosition, setSliderPosition] = useState(getSliderPosition());
 const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);
 function getScrollAmount() {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 1000) {
   return 700;
  } else if (screenWidth >= 768) {
   return 250;
  } else {
   return 100;
  }
 }
 const slideLeft = () => {
  const slider = sliderRef.current;
  if (slider) {
   setIsRightButtonDisabled(false);
   slider.scrollLeft -= getScrollAmount();
  }
  if (!slider) return;
 };
 const slideRight = () => {
  const slider = sliderRef.current;
  if (slider) {
   slider.scrollLeft += getScrollAmount();
   setIsRightButtonDisabled(
    slider.scrollLeft + slider.clientWidth === slider.scrollWidth
   );
  }
  if (!slider) return;
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
   setIsRightButtonDisabled(
    slider.scrollLeft + slider.clientWidth === slider.scrollWidth
   );
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
 function animateBall() {
  const ball = document.querySelector(".ball");
  if (ball) {
   ball.classList.add("animate-pulse");
   ball.classList.add("duration-500");
   setTimeout(() => {
    ball.classList.remove("animate-pulse");
    ball.classList.remove("duration-500");
   }, 500);
  }
 }
 return (
  <div>
   <div className="md:pt-3 md:pb-10 text-xs text-gray-500 flex justify-between items-center md:relative border-b md:border-b-0 fixed top-[84px] md:top-auto z-30 md:z-auto bg-white md:bg-inherit left-0 right-0 md:left-auto md:right-auto">
    <div className="hidden md:block absolute">
     <div
      className={
       "absolute w-12 h-16 bg-gradient-to-r from-white via-white to-transparent -top-4 z-10 pointer-events-none" +
       (sliderPosition === 0 ? " hidden" : "")
      }
     />
     <button
      className={
       "items-center text-black flex relative group z-20" +
       (sliderPosition === 0 ? " hidden" : "")
      }
      onClick={slideLeft}
     >
      <div className="p-3 border rounded-full border-gray-400 group-hover:scale-110 duration-100" />
      <FaChevronLeft className="absolute left-1/2 right-1/2 -translate-x-1/2" />
     </button>
    </div>
    <div
     className="grid grid-flow-col overflow-x-scroll relative whitespace-nowrap scrollbar-hide scroll-smooth overflow-y-hidden md:top-3 px-6 md:px-0"
     id="slider"
     ref={sliderRef}
    >
     {searchPage && (
      <>
       <FilterItem icon={<BsSearch />} text="Your Search" />
       <div className="h-full w-[1px] bg-black mr-3 relative -top-4" />
      </>
     )}
     <FilterItem icon={<PiGridFour />} text="All Places" />
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
    <div className="hidden md:flex items-center gap-5 relative">
     <div
      className={
       "absolute w-16 h-14 bg-gradient-to-r from-transparent via-white/50 to-white top-0 -left-16 pointer-events-none" +
       (isRightButtonDisabled ? " opacity-0" : "")
      }
     />
     <button
      className={
       "items-center text-black flex relative -left-4" +
       (isRightButtonDisabled ? " opacity-40 cursor-default" : " group")
      }
      onClick={slideRight}
     >
      <div className="p-3 border rounded-full border-gray-400 group-hover:scale-110 duration-100 z-10" />
      <FaChevronRight className="absolute left-1/2 right-1/2 -translate-x-1/2" />
     </button>
     {/* <button className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2">
      <TbAdjustmentsHorizontal size={20} />
      <span>Filters</span>
     </button> */}
     {!total && !prevSearchParams && (
      <Link
       href={`?${new URLSearchParams({ total: "true" })}`}
       className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2"
       onClick={() => animateBall()}
      >
       <span className="w-max">Display total before taxes</span>
       <div className="bg-gray-400 w-10 h-6 rounded-full hover:bg-gray-600/90 relative">
        <div className="bg-white w-5 h-5 rounded-full mx-[2px] absolute top-[2px] left-0 ball" />
       </div>
      </Link>
     )}
     {!total && prevSearchParams && (
      <Link
       href={`${url}&${new URLSearchParams({ total: "true" })}`}
       className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2"
       onClick={() => animateBall()}
      >
       <span className="w-max">Display total before taxes</span>
       <div className="bg-gray-400 w-10 h-6 rounded-full hover:bg-gray-600/90 relative">
        <div className="bg-white w-5 h-5 rounded-full mx-[2px] absolute top-[2px] left-0 ball" />
       </div>
      </Link>
     )}
     {total && !prevSearchParams && (
      <Link
       href={`/`}
       className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2"
       onClick={() => animateBall()}
      >
       <span className="w-max">Display total before taxes</span>
       <div className="bg-black w-10 h-6 rounded-full relative">
        <div className="bg-white w-5 h-5 rounded-full mx-[2px] absolute top-[2px] right-0 flex items-center justify-center ball">
         <BsCheckLg size={16} />
        </div>
       </div>
      </Link>
     )}
     {total && prevSearchParams && (
      <Link
       href={`?${prevSearchParams.slice(0, prevSearchParams.length - 1)}`}
       className="p-4 flex items-center text-black border rounded-xl border-gray-300 gap-2"
       onClick={() => animateBall()}
      >
       <span className="w-max">Display total before taxes</span>
       <div className="bg-black w-10 h-6 rounded-full relative">
        <div className="bg-white w-5 h-5 rounded-full mx-[2px] absolute top-[2px] right-0 flex items-center justify-center ball">
         <BsCheckLg size={16} />
        </div>
       </div>
      </Link>
     )}
    </div>
   </div>
  </div>
 );
};
export default PlaceFilter;

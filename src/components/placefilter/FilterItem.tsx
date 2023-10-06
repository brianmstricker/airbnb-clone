"use client";

import { useState } from "react";

type FilterItemProps = {
 icon: React.ReactNode;
 text: string;
};

const FilterItem = ({ icon, text }: FilterItemProps) => {
 const [active, setActive] = useState(false);
 return (
  <div
   className={
    "flex flex-col items-center gap-1 relative min-w-[56px] px-[2.5rem] lg:px-[3.03rem] cursor-pointer group betterhover:hover:text-gray-900 lg:-left-[14px]" +
    (active ? " bg-red-500" : "")
   }
   onClick={(e) => {
    const text = e.currentTarget.querySelector("span")?.innerText;
    console.log(text);
   }}
  >
   <div className="text-[28px]">{icon}</div>
   <div className="whitespace-nowrap relative">
    <span className="font-medium tracking-tight text-[12px]">{text}</span>
    <div className="opacity-0 h-[2px] bg-black md:bg-gray-300 z-10 mt-3 mx-auto duration-150 relative md:-top-[4px] betterhover:group-hover:opacity-100" />
   </div>
  </div>
 );
};
export default FilterItem;

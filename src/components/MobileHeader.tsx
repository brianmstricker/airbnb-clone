"use client";

import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { PiUserCircle } from "react-icons/pi";
import { FaAirbnb } from "react-icons/fa";

const items = [
 { text: "Explore", icon: <FiSearch size={26} /> },
 { text: "Wishlist", icon: <AiOutlineHeart size={26} /> },
 { text: "Trips", icon: <FaAirbnb size={26} /> },
 { text: "Inbox", icon: <BiMessage size={26} /> },
 { text: "Profile", icon: <PiUserCircle size={28} /> },
];

const MobileHeader = () => {
 return (
  <nav className="fixed bottom-0 left-0 py-3 w-full bg-white z-20 md:hidden flex items-center text-[0.65rem]">
   <ul className="flex flex-[1_0_auto] items-center w-full justify-center max-w-[560px] mx-auto">
    {items.map((item) => (
     <li
      key={item.text}
      className="flex flex-col flex-[1_1_0px] items-center max-w-[20%] px-[2px] gap-[2px]"
     >
      <span className="text-gray-400">{item.icon}</span>
      <span className="font-semibold text-gray-600">{item.text}</span>
     </li>
    ))}
   </ul>
  </nav>
 );
};
export default MobileHeader;

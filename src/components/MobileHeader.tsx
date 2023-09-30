"use client";

import { AiOutlineHeart } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { BiMessage } from "react-icons/bi";
import { PiUserCircle } from "react-icons/pi";
import { FaAirbnb } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Link from "next/link";

const items = [
 { text: "Explore", href: "/", icon: <FiSearch size={26} /> },
 {
  text: "Wishlist",
  href: "/account/wishlist",
  icon: <AiOutlineHeart size={26} />,
 },
 { text: "Trips", href: "/account/trips", icon: <FaAirbnb size={26} /> },
 { text: "Inbox", href: "/inbox", icon: <BiMessage size={26} /> },
 { text: "Profile", href: "/account", icon: <PiUserCircle size={28} /> },
];

const MobileHeader = () => {
 const pathname = usePathname();
 if (!pathname) return null;
 const placePage = pathname.includes("/place/");
 if (placePage) return null;
 return (
  <nav className="fixed bottom-0 left-0 py-3 w-full bg-white z-20 md:hidden flex items-center text-[0.65rem]">
   <ul className="flex flex-[1_0_auto] items-center w-full justify-center max-w-[560px] mx-auto">
    {items.map((item) => (
     <Link
      href={item.href}
      key={item.text}
      className="flex flex-col flex-[1_1_0px] items-center max-w-[20%] px-[2px] gap-[2px]"
     >
      <span className="text-gray-400">{item.icon}</span>
      <span className="font-semibold text-gray-600">{item.text}</span>
     </Link>
    ))}
   </ul>
  </nav>
 );
};
export default MobileHeader;

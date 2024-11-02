"use client";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import Socials from "./Socials";
import { usePathname } from "next/navigation";

const ContentFooter = () => {
 const pathname = usePathname();
 const accountPage = pathname.includes("/account") || pathname.includes("/trips");
 return (
  <div
   className={
    "md:border-t border-t-gray-300/80 text-sm text-black/90 md:z-[101] md:bg-white max-w-6xl md:mx-auto py-6 md:px-0 lg:px-2" +
    (accountPage ? " hidden md:block" : "")
   }
  >
   <div className="flex flex-col-reverse gap-3 lg:flex-row md:items-center justify-center lg:justify-between">
    <div className="flex gap-2 items-center">
     <span className="hidden sm:block">© 2024 barebnb, Inc.</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full hidden sm:block" />
     <span>Terms</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full" />
     <span>Sitemap</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full" />
     <span>Privacy</span>
    </div>
    <span className="sm:hidden block">© 2024 barebnb, Inc.</span>
    <div className="font-medium flex gap-4 items-center">
     <div className="flex items-center gap-1.5">
      <HiOutlineGlobeAlt size={20} /> <span>English (US)</span>
     </div>
     <div>
      $ <span className="ml-1">USD</span>
     </div>
     <Socials />
    </div>
   </div>
  </div>
 );
};
export default ContentFooter;

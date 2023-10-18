import { HiOutlineGlobeAlt } from "react-icons/hi";

const HomeFooter = () => {
 return (
  <div className="hidden md:block fixed bottom-0 border-t border-t-gray-300 w-full text-sm text-black/90 z-[49] bg-white">
   <div className="contain py-3.5 flex items-center justify-between">
    <div className="flex gap-2 items-center">
     <span>© 2023 Airbnb, Inc.</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full" />
     <span>Terms</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full" />
     <span>Sitemap</span>
     <div className="w-[2px] h-[2px] bg-black/90 rounded-full" />
     <span>Privacy</span>
    </div>
    <div className="font-medium flex gap-4 items-center">
     <div className="flex items-center gap-1.5">
      <HiOutlineGlobeAlt size={20} /> <span>English (US)</span>
     </div>
     <div>
      $ <span className="ml-1">USD</span>
     </div>
    </div>
   </div>
  </div>
 );
};
export default HomeFooter;

"use client";
import { AiOutlineCar, AiOutlineWifi } from "react-icons/ai";
import { GiCctvCamera, GiHomeGarage, GiFireplace } from "react-icons/gi";
import { MdBalcony, MdOutlineSoupKitchen, MdOutlineYard } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useEffect, useState } from "react";

const Perks = ({
 registerProp,
 selected,
}: {
 registerProp: any;
 selected?: any;
}) => {
 const [selectedPerks, setSelectedPerks] = useState<any>([]);
 useEffect(() => {
  setSelectedPerks(selected);
 }, [selected]);
 const onChange = (e: any) => {
  if (e.target.checked) {
   setSelectedPerks([...selectedPerks, e.target.value]);
  } else {
   setSelectedPerks(selectedPerks.filter((p: any) => p !== e.target.value));
  }
 };
 return (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
   <label
    htmlFor="wifi"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="wifi"
     name="wifi"
     checked={selectedPerks?.includes("wifi")}
     value="wifi"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <AiOutlineWifi />
     </span>
     <span className="text-sm xxs:text-lg">Wifi</span>
    </div>
   </label>
   <label
    htmlFor="kitchen"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="kitchen"
     name="kitchen"
     checked={selectedPerks?.includes("kitchen")}
     value="kitchen"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <MdOutlineSoupKitchen />
     </span>
     <span className="text-sm xxs:text-lg">Kitchen</span>
    </div>
   </label>
   <label
    htmlFor="centralAC"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="centralAC"
     name="centralAC"
     checked={selectedPerks?.includes("centralAC")}
     value="centralAC"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <BsSnow />
     </span>
     <span className="text-sm xxs:text-lg">Central AC</span>
    </div>
   </label>
   <label
    htmlFor="parking"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="parking"
     name="parking"
     checked={selectedPerks?.includes("parking")}
     value="parking"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <AiOutlineCar />
     </span>
     <span className="text-sm xxs:text-lg">Parking</span>
    </div>
   </label>
   <label
    htmlFor="security"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="security"
     name="security"
     checked={selectedPerks?.includes("security")}
     value="security"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <GiCctvCamera />
     </span>
     <span className="text-sm xxs:text-lg">Security Cameras</span>
    </div>
   </label>
   <label
    htmlFor="balcony"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="balcony"
     name="balcony"
     checked={selectedPerks?.includes("balcony")}
     value="balcony"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <MdBalcony />
     </span>
     <span className="text-sm xxs:text-lg">Balcony</span>
    </div>
   </label>
   <label
    htmlFor="backyard"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="backyard"
     name="backyard"
     checked={selectedPerks?.includes("backyard")}
     value="backyard"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <MdOutlineYard />
     </span>
     <span className="text-sm xxs:text-lg">Backyard</span>
    </div>
   </label>
   <label
    htmlFor="private"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="private"
     name="private"
     checked={selectedPerks?.includes("private")}
     value="private"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <GiHomeGarage />
     </span>
     <span className="text-sm xxs:text-lg">Private Entrance</span>
    </div>
   </label>
   <label
    htmlFor="fireplace"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="fireplace"
     name="fireplace"
     checked={selectedPerks?.includes("fireplace")}
     value="fireplace"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <GiFireplace />
     </span>
     <span className="text-sm xxs:text-lg">Fireplace</span>
    </div>
   </label>
   <label
    htmlFor="beach"
    className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
   >
    <input
     type="checkbox"
     id="beach"
     name="beach"
     checked={selectedPerks?.includes("beach")}
     value="beach"
     {...registerProp("perks")}
     onChange={onChange}
    />
    <div className="flex items-center gap-1 ">
     <span className="text-lg xxs:text-2xl shrink-0">
      <FaUmbrellaBeach />
     </span>
     <span className="text-sm xxs:text-lg">Beach access</span>
    </div>
   </label>
  </div>
 );
};
export default Perks;

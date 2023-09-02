import React from "react";
import { AiOutlineCar, AiOutlineWifi } from "react-icons/ai";
import { GiCctvCamera, GiHomeGarage, GiFireplace } from "react-icons/gi";
import { MdBalcony, MdOutlineSoupKitchen, MdOutlineYard } from "react-icons/md";
import { BsSnow } from "react-icons/bs";
import { FaUmbrellaBeach } from "react-icons/fa";

const Perks = ({
  selected,
  onChange,
}: {
  selected: [];
  onChange: (perks: string[]) => void;
}) => {
  function handleCheck(e: React.ChangeEvent<HTMLInputElement>) {
    const { checked, name } = e.target;
    if (checked) {
      onChange([...selected, name]);
    } else {
      onChange([...selected.filter((v: string) => v !== name)]);
    }
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <label
        htmlFor="wifi"
        className="flex items-center gap-2 sm:border border-gray-400 sm:px-4 py-2 w-full rounded-md cursor-pointer"
      >
        <input type="checkbox" id="wifi" name="wifi" onChange={handleCheck} />
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
          onChange={handleCheck}
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
        <input type="checkbox" id="beach" name="beach" onChange={handleCheck} />
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

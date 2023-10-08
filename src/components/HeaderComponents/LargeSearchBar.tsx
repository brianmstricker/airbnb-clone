"use client";
import { useEffect } from "react";
import { ImSearch } from "react-icons/im";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const LargeSearchBar = ({
 placePage,
 showSearchMenu,
 setShowSearchMenu,
}: {
 placePage: boolean;
 showSearchMenu: boolean;
 setShowSearchMenu: (arg: boolean) => void;
}) => {
 const searchForm = useForm({
  defaultValues: {
   location: "",
   checkIn: "",
   checkOut: "",
   guests: "",
  },
 });
 const { register, handleSubmit } = searchForm;
 const { mutateAsync: Search } = useMutation({
  mutationFn: async (data: any) => {
   const res = await axios.post("/api/search", data);
   return res.data;
  },
  onSuccess: (data) => {
   console.log(data);
  },
  onError: (err) => {
   console.log(err);
  },
 });
 useEffect(() => {
  if (showSearchMenu) {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "hidden") : null;
  } else {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "auto") : null;
  }
 }, [showSearchMenu]);
 return (
  <>
   {!showSearchMenu && (
    <div
     onClick={() => setShowSearchMenu(true)}
     className={
      "flex gap-4 border-2 border-gray-200 pl-4 pr-2 py-2 rounded-full items-center shadow-sm shadow-gray-200 hover:shadow-gray-800/25 duration-200 ml-0 lg:ml-28 tracking-tight text-[.9rem] cursor-pointer" +
      (placePage ? " absolute left-24 lg:static" : "")
     }
    >
     {placePage ? (
      <div className="font-medium pr-24">Start your search</div>
     ) : (
      <>
       <div className="font-medium">Anywhere</div>
       <div className="w-[1px] h-6 bg-gray-200" />
       <div className="font-medium">Any week</div>
       <div className="w-[1px] h-6 bg-gray-200" />
       <div className="text-gray-400">Add guests</div>
      </>
     )}
     <div className="bg-primary rounded-full p-2 text-white">
      <ImSearch size={12} />
     </div>
    </div>
   )}
   {showSearchMenu && (
    <>
     <div className="w-fit">
      <span>Search</span>
      <div className="w-full h-[2px] bg-black rounded-full" />
     </div>
     <form
      onSubmit={handleSubmit(Search)}
      className="flex items-center border border-gray-300 rounded-full absolute top-14 left-0 right-[5.5rem] w-fit mx-auto bg-gray-200/60"
     >
      <label
       className="flex flex-col w-full h-full py-3 pl-8 pr-4 hover:bg-gray-300/50 rounded-full"
       htmlFor="location"
      >
       <span className="font-semibold text-xs">Where</span>
       <input
        className="text-sm outline-none border-none bg-transparent placeholder:text-black/60"
        type="text"
        placeholder="Search destinations"
        id="location"
        {...register("location")}
       />
      </label>
      <label
       className="flex flex-col w-full h-full py-3 px-2 items-center hover:bg-gray-300/50 rounded-full"
       htmlFor="checkIn"
      >
       <span className="font-semibold text-xs">Check in</span>
       <input
        className="text-sm outline-none border-none bg-transparent max-w-[100px] pl-[25px]  placeholder:text-black/60"
        type="text"
        placeholder="Add dates"
        id="checkIn"
        {...register("checkIn")}
       />
      </label>
      <label
       className="flex flex-col w-full h-full py-3 px-2 items-center hover:bg-gray-300/50 rounded-full"
       htmlFor="checkOut"
      >
       <span className="font-semibold text-xs">Check out</span>
       <input
        className="text-sm outline-none border-none bg-transparent max-w-[100px] pl-[20px]  placeholder:text-black/60"
        type="text"
        placeholder="Add dates"
        id="checkOut"
        {...register("checkOut")}
       />
      </label>
      <div className="w-[1px] h-10 bg-gray-300" />
      <div className="flex items-center pr-2 hover:bg-gray-300/50 rounded-full">
       <label
        className="flex flex-col w-full h-full py-3 pl-4"
        htmlFor="guests"
       >
        <span className="font-semibold text-xs">Who</span>
        <input
         className="text-sm outline-none border-none bg-transparent placeholder:text-black/60"
         type="text"
         placeholder="Add guests"
         id="guests"
         {...register("guests")}
        />
       </label>
       <button
        type="submit"
        className="bg-primary flex w-full h-full rounded-full p-4 text-white"
       >
        <ImSearch size={16} />
       </button>
      </div>
     </form>
    </>
   )}
  </>
 );
};
export default LargeSearchBar;

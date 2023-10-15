"use client";
import Perks from "./Perks";
import { placeSchema } from "@/utils/placeSchema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AiFillStar, AiOutlineFileImage, AiOutlinePlus } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { v4 } from "uuid";
import { PlaceEnum } from "@/utils/placeSchema";
import { CircleLoader } from "react-spinners";

const Page = () => {
 const [selectedImages, setSelectedImages] = useState<File[]>([]);
 const [imagesError, setImagesError] = useState(false);
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 type Form = z.infer<typeof placeSchema>;
 const place = useForm<Form>({
  resolver: zodResolver(placeSchema),
  defaultValues: {
   name: "",
   address: "",
   type: undefined,
   beds: undefined,
   baths: undefined,
   guests: undefined,
   description: "",
   photos: [],
   perks: [],
   checkInTime: "",
   checkOutTime: "",
   price: "",
  },
 });
 const {
  register,
  handleSubmit,
  formState: { errors },
 } = place;
 const { mutate: CreatePlace, isLoading } = useMutation({
  mutationFn: async (data: Form) => {
   const res = await axios.post("/api/places/user", data);
   return res.data;
  },
 });
 useEffect(() => {
  if (selectedImages.length < 5 && selectedImages.length > 0) {
   setImagesError(true);
  } else {
   setImagesError(false);
  }
 }, [selectedImages]);
 const formSubmit = async (data: Form) => {
  try {
   setLoading(true);
   const formData = new FormData();
   selectedImages.forEach((file) => {
    formData.append("image", file);
   });
   const res = await axios.post("/api/upload", formData);
   data.photos = res.data;
   CreatePlace(data, {
    onSuccess: () => {
     place.reset();
     router.push("/account/places");
     setLoading(false);
    },
   });
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 };
 const dragItem = useRef<number | null>(null);
 const dragOverItem = useRef<number | null>(null);
 function handleSort() {
  const newImages = [...selectedImages];
  const dragItemContent = newImages[dragItem.current!];
  newImages.splice(dragItem.current!, 1);
  newImages.splice(dragOverItem.current!, 0, dragItemContent);
  setSelectedImages(newImages);
 }
 function buttonDisabled() {
  return (
   selectedImages.length < 5 ||
   errors.name ||
   errors.address ||
   errors.type ||
   errors.description ||
   errors.checkInTime ||
   errors.checkOutTime ||
   errors.price ||
   isLoading ||
   loading
  );
 }
 return (
  <form
   className="max-w-4xl mx-auto pb-16 lg:pb-4"
   onSubmit={handleSubmit(formSubmit)}
  >
   {loading && (
    <div className="fixed w-screen h-screen bg-white z-[101] inset-0">
     <div className="flex w-full h-full justify-center items-center">
      <CircleLoader size={80} color="#ff385c" />
     </div>
    </div>
   )}
   <h1 className="text-center text-xl mb-4 mt-6">Add your place</h1>
   <div className="flex flex-col gap-3">
    <div className="flex gap-4 items-center justify-between">
     <label htmlFor="name" className="min-w-[85px]">
      Name
     </label>
     <input
      type="text"
      id="name"
      className="border border-gray-300 rounded-md p-2 flex-grow outline-none focus:ring-2 focus:ring-primary mt-2 min-w-[50px]"
      placeholder="Enter a catchy name for your place"
      {...register("name")}
     />
    </div>
    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
    <div className="flex gap-4 items-center justify-between">
     <label htmlFor="address" className="min-w-[85px]">
      Address
     </label>
     <input
      type="text"
      id="address"
      className="border border-gray-300 rounded-md p-2 flex-grow outline-none focus:ring-2 focus:ring-primary mt-2 min-w-[50px]"
      placeholder="Austin, Texas, United States"
      {...register("address")}
     />
    </div>
    {errors.address && (
     <span className="text-red-500">{errors.address.message}</span>
    )}
    <div className="lg:grid lg:grid-cols-2">
     <div className="flex items-center justify-between lg:justify-normal gap-4 relative">
      <label htmlFor="type" className="min-w-[85px] lg:min-w-fit">
       Type
      </label>
      <select
       id="type"
       className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:ml-[3.1rem]"
       {...register("type")}
      >
       <option disabled>Select a type</option>
       {Object.entries(PlaceEnum).map(([key, value]) => (
        <option key={key} value={value}>
         {value}
        </option>
       ))}
      </select>
      {errors.type && (
       <span className="text-red-500 absolute -bottom-14 xxs:-bottom-10 lg:-bottom-8">
        {errors.type.message}
       </span>
      )}
     </div>
     <div
      className={"flex items-center justify-between lg:justify-normal gap-4"}
     >
      <label htmlFor="guests" className="min-w-[85px] lg:min-w-fit lg:ml-2">
       Guests
      </label>
      <input
       type="number"
       id="guests"
       className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px]"
       placeholder="1, 2, 3, etc."
       {...register("guests", { valueAsNumber: true })}
      />
     </div>
     <div
      className={"flex items-center justify-between lg:justify-normal gap-4"}
     >
      <label htmlFor="beds" className="min-w-[85px] lg:min-w-fit">
       Beds
      </label>
      <input
       type="number"
       id="beds"
       className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:ml-[3.1rem]"
       placeholder="1, 2, 3, etc."
       {...register("beds", { valueAsNumber: true })}
      />
     </div>
     <div className="flex items-center justify-between lg:justify-normal gap-4">
      <label htmlFor="baths" className="min-w-[85px] lg:min-w-fit lg:ml-2">
       Baths
      </label>
      <input
       type="number"
       id="baths"
       className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:ml-2"
       placeholder="1, 2, 3, etc."
       {...register("baths", { valueAsNumber: true })}
      />
     </div>
    </div>
    <div className="flex flex-col">
     {errors.guests && (
      <span className="text-red-500">
       Guests: {errors.guests.message?.split(",")[0]}
      </span>
     )}
     {errors.beds && (
      <span className="text-red-500">
       Beds: {errors.beds.message?.split(",")[0]}
      </span>
     )}
     {errors.baths && (
      <span className="text-red-500">
       Baths: {errors.baths.message?.split(",")[0]}
      </span>
     )}
    </div>
    <label htmlFor="description">Description</label>
    <textarea
     id="description"
     className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary resize-none"
     placeholder="Leave a description of your place"
     rows={5}
     {...register("description")}
    />
    {errors.description && (
     <span className="text-red-500">{errors.description.message}</span>
    )}
    <h4>Photos</h4>
    <div className="border border-gray-300 p-4 rounded-md min-h-[250px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
     <div className="h-[230px] w-full aspect-square flex">
      <label className="flex h-full w-full max-w-[300px] border border-black items-center justify-center cursor-pointer rounded-md mx-auto relative">
       <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
         const files = Array.from(e.target.files || []);
         setSelectedImages([...selectedImages, ...files]);
        }}
       />
       <AiOutlineFileImage size={70} />
       <AiOutlinePlus size={30} className="fill-primary absolute ml-20" />
      </label>
     </div>
     {selectedImages && (
      <>
       {selectedImages.map((image, i) => (
        <div
         key={image.name + v4()}
         className="h-[230px] border border-black cursor-pointer rounded-md overflow-hidden flex mx-auto relative aspect-square w-full"
         draggable
         onDragStart={() => (dragItem.current = i)}
         onDragEnter={() => (dragOverItem.current = i)}
         onDragEnd={handleSort}
         onDragOver={(e) => e.preventDefault()}
        >
         <div
          className="absolute top-0 left-0 bg-black/70 text-white p-[1px] pb-[4px] px-2 rounded-bl-md rounded-br-md z-10"
          onClick={() => {
           const newImages = [...selectedImages];
           newImages.splice(i, 1);
           setSelectedImages(newImages);
          }}
         >
          <span className="text-xs">Remove</span>
         </div>
         {i === 0 && (
          <div className="absolute top-0 right-0 bg-black/70 p-[2px] pb-[4px] px-1 rounded-bl-md rounded-br-md z-10">
           <AiFillStar className="fill-yellow-200" size={20} />
          </div>
         )}
         <Image
          src={URL.createObjectURL(selectedImages[i])}
          alt="photo of place"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 90vw, (max-width: 1600px) 40vw, 25vw"
          placeholder="blur"
          blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
          loading="eager"
         />
        </div>
       ))}
      </>
     )}
    </div>
    {imagesError && (
     <span className="text-red-500">You need at least 5 photos.</span>
    )}
    <h3 className="-mb-1">Perks</h3>
    <div className="border border-gray-300 px-4 py-2 rounded-md">
     <Perks registerProp={register} />
    </div>
    <h4>Things To Know</h4>
    <div className="border border-gray-300 px-4 py-2 rounded-md">
     <div className="xxs:grid xxs:grid-cols-2 gap-4">
      <div className="flex items-center justify-between lg:justify-normal gap-2">
       <label htmlFor="checkIn" className="min-w-[122px] lg:min-w-fit lg:ml-2">
        Check in time
       </label>
       <input
        type="text"
        id="checkIn"
        className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px] lg:ml-[20px]"
        placeholder="1:00 PM, 2:00 PM, etc."
        {...register("checkInTime")}
       />
      </div>
      <div className="flex items-center justify-between lg:justify-normal gap-2">
       <label htmlFor="checkOut" className="min-w-[122px] lg:min-w-fit lg:ml-2">
        Check out time
       </label>
       <input
        type="text"
        id="checkOut"
        className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px]"
        placeholder="11:00 AM, 12:00 PM, etc."
        {...register("checkOutTime")}
       />
      </div>
     </div>
     <div className="flex items-center justify-between lg:justify-normal gap-2">
      <label htmlFor="price" className="min-w-[122px] lg:min-w-fit lg:ml-2">
       Price (per night)
      </label>
      <input
       type="text"
       id="price"
       className="border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-primary mt-2 flex-grow min-w-[50px]"
       placeholder="$100, $200, etc."
       {...register("price")}
      />
     </div>
    </div>
    <div className="flex flex-col gap-2">
     {errors.checkInTime && (
      <span className="text-red-500">{errors.checkInTime.message}</span>
     )}
     {errors.checkOutTime && (
      <span className="text-red-500">{errors.checkOutTime.message}</span>
     )}
     {errors.price && (
      <span className="text-red-500">{errors.price.message}</span>
     )}
    </div>
    <button
     className={
      "bg-primary text-white px-4 py-2 rounded-md hover:bg-rose-400" +
      (buttonDisabled() ? " opacity-50 cursor-not-allowed" : "")
     }
     type="submit"
     disabled={buttonDisabled() as boolean}
    >
     Add place
    </button>
   </div>
  </form>
 );
};
export default Page;

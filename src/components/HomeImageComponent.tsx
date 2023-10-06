"use client";
import "swiper/css";
import "swiper/css/navigation";
import Image from "next/image";
import { A11y, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const HomeImageComponent = ({ photos }: { photos: { url: string }[] }) => {
 return (
  <Swiper
   modules={[A11y, Navigation]}
   navigation={{
    nextEl: ".button-next",
    prevEl: ".button-prev",
   }}
   className="relative w-full h-full aspect-[16/12] group"
  >
   {photos &&
    photos.length > 0 &&
    photos.map((photo) => (
     <SwiperSlide key={photo.url}>
      <Image
       src={photo.url}
       alt="photo of place"
       fill
       className="object-cover block w-full h-full rounded-xl"
      />
     </SwiperSlide>
    ))}
   <div className="button-prev absolute top-[50%] translate-y-[-50%] left-4 z-10 bg-white rounded-full p-1 opacity-0 pointer-events-none group-hover:betterhover:opacity-100 group-hover:betterhover:pointer-events-auto transition-all duration-[400] border border-gray-400 hover:shadow-sm hover:shadow-black hover:scale-105">
    <FiChevronLeft size={22} className="text-gray-600" />
   </div>
   <div className="button-next absolute top-[50%] translate-y-[-50%] right-4 z-10 bg-white rounded-full p-1 opacity-0 pointer-events-none group-hover:betterhover:opacity-100 group-hover:betterhover:pointer-events-auto transition-all duration-[400] border border-gray-400 hover:shadow-sm hover:shadow-black hover:scale-105">
    <FiChevronRight size={22} className="text-gray-600" />
   </div>
  </Swiper>
 );
};

export default HomeImageComponent;

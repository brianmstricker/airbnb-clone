"use client";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import { Pagination, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ImageCarousel = ({ photoUrls }: { photoUrls: Array<string> }) => {
 return (
  <Swiper
   pagination={{
    type: "fraction",
    renderFraction: function (currentClass, totalClass) {
     return `
        <span class="${currentClass} custom-fraction-current"></span>
        <span class="custom-fraction-separator">/</span>
        <span class="${totalClass} custom-fraction-total"></span>
      `;
    },
   }}
   modules={[Pagination, A11y]}
   loop
   className="w-full h-full relative aspect-[13/9]"
  >
   {photoUrls &&
    photoUrls.map((photo) => (
     <SwiperSlide key={photo}>
      <Image
       src={photo}
       alt="photo of place"
       fill
       className="object-cover block w-full h-full"
      />
     </SwiperSlide>
    ))}
  </Swiper>
 );
};
export default ImageCarousel;

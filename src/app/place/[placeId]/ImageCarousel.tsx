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
       sizes="(max-width: 768px) 90vw, (max-width: 1600px) 40vw, 25vw"
       placeholder="blur"
       blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
      />
     </SwiperSlide>
    ))}
  </Swiper>
 );
};
export default ImageCarousel;

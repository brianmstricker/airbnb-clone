"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BiChevronLeft, BiSolidGrid } from "react-icons/bi";

const ShowPhotosButton = ({
 photos,
}: {
 photos: { id: string; url: string; placeId: string }[];
}) => {
 const pathname = usePathname();
 const router = useRouter();
 const searchParams = useSearchParams();
 const getModal = searchParams.get("modal" || "");
 const modalShown = getModal === "PHOTO_TOUR_SCROLLABLE";
 useEffect(() => {
  if (modalShown) {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "hidden") : null;
  } else {
   const html = document.querySelector("html");
   html ? (html.style.overflow = "auto") : null;
  }
 }, [modalShown]);
 return (
  <>
   <Link
    href={`?${new URLSearchParams({ modal: "PHOTO_TOUR_SCROLLABLE" })}`}
    className="absolute bottom-6 right-7 z-10 text-black bg-white px-2 py-2 flex items-center text-sm gap-2 rounded-lg border border-black"
   >
    <BiSolidGrid size={20} />
    <span className="font-medium">Show all photos</span>
   </Link>
   {modalShown && (
    <div
     id="placeModalOpen"
     className="inset-0 w-screen h-screen fixed bg-white z-[150] overflow-y-auto animate-fade-in-up py-16"
    >
     <div
      onClick={() => {
       document
        .getElementById("placeModalOpen")
        ?.classList.add("animate-fade-out-down");
       setTimeout(() => {
        router.push(pathname);
       }, 200);
      }}
      className="text-2xl top-3 left-4 fixed z-[999] cursor-pointer"
     >
      <BiChevronLeft size={35} className="border-black rounded-full border-2" />
     </div>
     <div className="top-3 right-4 absolute z-[999] flex gap-3">
      <span>share</span>
      <span>save</span>
     </div>
     <div className="flex flex-wrap gap-2 items-center max-w-3xl mx-auto">
      {photos.map((photo, idx) => (
       <div
        key={photo.id}
        className="relative w-[49.48%] h-full [&:nth-child(3n+1)]:w-full aspect-video"
       >
        <Image
         src={photo.url}
         alt="photo of place"
         fill
         className="object-cover"
        />
       </div>
      ))}
     </div>
    </div>
   )}
  </>
 );
};
export default ShowPhotosButton;

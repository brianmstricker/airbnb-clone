import Image from "next/image";
import ShowPhotosButton from "./ShowPhotosButton";

const LargeImageContent = ({
 photos,
}: {
 photos: { url: string; id: string; placeId: string }[];
}) => {
 if (!photos)
  return (
   <div className="ml-2 w-full">
    <div className="grid grid-cols-2 w-full h-full gap-2">
     <div className="flex w-full relative">
      <div className="object-cover" />
     </div>
     <div className="flex w-full relative">
      <div className="object-cover rounded-tr-xl" />
     </div>
     <div className="flex w-full relative">
      <div className="object-cover" />
     </div>
     <div className="flex w-full relative">
      <div className="object-cover rounded-br-xl" />
      <ShowPhotosButton photos={photos} />
     </div>
    </div>
   </div>
  );
 return (
  <div className="ml-2 w-full">
   <div className="grid grid-cols-2 w-full h-full gap-2">
    <div className="flex w-full relative">
     <Image
      src={photos[1]?.url}
      fill
      alt="photo of place"
      className="object-cover"
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[2]?.url}
      fill
      alt="photo of place"
      className="object-cover rounded-tr-xl"
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[3]?.url}
      fill
      alt="photo of place"
      className="object-cover"
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[4]?.url}
      fill
      alt="photo of place"
      className="object-cover rounded-br-xl"
     />
     <ShowPhotosButton photos={photos} />
    </div>
   </div>
  </div>
 );
};
export default LargeImageContent;

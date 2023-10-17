import Image from "next/image";
import ShowPhotosButton from "./ShowPhotosButton";

const LargeImageContent = ({
 photos,
 placeId,
}: {
 photos: { url: string; id: string; placeId: string }[];
 placeId: string;
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
      <ShowPhotosButton photos={photos} placeId={placeId} />
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
      sizes="(max-width: 768px) 90vw, (max-width: 1600px) 45vw, 35vw"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[2]?.url}
      fill
      alt="photo of place"
      className="object-cover rounded-tr-xl"
      sizes="(max-width: 768px) 90vw, (max-width: 1600px) 45vw, 35vw"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[3]?.url}
      fill
      alt="photo of place"
      className="object-cover"
      sizes="(max-width: 768px) 90vw, (max-width: 1600px) 45vw, 35vw"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
     />
    </div>
    <div className="flex w-full relative">
     <Image
      src={photos[4]?.url}
      fill
      alt="photo of place"
      className="object-cover rounded-br-xl"
      sizes="(max-width: 768px) 90vw, (max-width: 1600px) 45vw, 35vw"
      placeholder="blur"
      blurDataURL="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPMzc6uBwAEVAHE8s4tygAAAABJRU5ErkJggg=="
     />
     <ShowPhotosButton photos={photos} placeId={placeId} />
    </div>
   </div>
  </div>
 );
};
export default LargeImageContent;

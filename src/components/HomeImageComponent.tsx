import Image from "next/image";

const HomeImageComponent = ({ photos }: { photos: { url: string }[] }) => {
 return (
  <div className="relative w-full h-full aspect-[16/12]">
   <div className="relative w-full h-full">
    <Image
     src={photos[0].url}
     fill
     alt="place"
     className="rounded-xl object-cover"
    />
   </div>
  </div>
 );
};
export default HomeImageComponent;

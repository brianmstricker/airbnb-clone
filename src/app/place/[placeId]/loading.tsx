import { BeatLoader } from "react-spinners";

export default function Loading() {
 return (
  <div className="w-full h-screen flex flex-col items-center justify-center">
   <span className="mb-4">
    <BeatLoader size={30} color="#2a3da8" />
   </span>
  </div>
 );
}

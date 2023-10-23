import { ClipLoader } from "react-spinners";

export default function Loading() {
 return (
  <div className="w-full h-screen flex flex-col items-center justify-center">
   <span className="mb-4">
    <ClipLoader size={50} color="#ff385c" />
   </span>
  </div>
 );
}

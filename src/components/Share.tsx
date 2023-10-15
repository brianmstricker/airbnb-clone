"use client";

import { FiShare } from "react-icons/fi";
import { toast } from "react-toastify";

const Share = ({ smallPlacePage }: { smallPlacePage?: boolean }) => {
 return (
  <div
   onClick={() => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard", {
     position: "bottom-center",
     autoClose: 2000,
     hideProgressBar: true,
     closeOnClick: true,
     progress: undefined,
     theme: "dark",
    });
   }}
   className="flex items-center gap-2 cursor-pointer"
  >
   <FiShare size={18} />{" "}
   {!smallPlacePage && <span className="underline">Share</span>}
  </div>
 );
};
export default Share;

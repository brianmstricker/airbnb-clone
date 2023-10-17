"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MoonLoader } from "react-spinners";

const ConfirmButton = ({
 id,
 checkIn,
 checkOut,
 guests,
 total,
 user,
}: {
 id: string;
 checkIn: string;
 checkOut: string;
 guests: number;
 total: number;
 user:
  | {
     name?: string | null | undefined;
     email?: string | null | undefined;
     image?: string | null | undefined;
    }
  | undefined;
}) => {
 const [loading, setLoading] = useState(false);
 const router = useRouter();
 async function reservePlace(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  try {
   setLoading(true);
   const sendInfo = await axios.post("/api/reserve", {
    placeId: id,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests: guests,
    price: total,
   });
   if (sendInfo.status === 200) {
    router.push("/trips");
    setLoading(false);
   }
   console.log(sendInfo);
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 }
 const buttonDisabled = () => {
  if (checkIn === "" || checkOut === "" || guests == 0 || !user || loading) {
   return true;
  } else {
   return false;
  }
 };
 return (
  <button
   onClick={reservePlace}
   disabled={buttonDisabled()}
   className={
    "bg-primary mt-10 text-white px-6 py-4 rounded-lg flex items-center" +
    (buttonDisabled() ? " opacity-60 cursor-not-allowed" : "")
   }
  >
   <span>Confirm and pay</span>
   {loading && (
    <MoonLoader color={"#fff"} size={20} className="inline-block ml-2" />
   )}
  </button>
 );
};
export default ConfirmButton;

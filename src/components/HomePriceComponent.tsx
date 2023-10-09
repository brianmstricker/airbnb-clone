"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const HomePriceComponent = ({ price }: { price: string }) => {
 const [total, setTotal] = useState<null | string>(null);
 const searchParams = useSearchParams();
 useEffect(() => {
  setTotal(searchParams.get("total"));
 }, [searchParams]);
 return (
  <div>
   {!total ? (
    <div>
     <span className="font-semibold">${price}</span> night
    </div>
   ) : (
    <div className="underline">
     <span className="font-semibold">${parseInt(price) * 5}</span> total before
     taxes
    </div>
   )}
  </div>
 );
};
export default HomePriceComponent;

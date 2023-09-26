"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useState } from "react";

const Favorite = ({
 placeId,
 favorited,
}: {
 placeId: string;
 favorited: boolean;
}) => {
 const [isFavorited, setIsFavorited] = useState(favorited);
 async function handleFavorite() {
  const fav = await axios.post("/api/favorite", { placeId });
  if (fav.status === 200) {
   setIsFavorited(!isFavorited);
  }
 }
 return (
  <div
   className="absolute right-2 top-2 z-10 cursor-pointer"
   onClick={handleFavorite}
  >
   {!isFavorited ? (
    <>
     <AiOutlineHeart className="absolute fill-white" size={30} />
     <AiFillHeart className="fill-black/60" size={30} />{" "}
    </>
   ) : (
    <>
     <AiOutlineHeart className="absolute fill-white" size={30} />
     <AiFillHeart className="fill-primary" size={30} />
    </>
   )}
  </div>
 );
};
export default Favorite;

"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";

const Favorite = ({ placeId }: { placeId: string }) => {
 const [loading, setLoading] = useState(true);
 const [isFavorited, setIsFavorited] = useState(false);
 useEffect(() => {
  fetchFavorite();
 }, []);
 async function fetchFavorite() {
  try {
   const favorites = await axios.get("/api/favorite");
   const fav = favorites.data.find(
    (favorite: { placeId: string }) => favorite.placeId === placeId
   );
   if (fav) {
    setIsFavorited(true);
   }
   setLoading(false);
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 }
 async function handleFavorite() {
  try {
   const fav = await axios.post("/api/favorite", { placeId });
   if (fav.status === 200) {
    setIsFavorited(!isFavorited);
   }
  } catch (error) {
   console.log(error);
  }
 }
 if (loading) {
  return null;
 }
 return (
  <div
   className="absolute right-2 top-2 z-10 cursor-pointer"
   onClick={handleFavorite}
  >
   {isFavorited ? (
    <>
     <AiOutlineHeart className="absolute fill-white" size={30} />
     <AiFillHeart className="fill-primary" size={30} />
    </>
   ) : (
    <>
     <AiOutlineHeart className="absolute fill-white" size={30} />
     <AiFillHeart className="fill-black/60" size={30} />{" "}
    </>
   )}
  </div>
 );
};
export default Favorite;

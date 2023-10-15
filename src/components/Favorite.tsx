"use client";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Favorite = ({
 placeId,
 placePage,
}: {
 placeId: string;
 placePage?: boolean;
}) => {
 const session = useSession();
 const path = usePathname();
 const wishlist = path === "/account/wishlist";
 const [loading, setLoading] = useState(wishlist ? false : true);
 const [isFavorited, setIsFavorited] = useState(wishlist ? true : false);
 useEffect(() => {
  async function fetchFavorite() {
   try {
    if (!session.data?.user) {
     return;
    }
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
  fetchFavorite();
 }, [placeId, session.data?.user]);
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
 if (!session.data) return null;
 return (
  <>
   {!placePage && (
    <div
     className="absolute right-2 top-2 z-10 cursor-pointer"
     onClick={handleFavorite}
    >
     {isFavorited ? (
      <>
       <AiOutlineHeart className="absolute fill-white" size={26} />
       <AiFillHeart className="fill-primary" size={26} />
      </>
     ) : (
      <>
       <AiOutlineHeart className="absolute fill-white" size={26} />
       <AiFillHeart className="fill-black/60" size={26} />
      </>
     )}
    </div>
   )}
   {placePage && (
    <div onClick={handleFavorite}>
     {isFavorited ? (
      <div className="flex items-center gap-2 cursor-pointer">
       <AiOutlineHeart className="absolute fill-white" size={26} />
       <AiFillHeart className="fill-primary" size={26} />
       <span className="underline">Saved</span>
      </div>
     ) : (
      <div className="flex items-center gap-2 cursor-pointer">
       <AiOutlineHeart className="absolute fill-white" size={26} />
       <AiFillHeart className="fill-black/60" size={26} />
       <span className="underline">Save</span>
      </div>
     )}
    </div>
   )}
  </>
 );
};
export default Favorite;

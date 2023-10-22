"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import ContentFooter from "@/components/Footer/ContentFooter";

interface FavoriteInterface {
 id: string;
 placeId: string;
 place: {
  id: string;
  address: string;
  photos: { url: string }[];
  name: string;
  rating:
   | {
      userEmail: string;
      placeId: string;
      rating: number;
      id: string;
     }[]
   | [];
 };
}

const Wishlist = () => {
 const [favorites, setFavorites] = useState<FavoriteInterface[]>([]);
 const [loading, setLoading] = useState(true);
 useEffect(() => {
  fetchWishlist();
 }, []);
 async function fetchWishlist() {
  try {
   const data = await axios.get(`/api/favorite`);
   setFavorites(data.data);
   setLoading(false);
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 }
 if (loading)
  return (
   <div className="flex justify-center mt-36">
    <CircleLoader size={80} color="#ff385c" />
   </div>
  );
 if (!loading)
  return (
   <>
    <div className="mt-6 pb-32 min-h-screen">
     {favorites.length > 0 && !loading && (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
       {favorites.map((favorite: FavoriteInterface) => (
        <Card favorite={favorite} key={favorite.id} />
       ))}
      </div>
     )}
     {!loading && favorites && favorites.length === 0 && (
      <div className="text-center mt-36 text-4xl text-gray-600">
       No favorites yet :(
      </div>
     )}
    </div>
    <ContentFooter />
   </>
  );
};
export default Wishlist;

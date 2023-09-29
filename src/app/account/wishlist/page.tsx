"use client";
import { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

interface FavoriteInterface {
 id: string;
 placeId: string;
 place: {
  id: string;
  address: string;
  photos: { url: string }[];
 };
}

const Wishlist = () => {
 const [favorites, setFavorites] = useState<FavoriteInterface[]>([]);
 const [loading, setLoading] = useState(false);
 useEffect(() => {
  fetchWishlist();
 }, []);
 async function fetchWishlist() {
  setLoading(true);
  const data = await axios.get(`/api/favorite`);
  setFavorites(data.data);
  setLoading(false);
 }
 return (
  <div className="mt-3">
   {loading && <div className="text-center">Loading...</div>}
   {favorites.length > 0 && !loading && (
    <div className="grid grid-cols-1 xxxs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12 sm:gap-y-3">
     {favorites.map((favorite: FavoriteInterface) => (
      <Card favorite={favorite} key={favorite.id} />
     ))}
    </div>
   )}
   {favorites.length === 0 && !loading && (
    <div className="text-center">No favorites yet :(</div>
   )}
  </div>
 );
};
export default Wishlist;

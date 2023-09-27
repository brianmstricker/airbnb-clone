import { getAuthSession } from "@/utils/getAuthSession";
import Card from "./Card";

interface FavoriteInterface {
 id: string;
 placeId: string;
 place: {
  id: string;
  address: string;
  photos: { url: string }[];
 };
}

const Wishlist = async () => {
 const session = await getAuthSession();
 const fetchFavorites = await fetch(
  `http://localhost:3000/api/favorite?userEmail=${session?.user?.email}`
 );
 const favorites = await fetchFavorites.json();
 return (
  <div>
   {favorites.length > 0 && (
    <div className="grid grid-cols-3 gap-x-6 gap-y-3">
     {favorites.map((favorite: FavoriteInterface) => (
      <Card favorite={favorite} key={favorite.id} />
     ))}
    </div>
   )}
   {favorites.length === 0 && (
    <div className="text-center">No favorites yet :(</div>
   )}
  </div>
 );
};
export default Wishlist;

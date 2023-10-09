import Favorite from "@/components/Favorite";
import HomeImageComponent from "@/components/HomeImageComponent";
import PlaceFilter from "@/components/placefilter/PlaceFilter";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

type Place = {
 id: string;
 name: string;
 address: string;
 photos: { url: string }[];
 type: string;
 user: { name: string; image: string };
 beds: number;
 baths: number;
 description: string;
 checkInTime: string;
 checkOutTime: string;
 price: string;
 favorites: { placeId: string; userEmail: string }[];
};

const Search = async ({ searchParams }: { searchParams?: any }) => {
 const location = searchParams.location;
 const guests = searchParams.guests;
 const fetchSearch = await fetch(
  `http://localhost:3000/api/search?location=${location}&guests=${guests}`
 );
 const getSearch = await fetchSearch.json();
 const searchResults = getSearch.filter(
  (place: Place) => place.photos.length > 0
 );
 return (
  <main className="pt-20 md:pt-0 pb-52">
   <div className="contain-filter">
    <PlaceFilter searchPage={true} />
   </div>
   <div className="contain">
    <div className="text-sm relative -top-3">
     <span className="font-bold">{searchResults.length}</span> places to stay in{" "}
     <span className="font-bold capitalize">{location}</span>
    </div>
    {searchResults.length === 0 && (
     <div className="text-center mt-10">
      <div className="text-3xl font-bold">No places found</div>
      <div className="text-sm text-gray-500 mt-2">
       Try adjusting your search by removing some filters
      </div>
     </div>
    )}
    {searchResults && (
     <div className="grid grid-cols-1 xxxs:grid-cols-2  mdlg:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-y-24 gap-x-6">
      {searchResults.map((place: Place) => (
       <div key={place.id} className="relative">
        <Favorite placeId={place.id} />
        <Link href={`/place/${place.id}`} className="mx-auto w-full h-full">
         <HomeImageComponent photos={place.photos} />
         <div className="mt-2 text-[.95rem] px-2">
          <div className="flex justify-between items-center">
           <div className="capitalize font-semibold ">
            {place.address.split(",", 2).join(",")}
           </div>
           <div className="flex items-center gap-1">
            <AiFillStar size={14} />
            <span className="font-light">4.82</span>
           </div>
          </div>
          <div>
           <span className="font-semibold">${place.price}</span> night
          </div>
         </div>
        </Link>
       </div>
      ))}
     </div>
    )}
   </div>
  </main>
 );
};
export default Search;

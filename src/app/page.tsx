import Favorite from "@/components/Favorite";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import PlaceFilter from "@/components/placefilter/PlaceFilter";
import HomeImageComponent from "@/components/HomeImageComponent";
import HomePriceComponent from "@/components/HomePriceComponent";
import HomeFooter from "@/components/Footer/HomeFooter";

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
 rating:
  | {
     userEmail: string;
     placeId: string;
     rating: number;
     id: string;
    }[]
  | [];
};

export default async function Home({ searchParams }: { searchParams?: any }) {
 const searchFilter = searchParams?.search_type;
 const fetchPlaces = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/places?search_type=${searchFilter}`,
  {
   next: { revalidate: 60 },
  }
 );
 const getPlaces = await fetchPlaces.json();
 const places = getPlaces.filter((place: Place) => place.photos.length > 0);
 return (
  <main className="pt-20 md:pt-0 pb-52">
   <div className="contain-filter">
    <PlaceFilter />
   </div>
   <div className="contain">
    <div className="grid grid-cols-1 xxxs:grid-cols-2  mdlg:grid-cols-3 lg:grid-cols-4 3xl:grid-cols-6 gap-y-24 gap-x-6">
     {places.map((place: Place) => (
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
           {place.rating.length === 0 ? (
            <span className="font-medium">0.00</span>
           ) : (
            <div>
             {(
              place.rating.map((r) => r.rating).reduce((t, c) => t + c, 0) /
              place.rating.length
             ).toFixed(2)}
            </div>
           )}
          </div>
         </div>
         <HomePriceComponent price={place.price} />
        </div>
       </Link>
      </div>
     ))}
    </div>
   </div>
   <HomeFooter />
  </main>
 );
}

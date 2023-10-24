import { compareAsc, format, intervalToDuration } from "date-fns";
import LargeReservePage from "./LargeReservePage";
import MobileReservePage from "./MobileReservePage";

const ReservePage = async ({
 searchParams,
}: {
 searchParams: {
  placeId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
 };
}) => {
 const id = searchParams.placeId;
 const placeFetch = await fetch(
  `${process.env.NEXT_PUBLIC_SITE_URL}/api/place/${id}`
 );
 const place = await placeFetch.json();
 if (!id || !place.id)
  return (
   <div className="!max-w-[1500px] contain pt-56 text-center">
    <p>Cannot find place!</p>
   </div>
  );
 const image = place.photos[0].url;
 const name = place.name;
 const checkInVal = searchParams.checkIn;
 const checkOutVal = searchParams.checkOut;
 const guests = searchParams.guests;
 const nights = intervalToDuration({
  start: new Date(checkInVal),
  end: new Date(checkOutVal),
 }).days;
 const type = place.type;
 const price = place.price;
 const rating = place.rating;
 const checkInDate = format(new Date(checkInVal), "dd MMMM yyyy");
 const currentDate = format(new Date(), "dd MMMM yyyy");
 const dateErr =
  compareAsc(new Date(checkInDate), new Date(currentDate)) === -1 ||
  compareAsc(new Date(checkOutVal), new Date(checkInVal)) === -1;
 if (dateErr) {
  return (
   <div className="!max-w-[1500px] contain pt-56 text-center">
    <p>Error with check in or check out date! Change it to a later date.</p>
   </div>
  );
 }
 return (
  <>
   <MobileReservePage
    image={image}
    type={type}
    name={name}
    checkIn={checkInVal}
    checkOut={checkOutVal}
    price={price}
    nights={nights as number}
    id={id}
    guests={guests}
    rating={rating}
   />
   <LargeReservePage
    image={image}
    type={type}
    name={name}
    checkIn={checkInVal}
    checkOut={checkOutVal}
    price={price}
    nights={nights as number}
    id={id}
    guests={guests}
    rating={rating}
   />
  </>
 );
};

export default ReservePage;

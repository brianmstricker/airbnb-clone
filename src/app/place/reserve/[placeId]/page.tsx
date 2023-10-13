import LargeReservePage from "./LargeReservePage";
import MobileReservePage from "./MobileReservePage";

const ReservePage = ({
 searchParams,
}: {
 searchParams: {
  placeImg: string;
  placeName: string;
  placeType: string;
  checkIn: string;
  checkOut: string;
  placePrice: number;
  nights: number;
  placeId: string;
  guests: number;
 };
}) => {
 const image = searchParams.placeImg;
 const type = searchParams.placeType;
 const name = searchParams.placeName;
 const checkIn = searchParams.checkIn;
 const checkOut = searchParams.checkOut;
 const price = searchParams.placePrice;
 const nights = searchParams.nights;
 const id = searchParams.placeId;
 const guests = searchParams.guests;
 return (
  <>
   <MobileReservePage
    image={image}
    type={type}
    name={name}
    checkIn={checkIn}
    checkOut={checkOut}
    price={price}
    nights={nights}
    id={id}
    guests={guests}
   />
   <LargeReservePage
    image={image}
    type={type}
    name={name}
    checkIn={checkIn}
    checkOut={checkOut}
    price={price}
    nights={nights}
    id={id}
    guests={guests}
   />
  </>
 );
};

export default ReservePage;

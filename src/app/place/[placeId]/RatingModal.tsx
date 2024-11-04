"use client";
import { useCallback, useEffect, useState } from "react";
import { AiFillStar, AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ClipLoader } from "react-spinners";

const RatingModal = ({ name, placeId }: { name: string; placeId: string }) => {
 const [rating, setRating] = useState<null | string | number>(null);
 const [userRating, setUserRating] = useState<null | string | number>(null);
 const session = useSession();
 const [loading, setLoading] = useState(true);
 const [ratingModal, setRatingModal] = useState(false);
 const [currentRating, setCurrentRating] = useState<null | number>(null);
 const [hoverRating, setHoverRating] = useState<null | number>(null);
 const getRating = useCallback(async () => {
  try {
   const placeRatingInfo = await axios.get(`/api/place/${placeId}/rate`);
   if (placeRatingInfo) {
    const data = placeRatingInfo.data;
    const ratingMap = data.map((r: any) => r.rating);
    const avgRating = ratingMap.reduce((t: any, c: any) => t + c, 0) / ratingMap.length;
    setRating(avgRating.toFixed(2));
    setLoading(false);
   }
   if (!placeRatingInfo.data.length) {
    setLoading(false);
    setRating("0.00");
   }
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 }, [placeId]);
 const getUserRating = useCallback(async () => {
  try {
   if (!session?.data?.user) return;
   const userRatingInfo = await axios.get(`/api/place/${placeId}/user/rate`);
   if (userRatingInfo.data) {
    setUserRating(userRatingInfo.data.rating);
    setLoading(false);
   }
   if (!userRatingInfo.data) {
    setUserRating(null);
    setLoading(false);
   }
  } catch (error) {
   console.log(error);
   setLoading(false);
  }
 }, [placeId, session?.data?.user]);
 useEffect(() => {
  async function getRatings() {
   await Promise.all([getRating(), getUserRating()]);
  }
  getRatings();
 }, [getRating, getUserRating]);
 function addRating(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  axios
   .post(`/api/place/${placeId}/user/rate`, {
    rating: currentRating,
   })
   .then((res) => {
    getRating();
    setRatingModal(false);
    setCurrentRating(null);
    getUserRating();
    setLoading(false);
   })
   .catch((err) => {
    console.log(err);
    setLoading(false);
   });
 }
 function removeRating(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.preventDefault();
  axios
   .delete(`/api/place/${placeId}/user/rate`)
   .then((res) => {
    getRating();
    setRatingModal(false);
    setCurrentRating(null);
    getUserRating();
    setLoading(false);
   })
   .catch((err) => {
    console.log(err);
    setLoading(false);
   });
 }
 return (
  <>
   <div onClick={() => setRatingModal(true)} className="flex items-center gap-1 cursor-pointer">
    <AiFillStar size={16} />
    <div className="flex items-center gap-1">
     {rating && !loading && <span className="font-medium">{rating}</span>}
     {loading && (
      <span className="font-medium">
       <ClipLoader color="#2a3da8" size={12} />
      </span>
     )}
    </div>
   </div>
   {ratingModal && (
    <div
     onClick={() => {
      setRatingModal(false);
      setCurrentRating(null);
     }}
     className="bg-black/60 fixed inset-0 z-[100] flex items-center justify-center"
    >
     <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white z-[101] px-6 sm:px-20 pb-6 pt-4 rounded-md text-center relative mx-6 sm:mx-0"
     >
      <div
       onClick={() => {
        setRatingModal(false);
        setCurrentRating(null);
       }}
       className="absolute top-1.5 right-1.5 text-xl cursor-pointer"
      >
       <AiOutlineClose />
      </div>
      <h2 className="font-bold text-xl lg:text-3xl">{name}</h2>
      {!userRating ? (
       <>
        <span className={"text-gray-500 text-sm lg:text-base block mt-8" + (currentRating ? " opacity-0" : "")}>Leave a rating...</span>
        <div className="flex justify-center items-center mt-2">
         {[...Array(5)].map((_, i) => {
          const ratingValue = i + 1;
          return (
           <div className="relative flex flex-col items-center" key={i}>
            <label className="cursor-pointer" onMouseEnter={() => setHoverRating(ratingValue)} onMouseLeave={() => setHoverRating(null)}>
             <input type="radio" name="rating" value={ratingValue} className="hidden" onClick={() => setCurrentRating(ratingValue)} />
             <AiFillStar
              size={36}
              className={
               "transition-all duration-200 ease-in" +
               (ratingValue <= (currentRating as number) ? " fill-yellow-500" : "") +
               (ratingValue <= (hoverRating as number) ? " fill-yellow-500" : " fill-gray-400")
              }
             />
            </label>
            <div className="absolute top-9 lg:text-lg">{ratingValue === currentRating ? ratingValue : null}</div>
           </div>
          );
         })}
        </div>
       </>
      ) : (
       <div className="flex flex-col justify-center items-center mt-2">
        <div className="text-base mt-6">
         You&apos;ve already left a rating of <span className="font-bold">{userRating}</span>
        </div>
        <button onClick={removeRating} className="mt-6 px-4 py-2 bg-primary text-white w-fit mx-auto text-lg rounded-lg" disabled={loading}>
         Remove Rating
        </button>
       </div>
      )}
      {currentRating && (
       <>
        {session?.data?.user ? (
         <button onClick={addRating} className="mt-14 px-4 py-2 bg-primary text-white w-1/2 mx-auto text-lg rounded-lg" disabled={loading}>
          Add rating
         </button>
        ) : (
         <span className="mt-14 px-4 py-2 bg-primary text-white mx-auto text-lg block w-fit rounded-lg">Login to add rating</span>
        )}
       </>
      )}
     </div>
    </div>
   )}
  </>
 );
};
export default RatingModal;

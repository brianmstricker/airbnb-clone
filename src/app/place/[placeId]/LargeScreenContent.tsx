import { AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import Image from "next/image";

export type Place = {
  name: string;
  address: string;
  photos: { url: string }[];
  type: string;
  user: { name: string; image: string };
  beds: number;
  baths: number;
};

const LargeScreenContent = ({ place }: { place: Place }) => {
  return (
    <div className="hidden md:block max-w-6xl mx-auto">
      {place && (
        <div className="flex flex-col justify-center px-8 pb-8">
          <h2 className="text-2xl font-semibold mt-4 capitalize">
            {place.name}
          </h2>
          <div className="mt-2 text-sm flex justify-between items-center">
            <div className="underline font-medium">{place.address}</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <FiShare size={18} /> <span className="underline">Share</span>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineHeart size={18} />{" "}
                <span className="underline">Save</span>
              </div>
            </div>
          </div>
          <div className="mt-6 flex">
            {place.photos && place.photos[0]?.url && (
              <div className="w-full relative h-[50vh] lg:h-[52vh]">
                <Image
                  src={place.photos[0].url}
                  alt="photo of place"
                  fill
                  className="rounded-l-xl object-cover"
                />
              </div>
            )}
            {place.photos && (
              <div className="ml-2 w-full">
                <div className="grid grid-cols-2 w-full h-full gap-2">
                  <div className="flex w-full relative">
                    <Image
                      src={place.photos[1]?.url}
                      fill
                      alt="photo of place"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-full relative">
                    <Image
                      src={place.photos[2]?.url}
                      fill
                      alt="photo of place"
                      className="object-cover rounded-tr-xl"
                    />
                  </div>
                  <div className="flex w-full relative">
                    <Image
                      src={place.photos[3]?.url}
                      fill
                      alt="photo of place"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex w-full relative">
                    <Image
                      src={place.photos[4]?.url}
                      fill
                      alt="photo of place"
                      className="object-cover rounded-br-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="mt-10">
            <div className="max-w-2xl">
              <div className="text-xl flex justify-between">
                <div>
                  <p className="font-medium">
                    Entire {place.type} hosted by {place.user.name}
                  </p>
                  <ol className="text-base mt-2 text-gray-800 flex gap-6 items-center">
                    <li>
                      <span>{place.beds * 2} Guests</span>
                    </li>
                    <li className="flex items-center relative rounded-full">
                      <div className="w-[2px] h-[2px] bg-black absolute -left-3" />
                      <span>
                        {place.beds} {place.beds === 1 ? "Bed" : "Beds"}
                      </span>
                    </li>
                    <li className="flex items-center relative rounded-full">
                      <div className="w-[2px] h-[2px] bg-black absolute -left-3" />
                      <span>
                        {place.baths} {place.baths === 1 ? "Bath" : "Baths"}
                      </span>
                    </li>
                  </ol>
                </div>
                <div>
                  <Image
                    src={place.user.image as string}
                    alt="user"
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                </div>
              </div>
              <div className="w-full h-[1px] bg-gray-300 my-6" />
              <div className="mt-2">5 star reviews</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default LargeScreenContent;

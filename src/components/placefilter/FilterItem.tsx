import Link from "next/link";
import { useSearchParams } from "next/navigation";

type FilterItemProps = {
 icon: React.ReactNode;
 text: string;
};

const FilterItem = ({ icon, text }: FilterItemProps) => {
 const searchParams = useSearchParams();
 console.log(searchParams);
 const getSearchType = searchParams.get("search_type" || "");
 console.log(getSearchType);
 return (
  <Link
   className={
    "flex flex-col items-center gap-1 relative min-w-[56px] px-[2.5rem] lg:px-[3.03rem] group betterhover:hover:text-gray-900 lg:-left-[14px]" +
    (getSearchType === text.toLowerCase() ||
    (text.toLowerCase() === "all places" && getSearchType === null)
     ? " cursor-default"
     : " cursor-pointer")
   }
   href={`?${new URLSearchParams({ search_type: text.toLowerCase() })}`}
  >
   <div className="text-[28px]">{icon}</div>
   <div className="whitespace-nowrap relative">
    <span
     className={
      "font-medium tracking-tight text-[12px]" +
      (getSearchType === text.toLowerCase() ||
      (text.toLowerCase() === "all places" && getSearchType === null)
       ? " cursor-default"
       : " cursor-pointer")
     }
    >
     {text}
    </span>
    {getSearchType === text.toLowerCase() ||
    (text.toLowerCase() === "all places" && getSearchType === null) ? (
     <div className="h-[2px] bg-black z-10 mt-3 mx-auto duration-150 relative md:-top-[4px]" />
    ) : (
     <div className="opacity-0 h-[2px] bg-black md:bg-gray-300 z-10 mt-3 mx-auto duration-150 relative md:-top-[4px] betterhover:group-hover:opacity-100" />
    )}
   </div>
  </Link>
 );
};
export default FilterItem;

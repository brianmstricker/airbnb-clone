type FilterItemProps = {
 icon: React.ReactNode;
 text: string;
};

const FilterItem = ({ icon, text }: FilterItemProps) => {
 return (
  <div className="flex flex-col items-center gap-1 relative min-w-[56px] px-[3.12rem] cursor-pointer hover:text-gray-700 group">
   <div className="text-[28px]">{icon}</div>
   <div className="whitespace-nowrap relative">
    <span className="font-medium tracking-tight text-[12px]">{text}</span>
    <div className="opacity-0 group-hover:opacity-100 h-[2px] bg-gray-300 z-10 mt-3 mx-auto duration-150" />
   </div>
  </div>
 );
};
export default FilterItem;

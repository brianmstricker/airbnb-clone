type FilterItemProps = {
 icon: React.ReactNode;
 text: string;
};

const FilterItem = ({ icon, text }: FilterItemProps) => {
 return (
  <div className="flex flex-col items-center gap-1 relative min-w-[56px] px-[3.15rem]">
   <div className="text-[28px]">{icon}</div>
   <div className="whitespace-nowrap relative">
    <span className="font-medium tracking-tight text-[12px]">{text}</span>
   </div>
  </div>
 );
};
export default FilterItem;

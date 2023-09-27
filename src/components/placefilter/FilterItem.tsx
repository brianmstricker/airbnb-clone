type FilterItemProps = {
 icon: React.ReactNode;
 text: string;
};

const FilterItem = ({ icon, text }: FilterItemProps) => {
 return (
  <div className="flex flex-col items-center gap-2 relative min-w-[56px] px-[3.1rem]">
   <div className="text-2xl">{icon}</div>
   <div className="whitespace-nowrap relative">
    <span className="font-medium tracking-tight">{text}</span>
   </div>
  </div>
 );
};
export default FilterItem;

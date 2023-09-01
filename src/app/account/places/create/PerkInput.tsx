import { AiOutlineWifi } from "react-icons/ai";

const PerkInput = ({ name, label }: { name: string; label: string }) => {
  const icon = {
    wifi: <AiOutlineWifi />,
  };
  return (
    <label htmlFor={label} className="flex items-center gap-2 text-lg">
      <input type="checkbox" id={label} />
      <span className="flex items-center gap-[2px]">
        {icon[label as keyof typeof icon]}
        {name}
      </span>
    </label>
  );
};
export default PerkInput;

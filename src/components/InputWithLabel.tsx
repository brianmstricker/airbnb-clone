const InputWithLabel = ({
  name,
  type = "text",
  label,
  placeholder,
}: {
  name: string;
  type?: string;
  label: string;
  placeholder?: string;
}) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <label htmlFor={label} className="min-w-[85px]">
        {name}
      </label>
      <input
        type={type}
        id={label}
        className="border border-gray-300 rounded-md px-2 py-1 flex-grow outline-none focus:ring-2 focus:ring-primary mt-2 min-w-[50px]"
        placeholder={placeholder}
      />
    </div>
  );
};
export default InputWithLabel;

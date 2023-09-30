const Border = ({ small }: { small?: boolean }) => {
 return (
  <div
   className={"w-full h-[1px] bg-gray-300 " + (small ? " my-5" : " my-10")}
  />
 );
};
export default Border;

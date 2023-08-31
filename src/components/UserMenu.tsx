type UserMenuProps = {
  className?: string;
};

const UserMenu = (props: UserMenuProps) => {
  return (
    <div tabIndex={1} className={props.className}>
      <div className="flex flex-col gap-5 px-4 py-3 text-sm">
        <span className="font-medium">Log in</span>
        <span>Sign up</span>
        <span className="mt-3">Airbnb your home</span>
      </div>
      <div className="w-full h-[1px] bg-gray-300 relative bottom-12" />
    </div>
  );
};
export default UserMenu;

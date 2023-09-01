type UserMenuProps = {
  closeUserModal: () => void;
  openAuthModal: () => void;
};

const UserMenu = ({ closeUserModal, openAuthModal }: UserMenuProps) => {
  return (
    <>
      <div
        className="w-full h-full bg-transparent inset-0 fixed"
        onClick={closeUserModal}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="fixed shadow-sm shadow-gray-300 bg-[#F3F3F3] right-16 min-w-[240px] top-[4.4rem] z-10 rounded-xl">
            <div className="modal flex flex-col gap-5 px-4 py-3 text-sm">
              <span
                onClick={() => {
                  closeUserModal();
                  openAuthModal();
                }}
                className="font-medium w-fit cursor-pointer"
              >
                Log in
              </span>
              <span
                onClick={() => {
                  closeUserModal();
                  openAuthModal();
                }}
                className="w-fit cursor-pointer"
              >
                Sign up
              </span>
              <span className="mt-3 w-fit">Airbnb your home</span>
            </div>
            <div className="w-full h-[1px] bg-gray-300 relative bottom-12" />
          </div>
        </div>
      </div>
    </>
  );
};
export default UserMenu;

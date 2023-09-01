"use client";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

type UserMenuProps = {
  closeUserModal: () => void;
  openAuthModal: () => void;
};

const UserMenu = ({ closeUserModal, openAuthModal }: UserMenuProps) => {
  const session = useSession();
  return (
    <>
      <div
        className="w-full h-full bg-transparent inset-0 fixed"
        onClick={closeUserModal}
      >
        <div className="relative" onClick={(e) => e.stopPropagation()}>
          <div className="fixed shadow-sm shadow-gray-300 bg-[#F3F3F3] right-16 min-w-[240px] top-[4.4rem] z-10 rounded-xl">
            <div className="flex flex-col gap-5 px-4 py-3 text-sm">
              {session?.status === "unauthenticated" ? (
                <>
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
                  <span className="mt-4 w-fit">Airbnb your home</span>
                  <div className="w-full h-[1px] bg-gray-300 absolute left-0 bottom-12" />
                </>
              ) : (
                <>
                  <span className="font-medium w-fit cursor-pointer">
                    Trips
                  </span>
                  <span className="w-fit cursor-pointer">Account</span>
                  <div className="w-full h-[1px] bg-gray-300 absolute left-0 bottom-[5.5rem]" />
                  <span className="mt-3 w-fit">Airbnb your home</span>
                  <button onClick={() => signOut()} className="w-fit">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UserMenu;

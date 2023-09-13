"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";

type UserMenuProps = {
 closeUserModal: () => void;
 openAuthModal: () => void;
 placePage?: boolean;
};

const UserMenu = ({
 closeUserModal,
 openAuthModal,
 placePage,
}: UserMenuProps) => {
 const session = useSession();
 return (
  <>
   <div
    className="w-full h-full bg-transparent inset-0 fixed z-50"
    onClick={closeUserModal}
   >
    <div className="bg-transparent" onClick={(e) => e.stopPropagation()}>
     <div className="max-w-6xl mx-auto relative">
      <div
       className={
        "fixed shadow-sm shadow-gray-300 bg-[#F3F3F3] min-w-[240px] top-[4.4rem] rounded-xl z-50 border" +
        (placePage ? " right-0 absolute" : " right-16")
       }
      >
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
          <span className="font-medium w-fit cursor-pointer">Trips</span>
          <Link
           href={"/account"}
           onClick={closeUserModal}
           className="w-fit cursor-pointer"
          >
           Account
          </Link>
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
   </div>
  </>
 );
};
export default UserMenu;

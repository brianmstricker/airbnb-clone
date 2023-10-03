"use client";
import { Logo } from "@/assets/Logo";
import { ImSearch } from "react-icons/im";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import AuthModal from "./AuthModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
 const [showUserMenu, setShowUserMenu] = useState(false);
 const [showAuthModal, setShowAuthModal] = useState(false);
 const session = useSession();
 function openAuthModal() {
  setShowAuthModal((prev) => !prev);
 }
 const handleUserMenuButtonClick = () => {
  setShowUserMenu((prev) => !prev);
 };
 function closeUserModal() {
  setShowUserMenu(false);
 }
 function closeAuthModal() {
  setShowAuthModal(false);
 }
 useEffect(() => {
  if (showAuthModal) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "auto";
  }
 }, [showAuthModal]);
 const pathname = usePathname();
 if (!pathname) return null;
 const placePage = pathname.includes("/place/");
 return (
  <>
   <nav className="md:border-b border-b-gray-200 pt-4 pb-5 fixed w-full bg-white z-50 hidden md:block">
    <div
     className={
      "contain mx-auto flex items-center justify-between" +
      (placePage ? " max-w-6xl xxs:flex px-8" : "")
     }
    >
     <Link href={"/"} className="flex gap-2 text-primary">
      <Logo />
      <span className="text-2xl font-bold hidden lg:block">airbnb</span>
     </Link>
     <div
      className={
       "flex gap-4 border-2 border-gray-200 pl-4 pr-2 py-2 rounded-full items-center shadow-sm hover:shadow-md duration-200 ml-0 lg:ml-28 tracking-tight text-[.9rem]" +
       (placePage ? " absolute left-24 lg:static" : "")
      }
     >
      {placePage ? (
       <div className="font-medium pr-24">Start your search</div>
      ) : (
       <>
        <div className="font-medium">Anywhere</div>
        <div className="w-[1px] h-6 bg-gray-200" />
        <div className="font-medium">Any week</div>
        <div className="w-[1px] h-6 bg-gray-200" />
        <div className="text-gray-400">Add guests</div>
       </>
      )}
      <div className="bg-primary rounded-full p-2 text-white">
       <ImSearch size={12} />
      </div>
     </div>
     <div className="flex items-center gap-6">
      <span className="font-medium">Airbnb your home</span>
      <button
       onClick={handleUserMenuButtonClick}
       className="flex rounded-full py-1 px-3 border border-gray-300 gap-2 items-center"
      >
       <HiMenu size={18} />
       <div className="bg-gray-500 text-white rounded-full p-[2px] overflow-hidden">
        {session?.status === "loading" && (
         <div className="animate-pulse bg-white w-8 h-8 rounded-full" />
        )}
        {session?.status !== "authenticated" &&
         session?.status !== "loading" && (
          <AiOutlineUser size={26} className="relative top-[2px]" />
         )}
        {session?.status === "authenticated" && (
         <Image
          src={session?.data?.user?.image as string}
          alt="user"
          width={32}
          height={32}
          className="rounded-full"
         />
        )}
       </div>
      </button>
     </div>
    </div>
   </nav>
   {showUserMenu && (
    <UserMenu
     closeUserModal={closeUserModal}
     openAuthModal={openAuthModal}
     placePage={placePage}
    />
   )}
   {showAuthModal && <AuthModal closeAuthModal={closeAuthModal} />}
  </>
 );
};
export default Header;

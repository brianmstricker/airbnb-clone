"use client";
import { Logo } from "@/assets/Logo";
import { AiOutlineUser } from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { useState, useEffect } from "react";
import UserMenu from "./UserMenu";
import AuthModal from "./AuthModal";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LargeSearchBar from "./HeaderComponents/LargeSearchBar";

const Header = () => {
 const [showUserMenu, setShowUserMenu] = useState(false);
 const [showAuthModal, setShowAuthModal] = useState(false);
 const [showSearchMenu, setShowSearchMenu] = useState(false);
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
   <nav
    className={
     "md:border-b border-b-gray-200 pt-4 pb-5 fixed w-full bg-white z-[100] hidden md:block" +
     (showSearchMenu ? " min-h-[170px]" : "")
    }
   >
    <div
     className={
      "contain mx-auto flex justify-between items-center relative" +
      (placePage ? " !max-w-6xl xxs:flex px-8" : "")
     }
    >
     <Link
      href={"/"}
      className={
       "flex gap-2 text-primary" +
       (placePage ? " relative -left-2 lg:-left-3 3xl:-left-5" : "")
      }
     >
      <Logo />
      <span className="text-2xl font-bold hidden lg:block">airbnb</span>
     </Link>
     <LargeSearchBar
      placePage={placePage}
      showSearchMenu={showSearchMenu}
      setShowSearchMenu={setShowSearchMenu}
     />
     <div className={"flex gap-6 items-center"}>
      <span className="font-medium w-fit">Airbnb your home</span>
      <button
       onClick={handleUserMenuButtonClick}
       className="flex rounded-full py-1 px-3 border border-gray-300 gap-2 items-center shrink-0"
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
   {showSearchMenu && (
    <div
     onClick={() => setShowSearchMenu(false)}
     className="hidden md:block bg-black/25 inset-0 w-screen h-screen fixed z-[99]"
    />
   )}
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

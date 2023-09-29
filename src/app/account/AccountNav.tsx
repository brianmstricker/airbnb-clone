"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = [
 {
  name: "Profile",
  path: "/account",
 },
 {
  name: "Wishlist",
  path: "/account/wishlist",
 },
 {
  name: "My Places",
  path: "/account/places",
  children: {
   name: "Create",
   path: "/account/places/create",
  },
 },
];
const activeStyling = "text-white bg-primary rounded-full";
const AccountNav = () => {
 const pathname = usePathname();
 return (
  <div className="max-w-xs mx-auto mt-4 text-sm xxs:text-base p-2 w-max">
   <div className="flex justify-between">
    {NavLinks.map((link) => (
     <Link href={link.path} key={link.name}>
      <span
       className={`font-medium px-2 py-3 ${
        (pathname === link.path && activeStyling) ||
        (pathname === link?.children?.path && activeStyling)
       }`}
      >
       {link.name}
      </span>
     </Link>
    ))}
   </div>
  </div>
 );
};
export default AccountNav;

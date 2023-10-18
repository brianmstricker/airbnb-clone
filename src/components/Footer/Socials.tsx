import Link from "next/link";
import { AiFillFacebook, AiFillTwitterSquare } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

const Socials = () => {
 return (
  <div className="hidden sm:flex gap-3 items-center">
   <Link href="https://www.facebook.com" target="_blank">
    <AiFillFacebook size={22} />
   </Link>
   <Link href="https://www.twitter.com" target="_blank">
    <AiFillTwitterSquare size={22} />
   </Link>
   <Link href="https://www.instagram.com" target="_blank">
    <FaInstagramSquare size={22} />
   </Link>
  </div>
 );
};
export default Socials;

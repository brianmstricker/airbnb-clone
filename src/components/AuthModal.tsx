"use client";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";

type AuthModalProps = {
 closeAuthModal: () => void;
};
const AuthModal = ({ closeAuthModal }: AuthModalProps) => {
 const [email, setEmail] = useState("");
 const emailNotEmpty = email.length > 0;
 return (
  <div
   className="z-[101] fixed inset-0 bg-black/50 w-full h-full"
   onClick={closeAuthModal}
  >
   <div
    className="z-50 relative top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white max-w-[568px] min-h-[682px] rounded-xl"
    onClick={(e) => e.stopPropagation()}
   >
    <header className="flex items-center border-b px-4 py-5">
     <button className="absolute">
      <AiOutlineClose onClick={closeAuthModal} />
     </button>
     <h3 className="text-lg font-semibold mx-auto">Log in or Sign up</h3>
    </header>
    <div className="px-6 pt-8">
     <h4 className="text-2xl font-medium">Welcome to Airbnb</h4>
     {/* <div className="mt-5 w-full border border-gray-400 rounded-md relative group min-h-[56px]">
      <label htmlFor="email" className="absolute inset-0 group">
       <input
        type="text"
        value={email}
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        className="w-full relative top-5 border-none outline-none bg-transparent -right-4"
        onFocus={(e) => {
         e.target.placeholder = "johndoe@gmail.com";
        }}
        onBlur={(e) => {
         e.target.placeholder = "";
        }}
       />
       <span
        className={
         "absolute left-4 bottom-[14px] text-gray-400 group-focus-within:top-[1px] group-focus-within:text-sm duration-500 ease-in-out" +
         (emailNotEmpty ? " top-[1px] text-sm" : "")
        }
       >
        Email
       </span>
      </label>
     </div>
     <button className="bg-primary w-full mt-2 rounded-md p-3 text-white">
      Continue
     </button>
     <div className="mt-8 text-center">
      <div className="flex items-center justify-center w-full mx-auto h-[1.5px] bg-gray-300">
       <span className="text-xs bg-white z-10 px-4">or</span>
      </div>
     </div> */}
     <div className="mt-8 text-center">
      <button
       className="bg-white w-full rounded-md p-3 text-black border border-black text-sm font-medium flex items-center justify-center relative"
       onClick={() => signIn("google", { redirect: false })}
      >
       <FcGoogle className="absolute left-3" size={22} />
       Continue with Google
      </button>
      <button
       className="bg-white w-full rounded-md p-3 text-black border border-black mt-4 text-sm font-medium flex items-center justify-center relative"
       onClick={() => signIn("github", { redirect: false })}
      >
       <FaGithub className="absolute left-3" size={22} />
       Continue with Github
      </button>
     </div>
    </div>
   </div>
  </div>
 );
};
export default AuthModal;

import { getAuthSession } from "@/utils/getAuthSession";
import Image from "next/image";

const AccountPage = async () => {
 const session = await getAuthSession();
 return (
  <div className="border border-gray-400 p-4 rounded-xl">
   <div className="flex flex-col items-center gap-8 mt-4">
    <Image
     src={session?.user?.image as string}
     alt="user"
     width={150}
     height={150}
     className="rounded-full ring-black ring-2"
    />
    <div className="flex flex-col gap-2">
     <p>
      <span className="font-bold">Name:</span> {session?.user?.name}
     </p>
     <p>
      <span className="font-bold">Email:</span> {session?.user?.email}
     </p>
    </div>
   </div>
  </div>
 );
};
export default AccountPage;

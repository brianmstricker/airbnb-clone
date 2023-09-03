import { redirect } from "next/navigation";
import AccountNav from "./AccountNav";
import { getAuthSession } from "@/utils/getAuthSession";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <>
      <AccountNav />
      <div className="container max-w-6xl mx-auto px-4 mt-8 pb-12">
        {children}
      </div>
    </>
  );
};
export default layout;

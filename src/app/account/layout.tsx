import { redirect } from "next/navigation";
import AccountNav from "./AccountNav";
import { getAuthSession } from "@/utils/getAuthSession";
import Wrapper from "./Wrapper";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }
  return (
    <>
      <AccountNav />
      <Wrapper>{children}</Wrapper>
    </>
  );
};
export default layout;

import AccountNav from "./AccountNav";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AccountNav />
      <div className="container max-w-6xl mx-auto px-4 mt-8">{children}</div>
    </>
  );
};
export default layout;

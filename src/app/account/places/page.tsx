import Link from "next/link";

const page = () => {
  return (
    <main>
      <Link
        href="/account/places/create"
        className="block w-fit mx-auto px-4 py-2 bg-primary text-white rounded-md mt-2 hover:bg-rose-400"
      >
        Add A Place
      </Link>
      <span>my places</span>
    </main>
  );
};
export default page;

import prisma from "@/app/lib/auth";

type Place = {
 id: string;
 name: string;
 address: string;
 photos: { url: string }[];
 type: string;
 user: { name: string; image: string };
 beds: number;
 baths: number;
 description: string;
 checkInTime: string;
 checkOutTime: string;
 price: string;
};

export default async function Home() {
 const places = await prisma.place.findMany({
  include: { photos: true },
 });
 return <main className="max-w-[95%] mx-auto pb-12">yo</main>;
}

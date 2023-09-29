import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";
import MobileHeader from "@/components/MobileHeader";
import MobileSearch from "@/components/MobileSearch";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 title: "Airbnb clone",
 description: "Airbnb clone",
};

export default function RootLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 return (
  <html lang="en">
   <body className={inter.className}>
    <AuthContext>
     <Header />
     <MobileSearch />
     <div className="pt-40 md:pt-24">{children}</div>
     <MobileHeader />
    </AuthContext>
   </body>
  </html>
 );
}

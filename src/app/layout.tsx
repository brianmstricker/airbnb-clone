import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";
import MobileHeader from "@/components/MobileHeader";
import MobileSearch from "@/components/MobileSearch";
import PaddingTop from "@/components/PaddingTop";

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
     <PaddingTop>{children}</PaddingTop>
     <MobileHeader />
    </AuthContext>
   </body>
  </html>
 );
}

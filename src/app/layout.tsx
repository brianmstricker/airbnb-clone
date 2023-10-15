import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthContext from "./context/AuthContext";
import MobileHeader from "@/components/MobileHeader";
import MobileSearch from "@/components/MobileSearch";
import PaddingTop from "@/components/PaddingTop";
import { ToastContainer } from "react-toastify";

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
     <ToastContainer />
     <Header />
     <MobileSearch />
     <PaddingTop>{children}</PaddingTop>
     <MobileHeader />
    </AuthContext>
   </body>
  </html>
 );
}

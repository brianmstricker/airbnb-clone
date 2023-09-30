"use client";

import { usePathname } from "next/navigation";

const PaddingTop = ({ children }: { children: React.ReactNode }) => {
 const pathname = usePathname();
 if (!pathname) return null;
 const placePage = pathname.includes("/place/");
 return <div className={placePage ? "" : "pt-24"}>{children}</div>;
};
export default PaddingTop;

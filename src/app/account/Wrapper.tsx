import React from "react";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
 return <div className="contain max-w-6xl mx-auto px-4 mt-8">{children}</div>;
};
export default Wrapper;

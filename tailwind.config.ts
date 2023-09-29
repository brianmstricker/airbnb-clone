import type { Config } from "tailwindcss";

const config: Config = {
 content: [
  "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
 ],
 theme: {
  extend: {
   container: {
    center: true,
    padding: ".5rem",
   },
   colors: {
    primary: "#ff385c",
   },
   screens: {
    xxxs: "550px",
    xxs: "600px",
    mdlg: "950px",
    "3xl": "1800px",
   },
  },
 },
 plugins: [require("tailwind-scrollbar-hide")],
};
export default config;

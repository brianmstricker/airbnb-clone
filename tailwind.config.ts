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
    betterhover: { raw: "(hover: hover)" },
   },
   keyframes: {
    "fade-in-up": {
     "0%": {
      opacity: "0",
      transform: "translateY(1000px)",
     },
     "100%": {
      opacity: "1",
      transform: "translateY(0)",
     },
    },
    "fade-out-down": {
     "0%": {
      opacity: "1",
      transform: "translateY(0)",
     },
     "100%": {
      opacity: "0",
      transform: "translateY(1000px)",
     },
    },
   },
   animation: {
    "fade-in-up": "fade-in-up .5s ease-out",
    "fade-out-down": "fade-out-down .5s ease-out",
   },
  },
 },
 plugins: [require("tailwind-scrollbar-hide")],
};
export default config;

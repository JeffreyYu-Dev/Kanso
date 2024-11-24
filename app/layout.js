import "./globals.css";
import localFont from "next/font/local";

import NavBar from "@/components/navBar/NavBar";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

// const Kalam = localFont({ src: "../../../fonts/KalamFont/Kalam-Bold.ttf" });
const generalSans = localFont({
  src: "/fonts/GeneralSans_Complete/Fonts/TTF/GeneralSans-Variable.ttf",
  variable: "--generalSans",
});

// todo:
// - add Watch button to carousel

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased dark ${generalSans.variable} `}>
        <NavBar />
        <div className="flex justify-center">
          <div className="max-w-[1600px] w-11/12">{children}</div>
        </div>
      </body>
    </html>
  );
}

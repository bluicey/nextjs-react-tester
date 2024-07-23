import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/componets/navbar/Navbar";
import Tabs from "@/componets/navbar/tabs/Tabs"; 
import DeviceTest from "@/componets/auto/DeviceTest";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children} 
        <Tabs /> 
        <DeviceTest />
      </body>
    </html>
  );
}
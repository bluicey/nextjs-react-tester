// src/layouts/RootLayout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/componets/navbar/Navbar";
import Tabs from "@/componets/navbar/tabs/Tabs"; 
import DeviceTest from "@/component/auto/DeviceTest";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HardWare Tester",
  description: "This test hardware",
};

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
        <Tabs/> 
        <DeviceTest />
      </body>
    </html>
  );
}

"use client";

import SideBar from '@/components/SideBar';
import './globals.css';
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");

  return (
    <html lang="en" className="{raleway.className}">
      <body>
        <SideBar setBgColor={setBgColor} bgColor={bgColor}/>
        <main className="flex-1 p-4" style={{ backgroundColor: bgColor }}>
          {children}
        </main>
      </body>
    </html>
  );
}
"use client";

import SideBar from '@/components/SideBar';
import './globals.css';
import { useState } from "react";
import ModelViewer from "@/components/ModelViewer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");

  return (
    <html lang="en" className="{raleway.className}">
      <body>
        <ModelViewer bgColor={bgColor} />
        <div className="relative z-10">
          <SideBar setBgColor={setBgColor} bgColor={bgColor} />
        </div>
          <main className="flex-1 p-4 pointer-events-auto">
            {children}
          </main>
      </body>
    </html>
  );
}
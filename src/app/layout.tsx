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
        <div style={{ position: "relative", zIndex: 1 }}>
            <SideBar setBgColor={setBgColor} bgColor={bgColor} />
        </div>
          <main className="flex-1 p-4" style={{ pointerEvents: "auto" }}>
            {children}
          </main>
      </body>
    </html>
  );
}
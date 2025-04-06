"use client";

import { useState } from "react";
import SideBar from "@/components/SideBar";

export default function Home() {
  const [bgColor, setBgColor] = useState("#000000");

  return (
    <div className="flex h-screen">
      <SideBar setBgColor={setBgColor} />
      <div className="flex-1 overflow-auto p-8" style={{ backgroundColor: bgColor }}>
      </div>
    </div>
  );
}

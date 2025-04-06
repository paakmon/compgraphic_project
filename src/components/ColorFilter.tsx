"use client";

import { useState } from "react";

export function ColorFilter() {
  const [color, setColor] = useState("#FFFFFF"); // Default color

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <h2 className="text-lg font-semibold text-blue-900">Color Filter</h2>
      <img src="/color-picker.svg" alt="color" className="h-6 w-6 m-0" />
      <input
        type="color"
        value={color}
        onChange={handleColorChange}
        className="h-8 w-8 appearance-none p-0 border-none"
        />
    </div>
  );
}

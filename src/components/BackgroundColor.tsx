"use client";

import { useState, useEffect } from "react";

type BackgroundColorProps = {
  setBgColor: (color: string) => void;
};

export function BackgroundColor({ setBgColor }: BackgroundColorProps) {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setBgColor(color);
  }, [color, setBgColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="px-5">
      <h2 className="text-lg font-semibold text-blue-900">Background Color</h2>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-5">
          <button onClick={() => setColor("#000000")} className="h-7 w-7 rounded-full bg-black" />
          <button onClick={() => setColor("#808080")} className="h-7 w-7 rounded-full bg-gray-500" />
          <button onClick={() => setColor("#FFFFFF")} className="h-7 w-7 rounded-full bg-white border border-gray-600" />
        </div>
        <img src="/color-picker.svg" alt="color" className="h-6 w-6 m-0" />
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="h-8 w-8 appearance-none p-0 border-none"
        />
      </div>
    </div>
  );
}

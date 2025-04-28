/**
 * BackgroundColorPicker component
 *
 * This component allows users to change the 3D scene's background color.
 * It provides:
 * - Preset color buttons (black, gray, white)
 * - A custom color picker input
 *
 * Props:
 * - setBgColor: Function to update the background color in the parent component
 *
 * On color change, the selected color is passed to the parent via useEffect.
 */

"use client";

import { useState, useEffect } from "react";

type BackgroundColorPickerProps = {
  setBgColor: (color: string) => void;
};

export function BackgroundColorPicker({
  setBgColor,
}: BackgroundColorPickerProps) {
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    setBgColor(color);
  }, [color, setBgColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <div className="w-60">
      <h2 className="text-lg font-semibold text-blue-900">Background Color</h2>
      <div className="flex items-center space-x-4">
        <div className="flex space-x-5">
          {/* Preset Color */}
          <button
            onClick={() => setColor("#000000")}
            className="h-7 w-7 rounded-full bg-black"
          />
          <button
            onClick={() => setColor("#808080")}
            className="h-7 w-7 rounded-full bg-gray-500"
          />
          <button
            onClick={() => setColor("#FFFFFF")}
            className="h-7 w-7 rounded-full bg-white border border-gray-600"
          />
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

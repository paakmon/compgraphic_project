"use client";

import { Slider } from "@mui/material";

type PixelSliderProps = {
  pixelSize: number;
  setPixelSize: (value: number) => void;
};

export function PixelSlider({ pixelSize, setPixelSize }: PixelSliderProps) {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPixelSize(newValue as number);
  };

  return (
    <div className="w-60">
      <h2 className="text-lg font-semibold text-blue-900">
        Pixel Size: {pixelSize}
      </h2>
      <Slider
        value={pixelSize}
        onChange={handleChange}
        min={1}
        max={64}
        aria-label="Pixel Size"
        color="primary"
        sx={{ width: "100%" }}
      />
    </div>
  );
}

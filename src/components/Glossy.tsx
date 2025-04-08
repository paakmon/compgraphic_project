"use client";

import { useState } from "react";
import { Slider } from "@mui/material";

export function Glossy() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <div className="w-60">
      <h2 className="text-lg font-semibold text-blue-900">Glossy : {value}%</h2>
      <Slider
        value={value}
        onChange={handleChange}
        aria-label="Default slider"
        color="primary"
        sx={{ width: "100%" }}
      />
    </div>
  );
}

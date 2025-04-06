"use client";

import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";

export default function Outline() {
  const [checked, setChecked] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <div className="flex items-center">  
      <h2 className="text-lg font-semibold text-blue-900">Outline</h2>
      <Checkbox checked={checked} onChange={handleChange}/>
    </div>
  );
}

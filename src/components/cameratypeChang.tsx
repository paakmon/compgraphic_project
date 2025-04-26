"use client";

import { Checkbox, Slider } from "@mui/material";
import { useState } from "react";
type useothoprop = {
  useotho: boolean;
  setuseotho: (value: boolean) => void;
};


function CameratypeChang({ useotho, setuseotho }: useothoprop) {
 
 

  const handleChange = (event) => {
    setuseotho(event.target.checked)
   
  }

  return (
    <div className="w-60">
      <h2 className="text-lg font-semibold text-blue-900">
        Using Ortho:
        <Checkbox checked={useotho} onChange={handleChange}></Checkbox>
      </h2>
      
    </div>
  );
}

export default CameratypeChang;
/**
 *  OrthoCameraToggle component
 *
 * Changes the camera mode between orthographic and perspective.
 * Provides a checkbox to toggle the mode.
 *
 */

"use client";

import { Checkbox } from "@mui/material";

type OrthoCameraToggleProps = {
  useOrtho: boolean;
  setUseOrtho: (value: boolean) => void;
};

function OrthoCameraToggle({ useOrtho, setUseOrtho }: OrthoCameraToggleProps) {
  // Handle checkbox change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUseOrtho(event.target.checked);
  };

  return (
    <div className="w-60">
      <h2 className="text-lg font-semibold text-blue-900">
        Ortho Camera Mode:
        <Checkbox checked={useOrtho} onChange={handleChange}></Checkbox>
      </h2>
    </div>
  );
}

export default OrthoCameraToggle;

/**
 * UploadButton component
 *
 * Renders a styled button that opens a hidden file input when clicked.
 * Accepts 3D model files (.glb) and calls the
 * onFileSelect callback with the selected file.
 *
 * Used for triggering file uploads from components like sidebars.
 */

import React, { useRef } from "react";

type UploadButtonProps = {
  onFileSelect: (file: File) => void;
};

export function UploadButton({ onFileSelect }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="h-10 w-60 px-6 py-2 bg-white text-blue-900 rounded-full border-2 border-blue-900 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-900"
      >
        Upload File
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept=".glb"
        className="hidden"
      />
    </>
  );
}

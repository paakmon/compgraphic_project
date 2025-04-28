/**
 * SideBar component
 *
 * This component renders the left sidebar UI containing tools and settings for the 3D model viewer.
 * It includes:
 * - UploadButton: Allows uploading a 3D model file
 * - Instructions: Displays usage instructions
 * - PixelSlider: Adjusts pixelation effect
 * - BackgroundColorPicker: Changes the background color of the canvas
 * - OrthoCameraToggle: Switches between orthographic and perspective camera views
 *
 * Props:
 * - setBgColor: Function to update the background color
 * - setPixelSize: Function to update pixel size
 * - pixelSize: Current pixel size
 * - isOpen: Sidebar visibility state
 * - onClose: Closes the sidebar
 * - useOrtho: Current camera type state (true = orthographic)
 * - SetOrtho: Function to change camera type
 * - onFileSelect: Function triggered when a file is selected for upload
 */

import React from "react";
import * as AiIcons from "react-icons/ai";
import Link from "next/link";
import "./SideBar.css";
import { IconContext } from "react-icons";

import { UploadButton } from "./UploadButton";
import { Instructions } from "./Instructions";
import { Divider } from "./Divider";
import { BackgroundColorPicker } from "./BackgroundColorPicker";
import { PixelSlider } from "./PixelSlider";
import OrthoCameraToggle from "./OrthoCameraToggle";

type SideBarProps = {
  setBgColor: (color: string) => void;
  setPixelSize: (size: number) => void;
  pixelSize: number;
  isOpen: boolean;
  onClose: () => void;
  useOrtho: boolean;
  SetOrtho: (useortho: boolean) => void;
  onFileSelect: (file: File) => void;
};

function SideBar({
  setBgColor,
  setPixelSize,
  pixelSize,
  isOpen,
  onClose,
  useOrtho,
  SetOrtho,
  onFileSelect,
}: SideBarProps) {
  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className={isOpen ? "nav-menu active" : "nav-menu"}>
          <div className="nav-menu-items">
            <div className="navbar-toggle" onClick={onClose}>
              <Link href="#" className="menu-bars">
                <AiIcons.AiOutlineClose style={{ color: "#1E3A8A" }} />
              </Link>
            </div>
            <div className="px-6">
              <UploadButton onFileSelect={onFileSelect} />

              <Instructions />
              <Divider />
              <div className="flex flex-col items-start w-full">
                <PixelSlider
                  pixelSize={pixelSize}
                  setPixelSize={setPixelSize}
                />
                <OrthoCameraToggle useOrtho={useOrtho} setUseOrtho={SetOrtho} />
                <BackgroundColorPicker setBgColor={setBgColor} />
              </div>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;

import React from 'react';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import './SideBar.css';
import { IconContext } from 'react-icons';

import { UploadButton } from "./UploadButton";
import { Instructions } from "./Instructions";
import { Divider } from "./Divider";
import { BackgroundColor } from "./BackgroundColor";
import { PixelSlider } from './PixelSlider';
import CameratypeChang from './cameratypeChang';


type SideBarProps = {
    setBgColor: (color: string) => void;
    bgColor: string;
    setPixelSize: (size: number) => void;
    pixelSize: number;
    isOpen: boolean;
    onClose: () => void;
    useOrtho:boolean
    SetOrtho: (useortho : boolean)=> void;
    onFileSelect: (file: File) => void;
  };

function SideBar({ setBgColor, setPixelSize, pixelSize, isOpen, onClose, useOrtho, SetOrtho, onFileSelect } : SideBarProps) {

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
      
        <nav className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>
            <div className='navbar-toggle' onClick={onClose}>
              <Link href='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#1E3A8A' }}/>
              </Link>
            </div>
            <div className='px-6'>
              <UploadButton
                onFileSelect={onFileSelect}
              />
              <Instructions/>
              <Divider/>
              <div className="flex flex-col items-start w-full gap-2">
                <PixelSlider pixelSize={pixelSize} setPixelSize={setPixelSize}/>
              </div>
              <div>
                <Divider />
                <BackgroundColor setBgColor={setBgColor}/>
              </div>
              <div>
              <CameratypeChang useotho={useOrtho} setuseotho={SetOrtho}></CameratypeChang>
              </div>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
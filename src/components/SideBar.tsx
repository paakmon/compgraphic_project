import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import './SideBar.css';
import { IconContext } from 'react-icons';

import { UploadButton } from "./UploadButton";
import { Instructions } from "./Instructions";
import { Divider } from "./Divider";
import { Glossy } from "./Glossy";
import Outline from "./Outline";
import { ColorFilter } from "./ColorFilter";
import { BackgroundColor } from "./BackgroundColor";
import { PixelSlider } from './PixelSlider';

type SideBarProps = {
    setBgColor: (color: string) => void;
    bgColor: string;
    setPixelSize: (size: number) => void;
    pixelSize: number;
  };

function SideBar({ setBgColor, bgColor, setPixelSize, pixelSize} : SideBarProps) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar' style={{ backgroundColor: bgColor }}>
          <Link href='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} style={{ color: '#1E3A8A' }}/>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div className='nav-menu-items'>
            <div className='navbar-toggle' onClick={showSidebar}>
              <Link href='#' className='menu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#1E3A8A' }}/>
              </Link>
            </div>
            <div className='px-6'>
              <UploadButton/>
              <Instructions/>
              <Divider/>
              <div className="flex flex-col items-start w-full gap-2">
                <PixelSlider pixelSize={pixelSize} setPixelSize={setPixelSize}/>
              </div>
              <div>
                <Divider />
                <BackgroundColor setBgColor={setBgColor}/>
              </div>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default SideBar;
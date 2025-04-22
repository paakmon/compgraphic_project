import React from 'react';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import './RightSideBar.css'; // Import your CSS file for styling
import { IconContext } from 'react-icons';

type SideBarProps = {
  setBgColor: (color: string) => void;
  bgColor: string;
  isOpen: boolean; // The state passed from the parent
  onClose: () => void; // Function to close the sidebar
};

function RightSideBar({ setBgColor, bgColor, isOpen, onClose }: SideBarProps) {
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav className={isOpen ? 'rnav-menu active' : 'rnav-menu'}>
          <div className='rnav-menu-items'>
            <div className='rnavbar-toggle' onClick={onClose}>
              <Link href='#' className='rmenu-bars'>
                <AiIcons.AiOutlineClose style={{ color: '#1E3A8A' }} />
              </Link>
            </div>
            {/* Add your sidebar content here */}
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default RightSideBar;

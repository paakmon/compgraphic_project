import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import './ModelManager.css'; // Import your CSS file for styling
import { IconContext } from 'react-icons';
import Checkbox from '@mui/material/Checkbox';

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
  filename?: string;
  isModelVisible: boolean;
  setIsModelVisible: (visible: boolean) => void;
  // setFilename: (name: string) => void;
};

function ModelManager({ isOpen, onClose, filename, isModelVisible, setIsModelVisible }: SideBarProps) { 
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
            <div className='px-6'>
              <h2 className="text-2xl font-semibold text-blue-900">Model Manager</h2>
              <h2 className="text-lg font-semibold text-blue-900">Filename:</h2>
              <p className="text-lg text-blue-900 px-6">
                {filename ? filename : 'cheeseburger.glb'}
              </p>
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-blue-900">Hide model</h2>
                <Checkbox
                  checked={!isModelVisible}
                  onChange={(e) => setIsModelVisible(!e.target.checked)}
                />
              </div>
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default ModelManager;
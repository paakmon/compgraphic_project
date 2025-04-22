import React from 'react';
import * as FaIcons from 'react-icons/fa';
import Link from 'next/link';

type Props = {
    onOpenLeft: () => void;
    onOpenRight: () => void;
  };

const TopNavBar = ({ onOpenLeft, onOpenRight }: Props) => {
  return (
    <div className="navbar">
        <Link href='#' className='menu-bars'>
            <FaIcons.FaBars onClick={onOpenLeft} style={{ color: '#1E3A8A' }}/>
        </Link>
        <Link href='#' className='rmenu-bars'>
            <FaIcons.FaCog onClick={onOpenRight} style={{ color: '#1E3A8A' }}/>
        </Link>
    </div>
  );
};

export default TopNavBar;

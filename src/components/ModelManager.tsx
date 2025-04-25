import React, { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import Link from 'next/link';
import './ModelManager.css'; // Import your CSS file for styling
import { IconContext } from 'react-icons';
import Checkbox from '@mui/material/Checkbox';
import { ModelCard } from './ModelCard';
import { Divider } from './Divider';
import { ModelItem } from '@/interface';

type SideBarProps = {
  isOpen: boolean;
  onClose: () => void;
};

function ModelManager({ isOpen, onClose }: SideBarProps) {
  const [models, setModels] = useState<ModelItem[]>([
    {
      _id: 'preload-1',
      name: 'Simple Cheeseburger by Erik Woods',
      isVisible: true,
      url: '', // optional if it's already in the scene
    },
  ]);

  const handleVisibilityChange = (id: string) => {
    setModels((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, isVisible: !m.isVisible } : m
      )
    );
  };

  const deleteModel = (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this model?");
    if (confirm) {
      setModels(models.filter((m) => m._id !== id));
    }
  };

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
              <Divider/>
              
              {models.map((model) => (
                <ModelCard
                  key={model._id}
                  modelItem={model}
                  onVisibilityChange={handleVisibilityChange}
                  onDelete={deleteModel}
                />
              ))}
              
            </div>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default ModelManager;
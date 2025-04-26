"use client";

import SideBar from "@/components/SideBar";
import './globals.css';
import { useState, createRef } from "react";
import ModelViewer from "@/components/ModelViewer";
import ModelManager from '@/components/ModelManager';
import TopNavBar from "@/components/TopNavBar";
import { ModelItem } from "../interface";
import CubeWithOutline from "@/components/CubeWithOutline";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");
  const [pixelSize, setPixelSize] = useState(128);
  
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [ismodelOutline, setismodelOutline] = useState(false);
  const [useOrtho, setUseOrtho] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [models, setModels] = useState<ModelItem[]>([
      {
        _id: 'preload-1',
        name: 'Simple Cheeseburger by Erik Woods',
        isVisible: true,
        url: '/cheeseburger.glb',
        isOutline: false,
        ref: createRef()
      },
  ]);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    const newModel: ModelItem = {
      _id: crypto.randomUUID(),
      name: file.name,
      url,
      isVisible: true,
      isOutline:false,
      ref: createRef()
    };
    setModels((prev) => [...prev, newModel]);
    
  };

  return (
    <html lang="en" className="{raleway.className}">
      <body>
        <ModelViewer
          models={models}
          bgColor={bgColor} 
          pixelSize={pixelSize}
          isModelVisible={isModelVisible}           
          useOrtho={useOrtho}
          ismodelOutline={ismodelOutline}
          />
          
           {/* <CubeWithOutline/> */}
        <div style={{ position: "relative", zIndex: 1 }}>
            <TopNavBar
              onOpenLeft={() => setLeftOpen(!leftOpen)}
              onOpenRight={() => setRightOpen(!rightOpen)}
            />
            <SideBar 
              setBgColor={setBgColor}
              bgColor={bgColor}
              setPixelSize={setPixelSize}
              pixelSize={pixelSize} 
              isOpen={leftOpen} 
              useOrtho={useOrtho}
              onClose={() => setLeftOpen(false)}
              SetOrtho={setUseOrtho}
              onFileSelect={handleFileSelect}/>
            <ModelManager
              models={models}
              setModels={setModels}
              isOpen={rightOpen} 
              onClose={() => setRightOpen(false)}
              />
        </div>
          <main className="flex-1 p-4" style={{ pointerEvents: "auto" }}>
            {children}
          </main>
      </body>
    </html>
  );
}

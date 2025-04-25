"use client";

import SideBar from "@/components/SideBar";
import './globals.css';
import { useState } from "react";
import ModelViewer from "@/components/ModelViewer";
import ModelManager from '@/components/ModelManager';
import TopNavBar from "@/components/TopNavBar";
import { ModelItem } from "../interface";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");
  const [pixelSize, setPixelSize] = useState(128);
  
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [filename, setFilename] = useState('');
  const [isModelVisible, setIsModelVisible] = useState(true);
  const [useOrtho, setUseOrtho] = useState(false);

  const [models, setModels] = useState<ModelItem[]>([
      {
        _id: 'preload-1',
        name: 'Simple Cheeseburger by Erik Woods',
        isVisible: true,
        url: '/cheeseburger.glb',
      },
  ]);

  return (
    <html lang="en" className="{raleway.className}">
      <body>
        <ModelViewer
          models={models}
          bgColor={bgColor} 
          pixelSize={pixelSize}
          isModelVisible={isModelVisible} 
          useOrtho={useOrtho}/>
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
              setFilename={setFilename}/>
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

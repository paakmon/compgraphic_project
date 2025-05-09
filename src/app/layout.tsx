/**
 * Root layout component for the application.
 * It includes the sidebar, model viewer, and model manager components.
 *
 * It store global state:
 * - background color
 * - pixel size
 * - camera mode
 * - model list
 * - selected model
 *
 * and also handling file upload
 *
 */

"use client";

import SideBar from "@/components/SideBar";
import "./globals.css";
import { useState } from "react";
import ModelViewer from "@/components/ModelViewer";
import ModelManager from "@/components/ModelManager";
import TopNavBar from "@/components/TopNavBar";
import { ModelItem } from "../interface";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");
  const [pixelSize, setPixelSize] = useState(128);
  const [useOrtho, setUseOrtho] = useState(false);

  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);

  // Preload a model
  const [models, setModels] = useState<ModelItem[]>([
    {
      _id: "preload-1",
      name: "Simple Cheeseburger by Erik Woods",
      url: "/cheeseburger.glb",

      isVisible: true,

      isOutline: false,
      outLineThickness: 13,
      outlineColor: "#1b261e",

      transformation: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
    },
  ]);

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    const newModel: ModelItem = {
      _id: crypto.randomUUID(),
      name: file.name,
      url,
      isVisible: true,
      isOutline: false,
      outLineThickness: 15,
      outlineColor: "#1b261e",
      transformation: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
        scale: [1, 1, 1],
      },
    };
    setModels((prev) => [...prev, newModel]);
  };

  return (
    <html lang="en" className="{raleway.className}">
      <body>
        <ModelViewer
          models={models}
          setModels={setModels}
          selectedModelId={selectedModelId}
          bgColor={bgColor}
          pixelSize={pixelSize}
          useOrtho={useOrtho}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <TopNavBar
            onOpenLeft={() => setLeftOpen(!leftOpen)}
            onOpenRight={() => setRightOpen(!rightOpen)}
          />
          <SideBar
            setBgColor={setBgColor}
            setPixelSize={setPixelSize}
            pixelSize={pixelSize}
            isOpen={leftOpen}
            useOrtho={useOrtho}
            onClose={() => setLeftOpen(false)}
            SetOrtho={setUseOrtho}
            onFileSelect={handleFileSelect}
          />
          <ModelManager
            models={models}
            setModels={setModels}
            selectedModelId={selectedModelId}
            setSelectedModelId={setSelectedModelId}
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

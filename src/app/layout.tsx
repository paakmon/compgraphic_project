"use client";

import SideBar from "@/components/SideBar";
import ModelViewer from "@/components/ModelViewer";
import ModelManager from "@/components/ModelManager";
import { useState } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [bgColor, setBgColor] = useState("#000000");
  const [pixelSize, setPixelSize] = useState(16);

  return (
    <html lang="en" className="{raleway.className}">
      <body style={{ margin: 0, padding: 0, height: "100%", overflow: "hidden", fontFamily: "sans-serif" }}>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
          
          {/* ModelViewer: full-screen, behind everything, interactive */}
          <div style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "auto"
          }}>
            <ModelViewer bgColor={bgColor} pixelSize={pixelSize} />
          </div>

          {/* UI overlay on top of the canvas */}
          <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1,
            pointerEvents: "none" // block UI from intercepting viewer by default
          }}>
            {/* Left Sidebar */}
            <div style={{
              width: "250px",
              height: "100%",
              background: "#fff",
              borderRight: "1px solid #ccc",
              overflow: "auto",
              pointerEvents: "auto"
            }}>
              <SideBar
                setBgColor={setBgColor}
                bgColor={bgColor}
                setPixelSize={setPixelSize}
                pixelSize={pixelSize}
              />
            </div>

            {/* Main Content */}
            <main style={{
              flexGrow: 1,
              padding: "16px",
              overflow: "auto",
              pointerEvents: "auto"
            }}>
              {children}
            </main>

            {/* Right Sidebar */}
            <div style={{
              width: "250px",
              height: "100%",
              background: "#fff",
              borderLeft: "1px solid #ccc",
              overflow: "auto",
              pointerEvents: "auto"
            }}>
              <ModelManager />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

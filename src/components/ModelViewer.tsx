"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import { useState } from "react";
type Props = {
  bgColor: string;
  pixelSize: number;
  useOrtho:boolean;
};

function Model() {
  const { scene } = useGLTF("/cheeseburger.glb");
  return <primitive object={scene} scale={1} />;
}

function CameraChecker() {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      console.log("✅ Camera is Orthographic");
    } else if (camera instanceof THREE.PerspectiveCamera) {
      console.log("📷 Camera is Perspective");
    }
  }, [camera]);

  return null;
}

function PixelatedEffect({ pixelSize }: { pixelSize: number }) {
  const { size } = useThree();
  const granularity = Math.max(1, Math.floor(size.width / pixelSize)); // prevent 0
 

  return (
    <EffectComposer>
      <Pixelation granularity={granularity} />
    </EffectComposer>
  );
}

export default function ModelViewer({ bgColor, pixelSize, useOrtho }: Props) {
    


    return (
      <div style={{ width: "100%", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "auto", }}>
        <Canvas 
        key={useOrtho ? "ortho" : "persp"}
        orthographic={useOrtho}
        camera={{ position: [0, 1, 3] 
          ,zoom:useOrtho ? 150 : 1
        }}>
          <CameraChecker />
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
          <PixelatedEffect pixelSize={pixelSize} />
        </Canvas>
      </div>
    );
  }

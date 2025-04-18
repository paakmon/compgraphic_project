"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

type Props = {
  bgColor: string;
};

function Model() {
  const { scene } = useGLTF("/cheeseburger.glb");
  return <primitive object={scene} scale={1} />;
}

export default function ModelViewer({ bgColor }: Props) {
    return (
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto">
        <Canvas camera={{ position: [0, 1, 3] }}>
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 2, 2]} intensity={1} />
          <Suspense fallback={null}>
            <Model />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>
    );
  }

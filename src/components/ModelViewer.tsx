"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";
import { ModelItem } from "@/interface";

type Props = {
  models: ModelItem[];
  bgColor: string;
  pixelSize: number;
  isModelVisible: boolean;
  useOrtho:boolean;
};

function ModelLoader({ url, name }: { url: string; name: string }) {
  const { scene } = useGLTF(url);
  scene.name = name;
  return <primitive object={scene} />;
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
  // Get the size of the canvas and calculate granularity based on pixelSize
  const { size } = useThree();
  const granularity = Math.max(1, Math.floor(size.width / pixelSize)); // prevent 0

  return (
    <EffectComposer>
      <Pixelation granularity={granularity} />
    </EffectComposer>
  );
}

export default function ModelViewer({ models, bgColor, pixelSize, useOrtho }: Props ) {
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

          {/* Render models */}
          {models.map((model) =>
          model.isVisible ? (
            <Suspense fallback={null} key={model._id}>
              <ModelLoader url={model.url} name={model._id} />
            </Suspense>
          ) : null
          )}

          <OrbitControls />
          <PixelatedEffect pixelSize={pixelSize} />
        </Canvas>
      </div>
    );
  }

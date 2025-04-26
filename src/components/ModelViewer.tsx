"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { EffectComposer, Pixelation, Selection, Outline } from "@react-three/postprocessing";
import { ModelItem } from "@/interface";
import {  useAnimations, Outlines, Environment } from '@react-three/drei'



type Props = {
  models: ModelItem[];
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  bgColor: string;
  pixelSize: number;
  isModelVisible: boolean;
  useOrtho:boolean;
  ismodelOutline:boolean;
 
};

function ModelLoader({ url, name, isOutlined, outlinethickness, outlineColor }: {
  url: string;
  name: string;
  isOutlined: boolean;
  outlinethickness: number;
  outlineColor: string;
}) {
  const ref = useRef();
  const { nodes, materials } = useGLTF(url);
 console.log("nodes", nodes);
 console.log("material", materials);

  return (
    <group ref={ref}>
    {Object.values(nodes).map((node, index) => 
    
      node.isMesh && (
        <mesh
        key={index}
        geometry={node.geometry}
        material={node.material}
        position={node.position}
        rotation={node.rotation}
        scale={node.scale}
        castShadow
        receiveShadow
        
        >
            {isOutlined && <Outlines thickness={outlinethickness} color={outlineColor}/>}
        </mesh>
      )
    )}
    
  </group>
  );
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
      <div style={{ width: "100vw", height: "100vh", position: "fixed", top: 0, left: 0, zIndex: 0, pointerEvents: "auto", overflow: "hidden" }}>
  <Canvas
    key={useOrtho ? "ortho" : "persp"}
    orthographic={useOrtho}
    camera={{
      position: [0, 1, 3],
      zoom: useOrtho ? 150 : 1,
    }}
  >
    <CameraChecker />
    <color attach="background" args={[bgColor]} />
    <ambientLight intensity={0.6} />
    <directionalLight position={[2, 2, 2]} intensity={1} />

    {models.map((model) =>
      model.isVisible ? (
        <Suspense fallback={null} key={model._id}>
          <ModelLoader 
            key={model._id}
            url={model.url} 

            name={model._id} 
            outlinethickness={model.outLineThickness}
            outlineColor={model.outlineColor}

            isOutlined={model.isOutline} // dynamic outlines!
          />
        </Suspense>
      ) : null
    )}

    <OrbitControls />
    <PixelatedEffect pixelSize={pixelSize} />
  </Canvas>
</div>
    );
  }

"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF, TransformControls } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { EffectComposer, Pixelation, Selection, Outline } from "@react-three/postprocessing";
import { ModelItem } from "@/interface";
import {  useAnimations, Outlines, Environment } from '@react-three/drei'
import CameraControl from "@/controls/CameraControl";
import ModelControl from "@/controls/ModelControl";

type Props = {
  models: ModelItem[];
  setModels: React.Dispatch<React.SetStateAction<ModelItem[]>>;
  selectedModelId: string | null;
  setSelectedModelId: (id: string | null) => void;
  bgColor: string;
  pixelSize: number;
  isModelVisible: boolean;
  useOrtho:boolean;
  ismodelOutline:boolean;
 
};

function ModelLoader({ url, name, isOutlined, outlinethickness, outlineColor, modelTransform }: {
  url: string;
  name: string;
  isOutlined: boolean;
  outlinethickness: number;
  outlineColor: string;
  modelTransform: { position: [number, number, number]; rotation: [number, number, number]; scale: [number, number, number] };
}) {
  const ref = useRef<THREE.Group>(null!);
  const { scene } = useThree();
  const { nodes, materials, scene: gltfScene } = useGLTF(url);

  useEffect(() => {
    if (ref.current) {
      ref.current.name = name; // set group name
    }
  }, [name]);

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...modelTransform.position);
      ref.current.rotation.set(...modelTransform.rotation);
      ref.current.scale.set(...modelTransform.scale);
    }
  }, [modelTransform]);

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

function SelectionTransform({ selectedModelId }: { selectedModelId: string | null }) {
  const transform = useRef<any>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (selectedModelId) {
      const object = scene.getObjectByName(selectedModelId);
      if (object && transform.current) {
        transform.current.attach(object);
      }
    } else {
      if (transform.current) {
        transform.current.detach();
      }
    }
  }, [selectedModelId, scene]);

  return <TransformControls ref={transform} />;
}


export default function ModelViewer({ models, setModels, bgColor, pixelSize, selectedModelId, useOrtho }: Props ) {
  const transformControlsRef = useRef<any>(null);

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
    <CameraControl />  
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

            modelTransform={model.transformation}
          />
        </Suspense>
      ) : null
    )}

    {selectedModelId && (
      <ModelControl selectedModelId={selectedModelId} setModels={setModels}/>
    )}
    
    {/* <OrbitControls /> */}
    <PixelatedEffect pixelSize={pixelSize} />
  </Canvas>
</div>
    );
  }

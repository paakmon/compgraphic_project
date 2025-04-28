/**
 * ModelViewer component to load and display 3D models using Three.js and React Three Fiber.
 * It also applys pixelated effect to the whole scene
 *
 */

"use client";
import { useEffect, Suspense, useRef } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF, Outlines } from "@react-three/drei";
import { EffectComposer, Pixelation } from "@react-three/postprocessing";

import { ModelItem } from "@/interface";
import CameraControl from "@/controls/CameraControl";
import ModelControl from "@/controls/ModelControl";

type Props = {
  models: ModelItem[];
  setModels: React.Dispatch<React.SetStateAction<ModelItem[]>>;
  selectedModelId: string | null;

  bgColor: string;
  pixelSize: number;
  useOrtho: boolean;
};

type GLTFResult = {
  nodes: {
    [nodeName: string]: THREE.Object3D & {
      geometry?: THREE.BufferGeometry;
      material?: THREE.Material | THREE.Material[];
      isMesh?: boolean;
    };
  };
  materials: {
    [materialName: string]: THREE.Material;
  };
  // Include other properties that might come from useGLTF
  scene: THREE.Group;
  scenes: THREE.Group[];
  animations: THREE.AnimationClip[];
  asset: {
    generator: string;
    version: string;
  };
};

function ModelLoader({
  url,
  name,
  isOutlined,
  outlinethickness,
  outlineColor,
  modelTransform,
}: {
  url: string;
  name: string;
  isOutlined: boolean;
  outlinethickness: number;
  outlineColor: string;
  modelTransform: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
}) {
  const ref = useRef<THREE.Group>(null!);
  const gltf = useGLTF(url) as unknown as GLTFResult;
  const { nodes } = gltf;

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
      {Object.values(nodes).map(
        (node, index) =>
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
              {isOutlined && (
                <Outlines thickness={outlinethickness} color={outlineColor} />
              )}
            </mesh>
          )
      )}
    </group>
  );
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

export default function ModelViewer({
  models,
  setModels,
  bgColor,
  pixelSize,
  selectedModelId,
  useOrtho,
}: Props) {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "auto",
        overflow: "hidden",
      }}
    >
      <Canvas
        key={useOrtho ? "ortho" : "persp"}
        orthographic={useOrtho}
        camera={{
          position: [0, 1, 3],
          zoom: useOrtho ? 150 : 1,
        }}
      >
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
          <ModelControl
            selectedModelId={selectedModelId}
            setModels={setModels}
          />
        )}

        <PixelatedEffect pixelSize={pixelSize} />
      </Canvas>
    </div>
  );
}

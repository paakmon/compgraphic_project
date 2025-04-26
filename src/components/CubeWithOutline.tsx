import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import {  useAnimations, Outlines, Environment } from '@react-three/drei'
import * as THREE from 'three';
import { useControls } from 'leva'
import {  useEffect, useState } from 'react'
const CubeWithOutline = () => {
  const  outlines  = false;


  return (
    <Canvas shadows camera={{ position: [-4, -0.5, 4], fov: 55 }}>
       <ambientLight intensity={Math.PI} />
       <spotLight angle={0.2} intensity={100} castShadow position={[5, 10, 5]} />
      <Sphere outlines={outlines} scale={0.7} position={[1, -0.78, -2]} />
    </Canvas>
  );
};
function Sphere({ outlines, ...props }) {
  return (
    <mesh castShadow receiveShadow {...props}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial />
      {outlines && <Outlines screenspace thickness={1} />}
    </mesh>
  )
}

function Box({ outlines, ...props }) {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta
  })
  return (
    <>
      <mesh castShadow receiveShadow {...props} ref={ref}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
        {outlines && (
          <>
            <Outlines thickness={0.06} color="aquamarine" />
            <Outlines thickness={0.12} color="#177e89" />
            <Outlines thickness={0.2} color="#ff9770" />
          </>
        )}
      </mesh>
    </>
  )
}

export default CubeWithOutline;

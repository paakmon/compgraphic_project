/**
 * CameraControl component
 *
 * This component lets users control the scene camera via keyboard input.
 * - W/S: Move up/down
 * - A/D: Move left/right
 * - Q/E: Rotate left/right
 * - I/O: Zoom in/out
 * 
 */

"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function CameraControl() {
  const { camera } = useThree();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const speed = 0.1;
      const rotateSpeed = 0.05;

      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);

      switch (event.key.toLowerCase()) {
        case "w": // Move up
          camera.position.y += speed;
          break;
        case "s": // Move down
          camera.position.y -= speed;
          break;
        case "a": // Move left
          camera.position.x -= speed;
          break;
        case "d": // Move right
          camera.position.x += speed;
          break;
        case "q": // Rotate left
          camera.rotation.y += rotateSpeed;
          break;
        case "e": // Rotate right
          camera.rotation.y -= rotateSpeed;
          break;
        case "i": // Zoom in (move forward)
          camera.position.add(direction.multiplyScalar(speed));
          break;
        case "o": // Zoom out (move backward)
          camera.position.add(direction.multiplyScalar(-speed));
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [camera]);

  return null;
}

import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';

type ModelControlProps = {
  selectedModelId: string | null;
};

export default function ModelControl({ selectedModelId }: ModelControlProps) {
  const transform = useRef<any>(null);
  const { scene } = useThree();
  const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>('translate');

  // Handle key press to change mode
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '1') setMode('translate');
      if (event.key === '2') setMode('rotate');
      if (event.key === '3') setMode('scale');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Attach or detach selected model
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

  return selectedModelId ? (
    <TransformControls ref={transform} mode={mode} />
  ) : null;
}

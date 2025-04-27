/**
 * ModelControl component
 *
 * This component lets users control the selected 3D model in the scene via the TransformControls.
 * It allows users to translate, rotate, or scale the model using keyboard shortcuts:
 * - 1: Translate
 * - 2: Rotate
 * - 3: Scale
 * and also updates the model's transformation properties (position, rotation, scale).
 * 
 */

import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { TransformControls } from '@react-three/drei';
import { ModelItem } from '@/interface';

type ModelControlProps = {
  setModels: React.Dispatch<React.SetStateAction<ModelItem[]>>;
  selectedModelId: string | null;
};

export default function ModelControl({ setModels, selectedModelId }: ModelControlProps) {
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

        // Update models transformation on change
        const controls = transform.current;
        const handleChange = () => {
          setModels(prevModels => 
            prevModels.map(model => {
              if (model._id === selectedModelId) {
                return {
                  ...model,
                  transformation: {
                    position: [object.position.x, object.position.y, object.position.z],
                    rotation: [object.rotation.x, object.rotation.y, object.rotation.z],
                    scale: [object.scale.x, object.scale.y, object.scale.z],
                  },
                };
              }
              return model;
            })
          );
        };

        // Listen for changes when user moves/rotates/scales
        controls.addEventListener('objectChange', handleChange);
        controls.addEventListener('mouseUp', handleChange);
        controls.addEventListener('dragend', handleChange);

        // Cleanup on detach
        return () => {
          controls.removeEventListener('objectChange', handleChange);
          controls.addEventListener('mouseUp', handleChange);
          controls.addEventListener('dragend', handleChange);
        };
      }
    } else {
      if (transform.current) {
        transform.current.detach();
      }
    }
  }, [selectedModelId, scene, setModels]);

  return selectedModelId ? (
    <TransformControls ref={transform} mode={mode} />
  ) : null;
}

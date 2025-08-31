/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: SceneLighting.jsx
 * Description: SceneLighting component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { useControls } from 'leva'

export default function SceneLighting() {
  const {
    ambientIntensity,
    directionalIntensity,
    directionalPosition,
    lightColor,
  } = useControls('Lighting', {
    ambientIntensity: { value: 0.5, min: 0, max: 2, step: 0.1 },
    directionalIntensity: { value: 1, min: 0, max: 5, step: 0.1 },
    directionalPosition: {
      value: [10, 10, 5],
      step: 1,
    },
    lightColor: '#ffffff',
  })

  return (
    <>
      <ambientLight intensity={ambientIntensity} color={lightColor} />
      <directionalLight
        position={directionalPosition}
        intensity={directionalIntensity}
        color={lightColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color='#4ecdc4' />
    </>
  )
}

/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: About.jsx
 * Description: About component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text3D, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Navigation from '@components/Navigation'
import SceneLighting from '@modules/SceneLighting'

function AboutText() {
  return (
    <Text3D
      font='/fonts/helvetiker_regular.typeface.json'
      size={0.8}
      height={0.1}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.02}
      bevelOffset={0}
      bevelSegments={5}
      position={[-2, 0, 0]}
    >
      ABOUT
      <meshStandardMaterial color='#ff6b6b' />
    </Text3D>
  )
}

export default function About() {
  return (
    <>
      <Navigation />
      <div className='scene-container'>
        <Canvas camera={{ position: [0, 0, 8], fov: 75 }} shadows>
          <Suspense fallback={null}>
            <SceneLighting />
            <Environment preset='city' />

            <AboutText />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
            />
          </Suspense>
        </Canvas>
      </div>
    </>
  )
}

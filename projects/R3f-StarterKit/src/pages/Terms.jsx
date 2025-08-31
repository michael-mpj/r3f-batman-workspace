/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Terms.jsx
 * Description: Terms component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text, Environment } from '@react-three/drei'
import { Suspense } from 'react'
import Navigation from '@components/Navigation'
import SceneLighting from '@modules/SceneLighting'

function TermsContent() {
  return (
    <group>
      <Text
        fontSize={1}
        maxWidth={8}
        lineHeight={1.2}
        letterSpacing={0.02}
        textAlign='center'
        font='/fonts/Inter-Regular.woff'
        anchorX='center'
        anchorY='middle'
        position={[0, 1, 0]}
      >
        TERMS & CONDITIONS
        <meshStandardMaterial color='#4ecdc4' />
      </Text>

      <Text
        fontSize={0.3}
        maxWidth={10}
        lineHeight={1.4}
        letterSpacing={0.01}
        textAlign='center'
        font='/fonts/Inter-Regular.woff'
        anchorX='center'
        anchorY='middle'
        position={[0, -0.5, 0]}
      >
        This is a demo R3F StarterKit project.{'\n'}
        All content is for demonstration purposes only.{'\n'}
        Built with React Three Fiber, Three.js, and modern web technologies.
        <meshStandardMaterial color='#ffffff' />
      </Text>
    </group>
  )
}

export default function Terms() {
  return (
    <>
      <Navigation />
      <div className='scene-container'>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }} shadows>
          <Suspense fallback={null}>
            <SceneLighting />
            <Environment preset='dawn' />

            <TermsContent />

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

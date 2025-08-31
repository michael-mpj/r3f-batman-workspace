/**
 * R3F Workspace - R3f StarterKit
 * File: AdvancedScene.jsx
 * Description: Demo scene showcasing advanced 3D components
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stats } from '@react-three/drei'
import {
  TerrainMesh,
  ParticleSystem,
  CyberGrid,
} from '@r3f-workspace/r3f-components'
import { Suspense } from 'react'

/**
 * Advanced Scene Component
 */
export function AdvancedScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0a0a0a' }}>
      <Canvas
        camera={{
          position: [50, 30, 50],
          fov: 60,
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.1} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />

          {/* Environment */}
          <Environment preset='night' />

          {/* Advanced Components */}
          <TerrainMesh
            position={[0, -10, 0]}
            width={100}
            depth={100}
            widthSegments={50}
            depthSegments={50}
            scale={8}
            color='#2d4a2d'
          />

          <ParticleSystem
            position={[0, 0, 0]}
            count={2000}
            size={0.5}
            color='#00ffff'
            spread={60}
            speed={0.5}
          />

          <CyberGrid
            position={[0, -9.9, 0]}
            size={80}
            divisions={40}
            color='#00ff88'
            scanSpeed={1.5}
            scanIntensity={2.5}
          />

          {/* Controls and Stats */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={200}
          />

          <Stats />
        </Suspense>
      </Canvas>
    </div>
  )
}

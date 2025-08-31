/**
 * R3F Workspace - R3f StarterKit
 * File: QuantumScene.jsx
 * Description: Ultimate quantum-tech showcase scene
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.1.0
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stats, Float } from '@react-three/drei'
import {
  TerrainMesh,
  ParticleSystem,
  CyberGrid,
  WaterMesh,
  HologramMesh,
  QuantumField,
} from '@r3f-workspace/r3f-components'
import { Suspense } from 'react'

/**
 * Ultimate Quantum Technology Scene
 */
export function QuantumScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000510' }}>
      <Canvas
        camera={{
          position: [60, 40, 60],
          fov: 65,
        }}
        gl={{
          antialias: true,
          toneMapping: 0,
          toneMappingExposure: 1.2,
        }}
      >
        <Suspense fallback={null}>
          {/* Atmospheric Lighting */}
          <ambientLight intensity={0.05} color='#0a0a2a' />
          <directionalLight
            position={[20, 20, 10]}
            intensity={0.8}
            color='#4080ff'
            castShadow
            shadow-mapSize={[2048, 2048]}
          />
          <pointLight
            position={[-20, 10, -20]}
            intensity={1.2}
            color='#ff4080'
          />
          <spotLight position={[0, 30, 0]} intensity={0.6} color='#80ff40' />

          {/* Environment */}
          <Environment preset='night' />

          {/* Quantum Field - Core of the scene */}
          <QuantumField
            position={[0, 15, 0]}
            fieldSize={40}
            particleCount={2000}
            waveIntensity={1.5}
            speed={0.8}
            color1='#ff00ff'
            color2='#00ffff'
            quantumFluctuation={true}
            entanglement={true}
          />

          {/* Terrain Base */}
          <TerrainMesh
            position={[0, -15, 0]}
            width={120}
            depth={120}
            widthSegments={60}
            depthSegments={60}
            scale={12}
            color='#1a1a3a'
          />

          {/* Water Features */}
          <WaterMesh
            position={[-40, -8, -40]}
            width={30}
            depth={30}
            widthSegments={32}
            depthSegments={32}
            waveHeight={1.5}
            waveSpeed={1.2}
            color='#0066cc'
            opacity={0.7}
          />

          <WaterMesh
            position={[40, -8, 40]}
            width={25}
            depth={25}
            widthSegments={32}
            depthSegments={32}
            waveHeight={1}
            waveSpeed={0.8}
            color='#cc0066'
            opacity={0.6}
          />

          {/* Holographic Displays */}
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <HologramMesh
              position={[-25, 5, 0]}
              intensity={1.2}
              speed={1.5}
              color='#00ff88'
              opacity={0.8}
            >
              <boxGeometry args={[8, 8, 0.5]} />
            </HologramMesh>
          </Float>

          <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
            <HologramMesh
              position={[25, 8, 15]}
              intensity={0.9}
              speed={1.8}
              color='#ff8800'
              opacity={0.7}
            >
              <cylinderGeometry args={[4, 4, 10, 8]} />
            </HologramMesh>
          </Float>

          <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <HologramMesh
              position={[0, 25, -30]}
              intensity={1.5}
              speed={2.0}
              color='#8800ff'
              opacity={0.9}
            >
              <icosahedronGeometry args={[6, 1]} />
            </HologramMesh>
          </Float>

          {/* Particle Effects */}
          <ParticleSystem
            position={[0, 5, 0]}
            count={1500}
            size={0.4}
            color='#ffffff'
            spread={80}
            speed={0.3}
          />

          <ParticleSystem
            position={[-30, 10, -30]}
            count={800}
            size={0.6}
            color='#ff4080'
            spread={25}
            speed={0.5}
          />

          <ParticleSystem
            position={[30, 10, 30]}
            count={800}
            size={0.6}
            color='#4080ff'
            spread={25}
            speed={0.4}
          />

          {/* Cyber Grids */}
          <CyberGrid
            position={[0, -14.5, 0]}
            size={100}
            divisions={50}
            color='#00ff88'
            scanSpeed={1.5}
            scanIntensity={3}
          />

          <CyberGrid
            position={[0, 0, -60]}
            rotation={[Math.PI / 2, 0, 0]}
            size={120}
            divisions={60}
            color='#ff0088'
            scanSpeed={1.2}
            scanIntensity={2}
          />

          <CyberGrid
            position={[60, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            size={120}
            divisions={60}
            color='#8800ff'
            scanSpeed={1.8}
            scanIntensity={2.5}
          />

          {/* Controls and Stats */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={15}
            maxDistance={300}
            maxPolarAngle={Math.PI * 0.75}
          />

          <Stats showPanel={0} className='stats' />
        </Suspense>
      </Canvas>
    </div>
  )
}

/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: Home.jsx
 * Description: Home component with quantum-enhanced 3D experiences
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.1.0
 */

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { Suspense } from 'react'
import Navigation from '@components/Navigation'
import LoadingScreen from '@components/LoadingScreen'
import RotatingCube from '@components/RotatingCube'
import { QuantumScene } from '@components/QuantumScene'
import Grid from '@helpers/Grid'
import SceneLighting from '@modules/SceneLighting'
import {
  TerrainMesh,
  ParticleSystem,
  CyberGrid,
  WaterMesh,
  HologramMesh,
  QuantumField,
} from '@r3f-workspace/r3f-components'
import {
  Instances as SuzanneInstances,
  Model as SuzanneModel,
} from '../models/Suzanne'

export default function Home() {
  const {
    enablePerf,
    enableBloom,
    enablePostProcessing,
    showGrid,
    showAdvanced,
    quantumMode,
    showSuzanne,
  } = useControls('Scene', {
    enablePerf: { value: true },
    enableBloom: { value: true },
    enablePostProcessing: { value: true },
    showGrid: { value: true },
    showAdvanced: { value: false },
    quantumMode: { value: false },
    showSuzanne: { value: true },
  })

  // If quantum mode is enabled, show the full quantum scene
  if (quantumMode) {
    return (
      <>
        <Navigation />
        <QuantumScene />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <div className='scene-container'>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          shadows
          gl={{ antialias: true }}
        >
          {enablePerf && <Perf position='top-left' />}

          <Suspense fallback={null}>
            <SceneLighting />
            <Environment preset='sunset' />

            {/* Main 3D Content */}
            <RotatingCube />

            {/* Suzanne Model */}
            {showSuzanne && (
              <SuzanneInstances>
                <SuzanneModel position={[2, 0, 0]} scale={0.8} />
              </SuzanneInstances>
            )}

            {/* Advanced Components */}
            {showAdvanced && (
              <>
                <TerrainMesh
                  position={[0, -5, 0]}
                  width={50}
                  depth={50}
                  widthSegments={25}
                  depthSegments={25}
                  scale={5}
                  color='#2d4a2d'
                />

                <WaterMesh
                  position={[10, -3, 10]}
                  width={20}
                  depth={20}
                  widthSegments={20}
                  depthSegments={20}
                  waveHeight={1}
                  waveSpeed={1}
                  color='#1e40af'
                  opacity={0.8}
                />

                <ParticleSystem
                  position={[0, 2, 0]}
                  count={500}
                  size={0.3}
                  color='#00ffff'
                  spread={20}
                  speed={0.3}
                />

                <QuantumField
                  position={[0, 5, 0]}
                  fieldSize={15}
                  particleCount={300}
                  waveIntensity={1}
                  speed={0.5}
                  color1='#ff00ff'
                  color2='#00ffff'
                />

                <HologramMesh
                  position={[-8, 2, -8]}
                  intensity={1}
                  speed={1.5}
                  color='#00ff88'
                  opacity={0.7}
                >
                  <boxGeometry args={[3, 3, 0.2]} />
                </HologramMesh>

                <CyberGrid
                  position={[0, -4.9, 0]}
                  size={40}
                  divisions={20}
                  color='#00ff88'
                  scanSpeed={1}
                  scanIntensity={2}
                />
              </>
            )}

            {/* Ground and shadows */}
            <ContactShadows
              position={[0, -1.5, 0]}
              opacity={0.4}
              scale={10}
              blur={2}
              far={4}
            />

            {showGrid && <Grid />}

            {/* Controls */}
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={20}
            />

            {/* Post Processing */}
            {enablePostProcessing && (
              <EffectComposer>
                {enableBloom && (
                  <Bloom
                    luminanceThreshold={0.9}
                    luminanceSmoothing={0.025}
                    height={300}
                    opacity={0.5}
                  />
                )}
              </EffectComposer>
            )}
          </Suspense>
        </Canvas>
      </div>

      <Suspense fallback={<LoadingScreen />}>
        {/* Any async UI components */}
      </Suspense>
    </>
  )
}

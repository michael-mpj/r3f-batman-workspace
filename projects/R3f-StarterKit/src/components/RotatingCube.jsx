/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: RotatingCube.jsx
 * Description: Interactive 3D cube component with Leva controls and animations
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { lerp, degToRad, smoothstep } from '@r3f-workspace/utils'

export default function RotatingCube() {
  const meshRef = useRef(null)

  const { rotationSpeed, scale, color, wireframe, bouncingHeight } =
    useControls('Rotating Cube', {
      rotationSpeed: { value: 1, min: 0, max: 5, step: 0.1 },
      scale: { value: 1, min: 0.1, max: 3, step: 0.1 },
      color: '#ff6b6b',
      wireframe: false,
      bouncingHeight: { value: 0.2, min: 0, max: 1, step: 0.05 },
    })

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Use workspace utilities for smoother animations
      const rotationSpeedRad = degToRad(rotationSpeed * 45) // Convert to radians
      meshRef.current.rotation.x += delta * rotationSpeedRad
      meshRef.current.rotation.y += delta * rotationSpeedRad * 0.5

      // Smooth bouncing motion using smoothstep
      const bounceTime = (Math.sin(state.clock.elapsedTime * 2) + 1) * 0.5
      const smoothBounce = smoothstep(0, 1, bounceTime)
      meshRef.current.position.y = lerp(
        -bouncingHeight,
        bouncingHeight,
        smoothBounce
      )
    }
  })

  return (
    <mesh ref={meshRef} scale={scale} castShadow receiveShadow>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        roughness={0.4}
        metalness={0.2}
      />
    </mesh>
  )
}

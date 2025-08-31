/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: CameraController.jsx
 * Description: Camera controls and utilities for 3D scenes
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function CameraController({
  enablePan = true,
  enableZoom = true,
  enableRotate = true,
}) {
  const controlsRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enablePan = enablePan
      controlsRef.current.enableZoom = enableZoom
      controlsRef.current.enableRotate = enableRotate
    }
  }, [enablePan, enableZoom, enableRotate])

  return (
    <OrbitControls
      ref={controlsRef}
      camera={camera}
      makeDefault
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  )
}

export function AutoRotateCamera({ speed = 0.5, radius = 10 }) {
  const { camera } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed
    camera.position.x = Math.sin(t) * radius
    camera.position.z = Math.cos(t) * radius
    camera.lookAt(0, 0, 0)
  })

  return null
}

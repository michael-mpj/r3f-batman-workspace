/**
 * Cyber Forge - Main Cyber Scene
 * File: CyberScene.jsx
 * Description: Cyberpunk 3D scene with neon elements
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Box, Sphere } from "@react-three/drei";
import { useControls } from "leva";

export function CyberScene() {
  const meshRef = useRef();
  const textRef = useRef();

  const { rotationSpeed, color, intensity } = useControls({
    rotationSpeed: { value: 0.01, min: 0, max: 0.1 },
    color: "#00ffff",
    intensity: { value: 1, min: 0, max: 5 },
  });

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed;
      meshRef.current.rotation.y += delta * rotationSpeed * 0.5;
    }
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />

      {/* Neon point lights */}
      <pointLight position={[10, 10, 10]} color='#00ffff' intensity={intensity} distance={50} />
      <pointLight position={[-10, -10, -10]} color='#ff00ff' intensity={intensity} distance={50} />

      {/* Rotating cube */}
      <Box ref={meshRef} position={[0, 0, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} wireframe />
      </Box>

      {/* Floating spheres */}
      <Sphere position={[3, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color='#ff00ff' emissive='#ff00ff' emissiveIntensity={0.5} />
      </Sphere>

      <Sphere position={[-3, 0, 0]} args={[0.5]}>
        <meshStandardMaterial color='#ffff00' emissive='#ffff00' emissiveIntensity={0.5} />
      </Sphere>

      {/* 3D Text */}
      <Text
        ref={textRef}
        position={[0, 2, 0]}
        fontSize={0.5}
        color='#ffffff'
        font='https://fonts.gstatic.com/s/orbitron/v22/yMJMMIlzdpvBhQQL_SC3X9yhF25-T1nyGy6BoWgz.woff2'
      >
        CYBER FORGE
      </Text>
    </group>
  );
}

/**
 * R3F Workspace - R3F Components Package
 * File: TerrainMesh.jsx
 * Description: Advanced terrain mesh component with heightmaps
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { noise } from "@r3f-workspace/utils";

/**
 * Advanced Terrain Mesh Component
 * Creates a procedural terrain using noise functions
 */
export function TerrainMesh({ size = 100, resolution = 64, amplitude = 10, frequency = 0.02, animate = false, ...props }) {
  const meshRef = useRef();
  const timeRef = useRef(0);

  // Generate terrain geometry
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(size, size, resolution - 1, resolution - 1);
    const vertices = geo.attributes.position.array;

    // Apply noise to vertices
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 1];
      vertices[i + 2] = noise(x * frequency, z * frequency) * amplitude;
    }

    geo.computeVertexNormals();
    return geo;
  }, [size, resolution, amplitude, frequency]);

  // Animation loop
  useFrame((state, delta) => {
    if (!animate || !meshRef.current) return;

    timeRef.current += delta;
    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const z = vertices[i + 1];
      vertices[i + 2] = noise(x * frequency + timeRef.current * 0.1, z * frequency) * amplitude;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} {...props}>
      <meshStandardMaterial color='#4a7c59' wireframe={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

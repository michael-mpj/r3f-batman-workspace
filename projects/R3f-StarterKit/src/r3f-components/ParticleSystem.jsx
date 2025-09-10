/**
 * R3F Workspace - R3F Components Package
 * File: ParticleSystem.jsx
 * Description: Advanced particle system component
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Advanced Particle System Component
 */
export function ParticleSystem({ count = 1000, size = 1, color = "#ffffff", spread = 50, speed = 1, ...props }) {
  const pointsRef = useRef();
  const velocitiesRef = useRef();

  // Generate particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    const colorObj = new THREE.Color(color);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Random positions
      positions[i3] = (Math.random() - 0.5) * spread;
      positions[i3 + 1] = (Math.random() - 0.5) * spread;
      positions[i3 + 2] = (Math.random() - 0.5) * spread;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * 0.1;
      velocities[i3 + 1] = Math.random() * 0.1;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.1;

      // Colors with variation
      const variation = 0.3;
      colors[i3] = colorObj.r + (Math.random() - 0.5) * variation;
      colors[i3 + 1] = colorObj.g + (Math.random() - 0.5) * variation;
      colors[i3 + 2] = colorObj.b + (Math.random() - 0.5) * variation;
    }

    velocitiesRef.current = velocities;
    return { positions, colors };
  }, [count, spread, color]);

  // Animation loop
  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array;
    const velocities = velocitiesRef.current;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // Update positions
      positions[i3] += velocities[i3] * delta * speed;
      positions[i3 + 1] += velocities[i3 + 1] * delta * speed;
      positions[i3 + 2] += velocities[i3 + 2] * delta * speed;

      // Reset particles that go too high
      if (positions[i3 + 1] > spread / 2) {
        positions[i3 + 1] = -spread / 2;
        positions[i3] = (Math.random() - 0.5) * spread;
        positions[i3 + 2] = (Math.random() - 0.5) * spread;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} {...props}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' array={positions} count={count} itemSize={3} />
        <bufferAttribute attach='attributes-color' array={colors} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={size} vertexColors transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

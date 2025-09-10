/**
 * R3F Workspace - R3F Components Package
 * File: QuantumField.jsx
 * Description: Advanced quantum field visualization with particle interactions
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.1.0
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { noise } from "@r3f-workspace/utils";

/**
 * Quantum Field Visualization Component
 */
export function QuantumField({
  fieldSize = 30,
  particleCount = 1000,
  waveIntensity = 2,
  speed = 1,
  color1 = "#ff00ff",
  color2 = "#00ffff",
  quantumFluctuation = true,
  entanglement = true,
  ...props
}) {
  const pointsRef = useRef();
  const materialRef = useRef();
  const velocitiesRef = useRef();
  const phasesRef = useRef();

  // Generate quantum particles
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const phases = new Float32Array(particleCount);

    const color1Obj = new THREE.Color(color1);
    const color2Obj = new THREE.Color(color2);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Create clustered formations with quantum uncertainty
      const _cluster = Math.floor(Math.random() * 5);
      const clusterCenter = {
        x: (Math.random() - 0.5) * fieldSize,
        y: (Math.random() - 0.5) * fieldSize * 0.5,
        z: (Math.random() - 0.5) * fieldSize,
      };

      // Add quantum uncertainty to position
      const uncertainty = 2;
      positions[i3] = clusterCenter.x + (Math.random() - 0.5) * uncertainty;
      positions[i3 + 1] = clusterCenter.y + (Math.random() - 0.5) * uncertainty;
      positions[i3 + 2] = clusterCenter.z + (Math.random() - 0.5) * uncertainty;

      // Quantum velocity with wave-particle duality
      velocities[i3] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02;

      // Quantum phase for wave function
      phases[i] = Math.random() * Math.PI * 2;

      // Color interpolation based on quantum state
      const quantumState = Math.random();
      colors[i3] = color1Obj.r * quantumState + color2Obj.r * (1 - quantumState);
      colors[i3 + 1] = color1Obj.g * quantumState + color2Obj.g * (1 - quantumState);
      colors[i3 + 2] = color1Obj.b * quantumState + color2Obj.b * (1 - quantumState);
    }

    velocitiesRef.current = velocities;
    phasesRef.current = phases;
    return { positions, colors };
  }, [particleCount, fieldSize, color1, color2]);

  // Custom quantum material
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
  }, []);

  // Quantum field animation
  useFrame((state, delta) => {
    if (!pointsRef.current) {
      return;
    }

    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;
    const velocities = velocitiesRef.current;
    const phases = phasesRef.current;
    const time = state.clock.elapsedTime * speed;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Quantum fluctuation - Heisenberg uncertainty principle
      if (quantumFluctuation) {
        const uncertainty = 0.01 * waveIntensity;
        positions[i3] += (Math.random() - 0.5) * uncertainty;
        positions[i3 + 1] += (Math.random() - 0.5) * uncertainty;
        positions[i3 + 2] += (Math.random() - 0.5) * uncertainty;
      }

      // Wave function evolution
      phases[i] += delta * speed;
      const waveAmplitude = Math.sin(phases[i]) * waveIntensity * 0.5;

      // Apply quantum field forces using noise
      const noiseScale = 0.1;
      const forceX = noise(positions[i3] * noiseScale, positions[i3 + 1] * noiseScale, time * 0.1) * 0.001;
      const forceY = noise(positions[i3 + 1] * noiseScale, positions[i3 + 2] * noiseScale, time * 0.1) * 0.001;
      const forceZ = noise(positions[i3 + 2] * noiseScale, positions[i3] * noiseScale, time * 0.1) * 0.001;

      velocities[i3] += forceX * waveIntensity;
      velocities[i3 + 1] += forceY * waveIntensity;
      velocities[i3 + 2] += forceZ * waveIntensity;

      // Apply velocity with damping
      const damping = 0.98;
      velocities[i3] *= damping;
      velocities[i3 + 1] *= damping;
      velocities[i3 + 2] *= damping;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1] + waveAmplitude * 0.01;
      positions[i3 + 2] += velocities[i3 + 2];

      // Boundary conditions - quantum tunneling effect
      const boundary = fieldSize / 2;
      if (Math.abs(positions[i3]) > boundary) {
        if (Math.random() > 0.9) {
          // 10% tunnel probability
          positions[i3] = -positions[i3] * 0.5; // Tunnel to other side
        } else {
          velocities[i3] *= -0.5; // Bounce
        }
      }
      if (Math.abs(positions[i3 + 2]) > boundary) {
        if (Math.random() > 0.9) {
          positions[i3 + 2] = -positions[i3 + 2] * 0.5;
        } else {
          velocities[i3 + 2] *= -0.5;
        }
      }

      // Color evolution based on quantum state
      const energyLevel =
        Math.sqrt(velocities[i3] * velocities[i3] + velocities[i3 + 1] * velocities[i3 + 1] + velocities[i3 + 2] * velocities[i3 + 2]) *
        1000;

      const colorShift = Math.sin(time + phases[i]) * 0.3 + 0.7;
      colors[i3] *= colorShift + energyLevel * 0.1;
      colors[i3 + 1] *= colorShift + energyLevel * 0.1;
      colors[i3 + 2] *= colorShift + energyLevel * 0.1;
    }

    // Quantum entanglement - particles affect nearby particles
    if (entanglement) {
      for (let i = 0; i < particleCount; i += 10) {
        // Sample every 10th particle for performance
        const i3 = i * 3;
        const px = positions[i3];
        const py = positions[i3 + 1];
        const pz = positions[i3 + 2];

        // Find nearby particles and entangle them
        for (let j = i + 1; j < Math.min(i + 20, particleCount); j++) {
          const j3 = j * 3;
          const distance = Math.sqrt(
            Math.pow(positions[j3] - px, 2) + Math.pow(positions[j3 + 1] - py, 2) + Math.pow(positions[j3 + 2] - pz, 2)
          );

          if (distance < 2) {
            // Entangle velocities
            const entanglementStrength = 0.001 / (distance + 0.1);
            velocities[i3] += (velocities[j3] - velocities[i3]) * entanglementStrength;
            velocities[j3] += (velocities[i3] - velocities[j3]) * entanglementStrength;

            // Entangle phases
            phases[i] += (phases[j] - phases[i]) * entanglementStrength;
            phases[j] += (phases[i] - phases[j]) * entanglementStrength;
          }
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} {...props}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' array={positions} count={particleCount} itemSize={3} />
        <bufferAttribute attach='attributes-color' array={colors} count={particleCount} itemSize={3} />
      </bufferGeometry>
      <primitive object={material} ref={materialRef} />
    </points>
  );
}

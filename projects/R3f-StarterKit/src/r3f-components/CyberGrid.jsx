/**
 * R3F Workspace - R3F Components Package
 * File: CyberGrid.jsx
 * Description: Animated cyberpunk-style grid with scanning effects
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.0.0
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Cyberpunk-style Animated Grid
 */
export function CyberGrid({ size = 50, divisions = 50, color = "#00ffff", scanSpeed = 2, scanIntensity = 3, fadeDistance = 20, ...props }) {
  const groupRef = useRef();
  const materialRef = useRef();

  // Create grid vertices
  const vertices = useMemo(() => {
    const vertices = [];
    const half = size / 2;
    const step = size / divisions;

    // Horizontal lines
    for (let i = 0; i <= divisions; i++) {
      const y = -half + i * step;
      vertices.push(-half, 0, y, half, 0, y);
    }

    // Vertical lines
    for (let i = 0; i <= divisions; i++) {
      const x = -half + i * step;
      vertices.push(x, 0, -half, x, 0, half);
    }

    return new Float32Array(vertices);
  }, [size, divisions]);

  // Custom shader material for scanning effect
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(color) },
        scanSpeed: { value: scanSpeed },
        scanIntensity: { value: scanIntensity },
        fadeDistance: { value: fadeDistance },
      },
      vertexShader: `
        uniform float time;
        uniform float scanSpeed;
        uniform float scanIntensity;
        uniform float fadeDistance;

        varying float vScanEffect;
        varying float vDistance;

        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mvPosition;

          // Calculate distance from camera
          vDistance = length(mvPosition.xyz);

          // Create scanning wave effect
          float scan = sin(position.z * 0.1 + time * scanSpeed) * 0.5 + 0.5;
          scan = pow(scan, scanIntensity);
          vScanEffect = scan;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float fadeDistance;

        varying float vScanEffect;
        varying float vDistance;

        void main() {
          // Fade with distance
          float fade = 1.0 - smoothstep(0.0, fadeDistance, vDistance);

          // Combine scan effect with base color
          vec3 finalColor = color * (0.3 + vScanEffect * 0.7);

          gl_FragColor = vec4(finalColor, fade * (0.6 + vScanEffect * 0.4));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, scanSpeed, scanIntensity, fadeDistance]);

  // Animation
  useFrame(state => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach='attributes-position' array={vertices} count={vertices.length / 3} itemSize={3} />
        </bufferGeometry>
        <primitive object={material} ref={materialRef} />
      </lineSegments>
    </group>
  );
}

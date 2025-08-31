/**
 * R3F Workspace - R3F Components Package
 * File: WaterMesh.jsx
 * Description: Realistic water surface with wave simulation
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.1.0
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Realistic Water Surface Component
 */
export function WaterMesh({
  width = 100,
  depth = 100,
  widthSegments = 64,
  depthSegments = 64,
  waveHeight = 2,
  waveSpeed = 1,
  waveFrequency = 0.02,
  color = "#1e40af",
  opacity = 0.8,
  ...props
}) {
  const meshRef = useRef();
  const materialRef = useRef();

  // Create geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(width, depth, widthSegments, depthSegments);
  }, [width, depth, widthSegments, depthSegments]);

  // Custom water shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        waveHeight: { value: waveHeight },
        waveSpeed: { value: waveSpeed },
        waveFrequency: { value: waveFrequency },
        color: { value: new THREE.Color(color) },
        opacity: { value: opacity },
      },
      vertexShader: `
                uniform float time;
                uniform float waveHeight;
                uniform float waveSpeed;
                uniform float waveFrequency;

                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUv;

                float wave(vec3 pos, float time) {
                    float wave1 = sin(pos.x * waveFrequency + time * waveSpeed) * 0.5;
                    float wave2 = cos(pos.z * waveFrequency * 1.2 + time * waveSpeed * 0.8) * 0.3;
                    float wave3 = sin((pos.x + pos.z) * waveFrequency * 0.7 + time * waveSpeed * 1.3) * 0.2;
                    return (wave1 + wave2 + wave3) * waveHeight;
                }

                void main() {
                    vUv = uv;
                    vPosition = position;

                    // Calculate wave displacement
                    vec3 pos = position;
                    pos.y += wave(position, time);

                    // Calculate normal for lighting
                    float offset = 0.1;
                    vec3 tangentX = normalize(vec3(1.0,
                        wave(position + vec3(offset, 0.0, 0.0), time) - wave(position - vec3(offset, 0.0, 0.0), time),
                        0.0));
                    vec3 tangentZ = normalize(vec3(0.0,
                        wave(position + vec3(0.0, 0.0, offset), time) - wave(position - vec3(0.0, 0.0, offset), time),
                        1.0));
                    vNormal = normalize(cross(tangentX, tangentZ));

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
      fragmentShader: `
                uniform vec3 color;
                uniform float opacity;

                varying vec3 vPosition;
                varying vec3 vNormal;
                varying vec2 vUv;

                void main() {
                    // Simple lighting
                    vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
                    float diff = max(dot(vNormal, lightDir), 0.0);

                    // Add some reflective highlights
                    vec3 viewDir = normalize(-vPosition);
                    vec3 reflectDir = reflect(-lightDir, vNormal);
                    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);

                    vec3 finalColor = color * (0.3 + diff * 0.7) + spec * 0.5;

                    gl_FragColor = vec4(finalColor, opacity);
                }
            `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [waveHeight, waveSpeed, waveFrequency, color, opacity]);

  // Animation loop
  useFrame(state => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={material} rotation-x={-Math.PI / 2} {...props}>
      <primitive object={material} ref={materialRef} />
    </mesh>
  );
}

/**
 * R3F Workspace - R3F Components Package
 * File: HologramMesh.jsx
 * Description: Futuristic holographic display with glitch effects
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.1.0
 */

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Futuristic Hologram Component with Glitch Effects
 */
export function HologramMesh({
  children,
  intensity = 1,
  speed = 1,
  glitchFrequency = 0.1,
  color = "#00ffff",
  opacity = 0.8,
  scanlines = true,
  flicker = true,
  ...props
}) {
  const groupRef = useRef();
  const materialRef = useRef();

  // Custom hologram shader material
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        intensity: { value: intensity },
        speed: { value: speed },
        glitchFrequency: { value: glitchFrequency },
        color: { value: new THREE.Color(color) },
        opacity: { value: opacity },
        scanlines: { value: scanlines ? 1.0 : 0.0 },
        flicker: { value: flicker ? 1.0 : 0.0 },
      },
      vertexShader: `
                uniform float time;
                uniform float intensity;
                uniform float speed;
                uniform float glitchFrequency;

                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;

                void main() {
                    vUv = uv;
                    vPosition = position;
                    vNormal = normal;

                    vec3 pos = position;

                    // Add holographic distortion
                    float glitch = sin(time * speed * 10.0) * glitchFrequency;
                    if (sin(time * speed * 50.0) > 0.9) {
                        pos.x += glitch * 0.1;
                        pos.z += glitch * 0.05;
                    }

                    // Slight vertex animation
                    pos += normal * sin(time * speed + position.y * 5.0) * 0.002 * intensity;

                    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                }
            `,
      fragmentShader: `
                uniform float time;
                uniform float intensity;
                uniform float speed;
                uniform vec3 color;
                uniform float opacity;
                uniform float scanlines;
                uniform float flicker;

                varying vec2 vUv;
                varying vec3 vPosition;
                varying vec3 vNormal;

                void main() {
                    vec3 finalColor = color;
                    float alpha = opacity;

                    // Scanlines effect
                    if (scanlines > 0.5) {
                        float scanline = sin(vUv.y * 800.0) * 0.04 + 0.96;
                        finalColor *= scanline;
                    }

                    // Flicker effect
                    if (flicker > 0.5) {
                        float flickerAmount = sin(time * speed * 30.0) * 0.1 + 0.9;
                        alpha *= flickerAmount;
                    }

                    // Edge glow
                    vec3 viewDir = normalize(-vPosition);
                    float fresnel = 1.0 - max(0.0, dot(viewDir, vNormal));
                    fresnel = pow(fresnel, 2.0);
                    finalColor += fresnel * color * 0.5;
                    alpha += fresnel * 0.3;

                    // Glitch distortion
                    float glitchNoise = fract(sin(dot(vUv.xy, vec2(12.9898, 78.233))) * 43758.5453);
                    if (sin(time * speed * 20.0) > 0.95 && glitchNoise > 0.8) {
                        finalColor.r *= 1.5;
                        finalColor.g *= 0.5;
                        finalColor.b *= 2.0;
                    }

                    // Holographic brightness variation
                    float brightness = (sin(time * speed + vPosition.y * 10.0) * 0.1 + 0.9) * intensity;
                    finalColor *= brightness;

                    gl_FragColor = vec4(finalColor, alpha);
                }
            `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [intensity, speed, glitchFrequency, color, opacity, scanlines, flicker]);

  // Animation loop
  useFrame(state => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime;
    }

    // Subtle rotation for holographic effect
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <group ref={groupRef} {...props}>
      {children && (
        <mesh material={material}>
          {children}
          <primitive object={material} ref={materialRef} />
        </mesh>
      )}
    </group>
  );
}

/**
 * Cyber Forge - Main Application Component
 * File: App.jsx
 * Description: Root application component with cyberpunk theme
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Leva } from "leva";
import { Environment, OrbitControls } from "@react-three/drei";
import { CyberScene } from "@scenes/CyberScene";
import { LoadingScreen } from "@components/LoadingScreen";

export default function App() {
  return (
    <div className='cyber-forge-app'>
      <Leva collapsed />
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} dpr={[1, 2]} shadows>
        <Suspense fallback={null}>
          <Environment preset='night' />
          <CyberScene />
          <OrbitControls enablePan={false} />
        </Suspense>
      </Canvas>
      <LoadingScreen />
    </div>
  );
}

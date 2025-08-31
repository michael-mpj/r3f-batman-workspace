/**
 * R3F Workspace Monorepo - Configuration
 * File: renderWithProviders.js
 * Description: renderWithProviders component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { render } from "@testing-library/react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

/**
 * Render a component within a React Three Fiber Canvas for testing
 * @param {React.ReactElement} component - The component to render
 * @param {Object} canvasProps - Props to pass to the Canvas
 * @returns {Object} Testing library render result
 */
export const renderWithR3F = (component, canvasProps = {}) => {
  const defaultCanvasProps = {
    camera: { position: [0, 0, 5] },
    ...canvasProps,
  };

  return render(
    <Canvas {...defaultCanvasProps}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {component}
      </Suspense>
    </Canvas>
  );
};

/**
 * Create a minimal R3F scene for testing
 * @param {React.ReactElement} children - Components to render in the scene
 * @returns {React.ReactElement} Complete R3F scene
 */
export const createTestScene = children => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        {children}
      </Suspense>
    </Canvas>
  );
};

/**
 * Mock Three.js objects for testing
 */
export const mockThreeObjects = {
  geometry: {
    box: { args: [1, 1, 1] },
    sphere: { args: [1, 32, 32] },
    plane: { args: [1, 1] },
  },

  materials: {
    standard: { color: "#ffffff", roughness: 0.5, metalness: 0.1 },
    basic: { color: "#ffffff" },
    wireframe: { color: "#000000", wireframe: true },
  },
};

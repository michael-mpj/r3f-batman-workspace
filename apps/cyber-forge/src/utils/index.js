/**
 * R3F Workspace Monorepo - UI Package
 * File: index.js
 * Description: Custom hooks for UI components
 * Author: R3F Workspace Team
 * Created: 2025-08-31
 * Last Modified: 2025-08-31
 * Version: 1.0.0
 */

export { useTheme } from './useTheme.js';
export { useToggle } from './useToggle.js';
export const useSceneStore = create((set) => ({
    rotationSpeed: 0.01,
    neonColor: '#00ffff',
    lightIntensity: 1,
    isLoading: true,
    showControls: true,

    setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
    setNeonColor: (color) => set({ neonColor: color }),
    setLightIntensity: (intensity) => set({ lightIntensity: intensity }),
    setLoading: (loading) => set({ isLoading: loading }),
    toggleControls: () => set((state) => ({ showControls: !state.showControls })),
}));

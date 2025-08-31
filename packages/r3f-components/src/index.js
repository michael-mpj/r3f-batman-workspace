/**
 * R3F Workspace - R3F Components Package
 * File: index.js
 * Description: Main exports for r3f-components package
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Version: 1.1.0
 */

// Terrain and Environment
import { TerrainMesh } from "./TerrainMesh.jsx";
export { TerrainMesh };

// Water Systems
import { WaterMesh } from "./WaterMesh.jsx";
export { WaterMesh };

// Particle Systems
import { ParticleSystem } from "./ParticleSystem.jsx";
export { ParticleSystem };

// Quantum Systems
import { QuantumField } from "./QuantumField.jsx";
export { QuantumField };

// Grid Systems
import { CyberGrid } from "./CyberGrid.jsx";
export { CyberGrid };

// Holographic Effects
import { HologramMesh } from "./HologramMesh.jsx";
export { HologramMesh };

// Component categories
export const components = {
    terrain: {
        TerrainMesh,
    },
    water: {
        WaterMesh,
    },
    particles: {
        ParticleSystem,
    },
    quantum: {
        QuantumField,
    },
    grids: {
        CyberGrid,
    },
    holograms: {
        HologramMesh,
    },
};

// Version info
export const version = "1.1.0";

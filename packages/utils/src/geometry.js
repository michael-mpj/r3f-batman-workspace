/**
 * R3F Workspace Monorepo - Utils Package
 * File: geometry.js
 * Description: Geometric calculation utilities for 3D shapes and transformations
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import * as THREE from "three";

/**
 * Geometry utility functions for Three.js applications
 */

/**
 * Generate a heightmap from a noise function
 */
export const generateHeightmap = (width, height, noiseFunction, scale = 1) => {
    const data = new Float32Array(width * height);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const x = (j - width / 2) * scale;
            const y = (i - height / 2) * scale;
            data[i * width + j] = noiseFunction(x, y);
        }
    }

    return data;
};

/**
 * Calculate vertex normals for a height field
 */
export const calculateNormals = (heightmap, width, height) => {
    const normals = new Float32Array(width * height * 3);

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const idx = (i * width + j) * 3;

            // Get neighboring heights with bounds checking
            const left = j > 0 ? heightmap[i * width + (j - 1)] : heightmap[i * width + j];
            const right = j < width - 1 ? heightmap[i * width + (j + 1)] : heightmap[i * width + j];
            const up = i > 0 ? heightmap[(i - 1) * width + j] : heightmap[i * width + j];
            const down = i < height - 1 ? heightmap[(i + 1) * width + j] : heightmap[i * width + j];

            // Calculate normal using finite differences
            const dx = right - left;
            const dy = down - up;

            const normal = new THREE.Vector3(-dx, 2, -dy).normalize();

            normals[idx] = normal.x;
            normals[idx + 1] = normal.y;
            normals[idx + 2] = normal.z;
        }
    }

    return normals;
};

/**
 * Create a plane geometry with custom height data
 */
export const createTerrainGeometry = (width, height, widthSegments, heightSegments, heightData, heightScale = 1) => {
    const geometry = new THREE.PlaneGeometry(width, height, widthSegments - 1, heightSegments - 1);

    const vertices = geometry.attributes.position.array;

    for (let i = 0; i < vertices.length; i += 3) {
        const vertexIndex = Math.floor(i / 3);
        const heightIndex = Math.min(vertexIndex, heightData.length - 1);
        vertices[i + 2] = heightData[heightIndex] * heightScale;
    }

    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    return geometry;
};

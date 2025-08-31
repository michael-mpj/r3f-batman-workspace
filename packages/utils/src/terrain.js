/**
 * R3F Workspace Monorepo - Utils Package
 * File: terrain.js
 * Description: Terrain generation utilities for procedural landscapes
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { noise } from "./math";

/**
 * Generate terrain height at given coordinates using multi-octave noise
 */
export const getTerrainHeight = (x, y, config) => {
  let height = 0;
  let amplitude = 1;
  let frequency = 0.01;

  for (let i = 0; i < config.octaves; i++) {
    height += noise(x * frequency, y * frequency) * amplitude;
    amplitude *= config.persistence;
    frequency *= config.lacunarity;
  }

  return height * config.heightScale;
};

/**
 * Generate a full terrain heightmap
 */
export const generateTerrain = config => {
  const data = new Float32Array(config.segments * config.segments);
  const halfSize = config.size / 2;

  for (let i = 0; i < config.segments; i++) {
    for (let j = 0; j < config.segments; j++) {
      const x = (j / (config.segments - 1)) * config.size - halfSize;
      const y = (i / (config.segments - 1)) * config.size - halfSize;

      data[i * config.segments + j] = getTerrainHeight(x, y, config);
    }
  }

  return data;
};

/**
 * Default terrain configuration
 */
export const defaultTerrainConfig = {
  size: 50,
  segments: 64,
  heightScale: 10,
  octaves: 4,
  persistence: 0.5,
  lacunarity: 2.0,
};

/**
 * R3F Workspace Monorepo - Utils Package
 * File: math.js
 * Description: Mathematical utility functions for 3D graphics and terrain generation
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

/**
 * Mathematical utility functions for 3D graphics and terrain generation
 */

/**
 * Linear interpolation between two values
 */
export const lerp = (a, b, t) => {
  return a + (b - a) * t;
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Map a value from one range to another
 */
export const map = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Generate simplex-like noise
 */
export const noise = (x, y, scale = 1) => {
  const scaledX = x * scale;
  const scaledY = y * scale;

  return (
    Math.sin(scaledX * 0.1) * Math.cos(scaledY * 0.1) +
    Math.sin(scaledX * 0.05) * Math.cos(scaledY * 0.05) * 0.5 +
    Math.sin(scaledX * 0.2) * Math.cos(scaledY * 0.2) * 0.25
  );
};

/**
 * Smooth step function
 */
export const smoothstep = (edge0, edge1, x) => {
  const t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
};

/**
 * Convert degrees to radians
 */
export const degToRad = degrees => {
  return degrees * (Math.PI / 180);
};

/**
 * Convert radians to degrees
 */
export const radToDeg = radians => {
  return radians * (180 / Math.PI);
};

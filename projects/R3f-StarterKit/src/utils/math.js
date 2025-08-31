/**
 * R3F Workspace Monorepo - StarterKit Project
 * File: math.js
 * Description: math component/utility
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import * as THREE from 'three';

/**
 * Utility functions for 3D mathematics and transformations
 */

export const MathUtils = {
    /**
   * Linear interpolation between two values
   */
    lerp: (start, end, t) => {
        return start * (1 - t) + end * t;
    },

    /**
   * Clamp a value between min and max
   */
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },

    /**
   * Map a value from one range to another
   */
    map: (value, inMin, inMax, outMin, outMax) => {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },

    /**
   * Convert degrees to radians
   */
    degToRad: (degrees) => {
        return degrees * (Math.PI / 180);
    },

    /**
   * Convert radians to degrees
   */
    radToDeg: (radians) => {
        return radians * (180 / Math.PI);
    },

    /**
   * Generate random float between min and max
   */
    randomFloat: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    /**
   * Generate random integer between min and max (inclusive)
   */
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
};

export const VectorUtils = {
    /**
   * Calculate distance between two Vector3 points
   */
    distance: (v1, v2) => {
        return v1.distanceTo(v2);
    },

    /**
   * Create a random Vector3 within a range
   */
    randomVector3: (min, max) => {
        return new THREE.Vector3(
            MathUtils.randomFloat(min, max),
            MathUtils.randomFloat(min, max),
            MathUtils.randomFloat(min, max)
        );
    },

    /**
   * Normalize a vector to unit length
   */
    normalize: (vector) => {
        return vector.clone().normalize();
    },
};

export const ColorUtils = {
    /**
   * Convert hex color to THREE.Color
   */
    hexToColor: (hex) => {
        return new THREE.Color(hex);
    },

    /**
   * Lerp between two colors
   */
    lerpColors: (color1, color2, t) => {
        return color1.clone().lerp(color2, t);
    },

    /**
   * Generate random color
   */
    randomColor: () => {
        return new THREE.Color(Math.random(), Math.random(), Math.random());
    },
};

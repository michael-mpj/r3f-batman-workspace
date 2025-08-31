/**
 * R3F Workspace Monorepo - Utils Package
 * File: math.test.js
 * Description: Unit tests for mathematical utility functions
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

import { lerp, clamp, map, noise, smoothstep, degToRad, radToDeg } from "../math.js";

describe("Math Utilities", () => {
  describe("lerp", () => {
    test("should interpolate between two values", () => {
      expect(lerp(0, 10, 0.5)).toBe(5);
      expect(lerp(0, 10, 0)).toBe(0);
      expect(lerp(0, 10, 1)).toBe(10);
    });

    test("should handle negative values", () => {
      expect(lerp(-10, 10, 0.5)).toBe(0);
      expect(lerp(-5, 5, 0.25)).toBe(-2.5);
    });
  });

  describe("clamp", () => {
    test("should clamp values within range", () => {
      expect(clamp(5, 0, 10)).toBe(5);
      expect(clamp(-5, 0, 10)).toBe(0);
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test("should handle edge cases", () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
  });

  describe("map", () => {
    test("should map values from one range to another", () => {
      expect(map(5, 0, 10, 0, 100)).toBe(50);
      expect(map(0, 0, 10, 0, 100)).toBe(0);
      expect(map(10, 0, 10, 0, 100)).toBe(100);
    });

    test("should handle negative ranges", () => {
      expect(map(0, -10, 10, 0, 100)).toBe(50);
      expect(map(-5, -10, 10, 0, 100)).toBe(25);
    });
  });

  describe("noise", () => {
    test("should generate consistent noise values", () => {
      const value1 = noise(1, 1);
      const value2 = noise(1, 1);
      expect(value1).toBe(value2);
    });

    test("should return different values for different inputs", () => {
      const value1 = noise(1, 1);
      const value2 = noise(2, 2);
      expect(value1).not.toBe(value2);
    });

    test("should handle scale parameter", () => {
      const value1 = noise(1, 1, 1);
      const value2 = noise(1, 1, 2);
      expect(typeof value1).toBe("number");
      expect(typeof value2).toBe("number");
    });
  });

  describe("smoothstep", () => {
    test("should return 0 for values below edge0", () => {
      expect(smoothstep(0, 1, -0.5)).toBe(0);
    });

    test("should return 1 for values above edge1", () => {
      expect(smoothstep(0, 1, 1.5)).toBe(1);
    });

    test("should interpolate smoothly between edges", () => {
      const result = smoothstep(0, 1, 0.5);
      expect(result).toBeGreaterThan(0);
      expect(result).toBeLessThan(1);
      expect(result).toBe(0.5);
    });
  });

  describe("degToRad", () => {
    test("should convert degrees to radians", () => {
      expect(degToRad(0)).toBe(0);
      expect(degToRad(180)).toBeCloseTo(Math.PI, 5);
      expect(degToRad(90)).toBeCloseTo(Math.PI / 2, 5);
    });
  });

  describe("radToDeg", () => {
    test("should convert radians to degrees", () => {
      expect(radToDeg(0)).toBe(0);
      expect(radToDeg(Math.PI)).toBeCloseTo(180, 5);
      expect(radToDeg(Math.PI / 2)).toBeCloseTo(90, 5);
    });
  });

  describe("degree/radian conversion round trip", () => {
    test("should maintain precision in round trip conversions", () => {
      const degrees = 45;
      const radians = degToRad(degrees);
      const backToDegrees = radToDeg(radians);
      expect(backToDegrees).toBeCloseTo(degrees, 10);
    });
  });
});

/**
 * R3F Workspace Monorepo - Utils Package
 * File: performance.js
 * Description: Performance monitoring and optimization utilities for 3D applications
 * Author: R3F Workspace Team
 * Created: 2025-08-30
 * Last Modified: 2025-08-30
 * Version: 1.0.0
 */

/**
 * Performance monitoring and optimization utilities
 */

/**
 * Simple performance monitor
 */
export class PerformanceMonitor {
    constructor() {
        this.startTime = 0;
        this.measurements = new Map();
        this.currentLabel = null;
    }

    start(label) {
        this.startTime = performance.now();
        // Store label for potential future use
        this.currentLabel = label;
    }

    end(label) {
        const endTime = performance.now();
        const duration = endTime - this.startTime;

        if (!this.measurements.has(label)) {
            this.measurements.set(label, []);
        }

        const measurements = this.measurements.get(label);
        measurements.push(duration);

        // Keep only last 100 measurements
        if (measurements.length > 100) {
            measurements.shift();
        }

        return duration;
    }

    getAverage(label) {
        const measurements = this.measurements.get(label);
        if (!measurements || measurements.length === 0) return 0;

        const sum = measurements.reduce((a, b) => a + b, 0);
        return sum / measurements.length;
    }

    getStats(label) {
        const measurements = this.measurements.get(label);
        if (!measurements || measurements.length === 0) {
            return { min: 0, max: 0, avg: 0, count: 0 };
        }

        const min = Math.min(...measurements);
        const max = Math.max(...measurements);
        const avg = this.getAverage(label);
        const count = measurements.length;

        return { min, max, avg, count };
    }
}

/**
 * Frame rate monitor
 */
export class FPSMonitor {
    constructor() {
        this.frames = [];
        this.lastTime = 0;
    }

    update() {
        const now = performance.now();
        const delta = now - this.lastTime;
        this.lastTime = now;

        if (delta > 0) {
            const fps = 1000 / delta;
            this.frames.push(fps);

            // Keep only last 60 frames
            if (this.frames.length > 60) {
                this.frames.shift();
            }
        }

        return this.getAverageFPS();
    }

    getAverageFPS() {
        if (this.frames.length === 0) return 0;
        const sum = this.frames.reduce((a, b) => a + b, 0);
        return sum / this.frames.length;
    }
}

/**
 * Memory usage monitor
 */
export const getMemoryUsage = () => {
    if ("memory" in performance) {
        const memory = performance.memory;
        return {
            used: Math.round((memory.usedJSHeapSize / 1048576) * 100) / 100,
            total: Math.round((memory.totalJSHeapSize / 1048576) * 100) / 100,
            limit: Math.round((memory.jsHeapSizeLimit / 1048576) * 100) / 100,
        };
    }
    return null;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
    let timeout = null;

    return (...args) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

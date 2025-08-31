/**
 * JavaScript utilities for DOM manipulation and general web functions
 */

/**
 * Check if device supports WebGL
 */
export function checkWebGLSupport() {
    try {
        const canvas = document.createElement('canvas');
        const context =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        return !!(context && context.getExtension);
    } catch {
        return false;
    }
}

/**
 * Get device pixel ratio
 */
export function getPixelRatio() {
    return Math.min(window.devicePixelRatio || 1, 2);
}

/**
 * Check if device is mobile
 */
export function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
}

/**
 * Get viewport dimensions
 */
export function getViewportSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}

/**
 * Fullscreen utilities
 */
export const FullscreenUtils = {
    /**
   * Request fullscreen
   */
    enter: (element = document.documentElement) => {
        if (element.requestFullscreen) {
            return element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            return element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            return element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            return element.msRequestFullscreen();
        }
        return Promise.reject(new Error('Fullscreen not supported'));
    },

    /**
   * Exit fullscreen
   */
    exit: () => {
        if (document.exitFullscreen) {
            return document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            return document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            return document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            return document.msExitFullscreen();
        }
        return Promise.reject(new Error('Exit fullscreen not supported'));
    },

    /**
   * Check if in fullscreen mode
   */
    isActive: () => {
        return !!(
            document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
        );
    },
};

/**
 * Local storage utilities
 */
export const StorageUtils = {
    /**
   * Set item in localStorage with JSON serialization
   */
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.warn('Failed to save to localStorage:', e);
        }
    },

    /**
   * Get item from localStorage with JSON parsing
   */
    get: (key, defaultValue) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue || null;
        } catch (e) {
            console.warn('Failed to read from localStorage:', e);
            return defaultValue || null;
        }
    },

    /**
   * Remove item from localStorage
   */
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.warn('Failed to remove from localStorage:', e);
        }
    },
};

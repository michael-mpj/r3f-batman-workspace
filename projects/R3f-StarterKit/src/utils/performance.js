/**
 * Utility functions for performance monitoring and optimization
 */

export class PerformanceMonitor {
  constructor() {
    this.startTime = 0
    this.marks = new Map()
  }

  /**
   * Start timing
   */
  start() {
    this.startTime = performance.now()
  }

  /**
   * End timing and return duration
   */
  end() {
    return performance.now() - this.startTime
  }

  /**
   * Add a performance mark
   */
  mark(name) {
    this.marks.set(name, performance.now())
  }

  /**
   * Get time between two marks
   */
  measure(startMark, endMark) {
    const start = this.marks.get(startMark)
    const end = this.marks.get(endMark)

    if (start === undefined || end === undefined) {
      console.warn(`Performance marks ${startMark} or ${endMark} not found`)
      return 0
    }

    return end - start
  }

  /**
   * Clear all marks
   */
  clearMarks() {
    this.marks.clear()
  }
}

export const performanceMonitor = new PerformanceMonitor()

/**
 * Debounce function to limit function execution frequency
 */
export function debounce(func, delay) {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func.apply(null, args), delay)
  }
}

/**
 * Throttle function to limit function execution rate
 */
export function throttle(func, limit) {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Memory usage monitor
 */
export const MemoryMonitor = {
  /**
   * Get current memory usage (if available)
   */
  getUsage: () => {
    if ('memory' in performance) {
      return performance.memory
    }
    return null
  },

  /**
   * Log memory usage
   */
  logUsage: () => {
    const memory = MemoryMonitor.getUsage()
    if (memory) {
      console.log('Memory Usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
      })
    } else {
      console.log('Memory monitoring not available')
    }
  },
}

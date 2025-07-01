/**
 * Performance Monitoring Utilities
 * Tracks and reports website performance metrics
 */

interface PerformanceMetrics {
  navigationTiming: {
    domContentLoaded: number;
    loadComplete: number;
    firstPaint: number;
    firstContentfulPaint: number;
    timeToInteractive: number;
  };
  resourceTiming: {
    imageLoadTime: number;
    scriptLoadTime: number;
    cssLoadTime: number;
  };
  userTiming: {
    componentRenderTime: Map<string, number>;
  };
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    navigationTiming: {
      domContentLoaded: 0,
      loadComplete: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      timeToInteractive: 0,
    },
    resourceTiming: {
      imageLoadTime: 0,
      scriptLoadTime: 0,
      cssLoadTime: 0,
    },
    userTiming: {
      componentRenderTime: new Map(),
    },
  };

  constructor() {
    if (typeof window !== 'undefined' && window.performance) {
      this.initializeMonitoring();
    }
  }

  private initializeMonitoring() {
    // Monitor page load performance
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-paint') {
            this.metrics.navigationTiming.firstPaint = Math.round(entry.startTime);
          } else if (entry.name === 'first-contentful-paint') {
            this.metrics.navigationTiming.firstContentfulPaint = Math.round(entry.startTime);
          }
        }
      });

      try {
        paintObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('Paint timing not supported');
      }

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        this.metrics.navigationTiming.timeToInteractive = Math.round(lastEntry.startTime);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP timing not supported');
      }
    }

    // Navigation timing
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (perfData) {
          this.metrics.navigationTiming.domContentLoaded = Math.round(
            perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
          );
          this.metrics.navigationTiming.loadComplete = Math.round(
            perfData.loadEventEnd - perfData.fetchStart
          );
        }

        // Resource timing
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
        let totalImageTime = 0;
        let totalScriptTime = 0;
        let totalCSSTime = 0;
        let imageCount = 0;
        let scriptCount = 0;
        let cssCount = 0;

        resources.forEach((resource) => {
          const duration = resource.duration;
          if (resource.initiatorType === 'img') {
            totalImageTime += duration;
            imageCount++;
          } else if (resource.initiatorType === 'script') {
            totalScriptTime += duration;
            scriptCount++;
          } else if (resource.initiatorType === 'css' || resource.initiatorType === 'link') {
            totalCSSTime += duration;
            cssCount++;
          }
        });

        this.metrics.resourceTiming.imageLoadTime = imageCount > 0 ? Math.round(totalImageTime / imageCount) : 0;
        this.metrics.resourceTiming.scriptLoadTime = scriptCount > 0 ? Math.round(totalScriptTime / scriptCount) : 0;
        this.metrics.resourceTiming.cssLoadTime = cssCount > 0 ? Math.round(totalCSSTime / cssCount) : 0;

        this.reportMetrics();
      }, 2000); // Wait for all resources to load
    });
  }

  public measureComponentRender(componentName: string, renderTime: number) {
    this.metrics.userTiming.componentRenderTime.set(componentName, Math.round(renderTime));
  }

  private reportMetrics() {
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      metrics: {
        navigation: this.metrics.navigationTiming,
        resources: this.metrics.resourceTiming,
        components: Array.from(this.metrics.userTiming.componentRenderTime.entries()).map(
          ([name, time]) => ({ name, time })
        ),
      },
      device: {
        userAgent: navigator.userAgent,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        viewportSize: `${window.innerWidth}x${window.innerHeight}`,
        connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      },
    };

    // Log to console in development
    if (import.meta.env.DEV) {
      console.log('Performance Report:', report);
    }

    // Send to analytics endpoint (if configured)
    if (window.gtag) {
      window.gtag('event', 'performance_metrics', {
        event_category: 'Performance',
        event_label: 'Page Load',
        value: this.metrics.navigationTiming.loadComplete,
        custom_map: report,
      });
    }
  }

  public getMetrics() {
    return this.metrics;
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// React hook for component performance monitoring
export function usePerformanceMonitor(componentName: string) {
  const startTime = performance.now();
  
  return {
    endMeasurement: () => {
      const endTime = performance.now();
      performanceMonitor.measureComponentRender(componentName, endTime - startTime);
    },
  };
}

// Utility to measure async operations
export async function measureAsyncOperation<T>(
  operationName: string,
  operation: () => Promise<T>
): Promise<T> {
  const startTime = performance.now();
  
  try {
    const result = await operation();
    const duration = performance.now() - startTime;
    
    if (window.gtag) {
      window.gtag('event', 'async_operation', {
        event_category: 'Performance',
        event_label: operationName,
        value: Math.round(duration),
      });
    }
    
    return result;
  } catch (error) {
    const duration = performance.now() - startTime;
    console.error(`Operation ${operationName} failed after ${duration}ms:`, error);
    throw error;
  }
}

// Web Vitals tracking
export function trackWebVitals() {
  if ('PerformanceObserver' in window) {
    // Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('Layout shift tracking not supported');
    }

    // Report CLS on page unload
    window.addEventListener('beforeunload', () => {
      if (window.gtag && clsValue > 0) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Performance',
          event_label: 'CLS',
          value: Math.round(clsValue * 1000) / 1000,
        });
      }
    });
  }
}

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

// Web Vitals configuration
export interface WebVitalsMetric {
  name: 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
  delta: number;
}

// Performance budgets
export const PERFORMANCE_BUDGETS = {
  javascript: 300 * 1024, // 300KB
  css: 100 * 1024,        // 100KB
  images: 500 * 1024,     // 500KB per image
  total: 1000 * 1024,     // 1MB total
  
  // Web Vitals targets
  vitals: {
    FCP: 1500,  // 1.5s
    LCP: 2500,  // 2.5s
    CLS: 0.1,   // 0.1
    FID: 100,   // 100ms
    TTFB: 800,  // 800ms
  }
};

// Analytics instance (placeholder - would be replaced with real analytics service)
class Analytics {
  private queue: any[] = [];
  private initialized = false;

  initialize() {
    if (typeof window === 'undefined') return;
    
    // Initialize analytics service (e.g., Google Analytics, Plausible, etc.)
    this.initialized = true;
    
    // Process queued events
    this.queue.forEach(event => this.send(event));
    this.queue = [];
  }

  track(eventName: string, properties?: Record<string, any>) {
    const event = {
      type: 'track',
      event: eventName,
      properties: {
        ...properties,
        timestamp: new Date().toISOString(),
        url: typeof window !== 'undefined' ? window.location.href : '',
      }
    };

    if (this.initialized) {
      this.send(event);
    } else {
      this.queue.push(event);
    }
  }

  trackWebVital(metric: WebVitalsMetric) {
    const isOverBudget = metric.value > PERFORMANCE_BUDGETS.vitals[metric.name];
    
    this.track('web_vital', {
      metric_name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      is_over_budget: isOverBudget,
      budget: PERFORMANCE_BUDGETS.vitals[metric.name],
    });

    // Log warning if over budget
    if (isOverBudget && process.env.NODE_ENV === 'development') {
      console.warn(
        `⚠️ Performance Budget Exceeded: ${metric.name} = ${metric.value}ms (budget: ${PERFORMANCE_BUDGETS.vitals[metric.name]}ms)`
      );
    }
  }

  private send(event: any) {
    // Send to analytics service
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }
    
    // In production, send to real analytics service
    // window.gtag?.('event', event.event, event.properties);
  }
}

export const analytics = new Analytics();

// Report Web Vitals
export function reportWebVitals(onPerfEntry?: (metric: WebVitalsMetric) => void) {
  if (typeof window === 'undefined') return;

  const handleEntry = (metric: WebVitalsMetric) => {
    // Send to analytics
    analytics.trackWebVital(metric);
    
    // Call custom handler if provided
    onPerfEntry?.(metric);
  };

  getCLS(handleEntry);
  getFCP(handleEntry);
  getFID(handleEntry);
  getLCP(handleEntry);
  getTTFB(handleEntry);
}

// Performance monitoring utilities
export function measurePerformance(name: string, fn: () => void | Promise<void>) {
  const startTime = performance.now();
  
  const complete = () => {
    const duration = performance.now() - startTime;
    analytics.track('performance_measure', {
      name,
      duration,
      duration_ms: Math.round(duration),
    });
  };

  const result = fn();
  
  if (result instanceof Promise) {
    return result.finally(complete);
  } else {
    complete();
    return result;
  }
}

// Resource size monitoring
export function checkResourceSizes() {
  if (typeof window === 'undefined' || !window.performance) return;

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const summary = {
    javascript: 0,
    css: 0,
    images: 0,
    total: 0,
  };

  resources.forEach(resource => {
    const size = resource.transferSize || 0;
    summary.total += size;

    if (resource.name.endsWith('.js')) {
      summary.javascript += size;
    } else if (resource.name.endsWith('.css')) {
      summary.css += size;
    } else if (resource.name.match(/\.(jpg|jpeg|png|gif|webp|avif|svg)$/i)) {
      summary.images += size;
    }
  });

  // Check against budgets
  Object.entries(summary).forEach(([type, size]) => {
    const budget = PERFORMANCE_BUDGETS[type as keyof typeof PERFORMANCE_BUDGETS];
    if (typeof budget === 'number' && size > budget) {
      console.warn(
        `⚠️ Resource Budget Exceeded: ${type} = ${(size / 1024).toFixed(2)}KB (budget: ${(budget / 1024).toFixed(2)}KB)`
      );
    }
  });

  return summary;
}

// Initialize analytics on load
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    analytics.initialize();
    checkResourceSizes();
  });
}
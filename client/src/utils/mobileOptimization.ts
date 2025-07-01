/**
 * Mobile Optimization Utilities
 * Implements mobile-first design patterns and performance enhancements
 */

// Device detection utilities
export const deviceDetection = {
  isMobile: (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  },
  
  isTablet: (): boolean => {
    return /iPad|Android/i.test(navigator.userAgent) && !/Mobile/i.test(navigator.userAgent);
  },
  
  isTouchDevice: (): boolean => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  },
  
  getDeviceType: (): 'mobile' | 'tablet' | 'desktop' => {
    if (deviceDetection.isMobile()) return 'mobile';
    if (deviceDetection.isTablet()) return 'tablet';
    return 'desktop';
  },
  
  getScreenOrientation: (): 'portrait' | 'landscape' => {
    return window.innerWidth < window.innerHeight ? 'portrait' : 'landscape';
  }
};

// Viewport utilities
export const viewportUtils = {
  getViewportSize: () => ({
    width: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
    height: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  }),
  
  isInViewport: (element: HTMLElement): boolean => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },
  
  setViewportMeta: (content: string) => {
    let viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      document.head.appendChild(viewport);
    }
    viewport.setAttribute('content', content);
  }
};

// Touch gesture handlers
export class TouchGestureHandler {
  private element: HTMLElement;
  private startX: number = 0;
  private startY: number = 0;
  private distX: number = 0;
  private distY: number = 0;
  private threshold: number = 50;
  private restraint: number = 100;
  private allowedTime: number = 300;
  private startTime: number = 0;
  
  constructor(element: HTMLElement) {
    this.element = element;
    this.init();
  }
  
  private init() {
    this.element.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleTouchEnd.bind(this), { passive: true });
  }
  
  private handleTouchStart(e: TouchEvent) {
    const touchObj = e.changedTouches[0];
    this.startX = touchObj.pageX;
    this.startY = touchObj.pageY;
    this.startTime = new Date().getTime();
  }
  
  private handleTouchEnd(e: TouchEvent) {
    const touchObj = e.changedTouches[0];
    this.distX = touchObj.pageX - this.startX;
    this.distY = touchObj.pageY - this.startY;
    const elapsedTime = new Date().getTime() - this.startTime;
    
    if (elapsedTime <= this.allowedTime) {
      if (Math.abs(this.distX) >= this.threshold && Math.abs(this.distY) <= this.restraint) {
        const direction = this.distX < 0 ? 'left' : 'right';
        this.element.dispatchEvent(new CustomEvent('swipe', { detail: { direction } }));
      } else if (Math.abs(this.distY) >= this.threshold && Math.abs(this.distX) <= this.restraint) {
        const direction = this.distY < 0 ? 'up' : 'down';
        this.element.dispatchEvent(new CustomEvent('swipe', { detail: { direction } }));
      }
    }
  }
  
  destroy() {
    this.element.removeEventListener('touchstart', this.handleTouchStart);
    this.element.removeEventListener('touchend', this.handleTouchEnd);
  }
}

// Mobile performance optimizations
export const mobilePerformance = {
  // Debounce function for scroll and resize events
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },
  
  // Throttle function for high-frequency events
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },
  
  // Optimize images for mobile
  optimizeMobileImages: () => {
    const images = document.querySelectorAll('img[data-mobile-src]');
    if (deviceDetection.isMobile()) {
      images.forEach((img) => {
        const mobileSource = img.getAttribute('data-mobile-src');
        if (mobileSource) {
          img.setAttribute('src', mobileSource);
        }
      });
    }
  },
  
  // Enable hardware acceleration
  enableHardwareAcceleration: (element: HTMLElement) => {
    element.style.transform = 'translateZ(0)';
    element.style.webkitTransform = 'translateZ(0)';
    element.style.willChange = 'transform';
  },
  
  // Disable hardware acceleration
  disableHardwareAcceleration: (element: HTMLElement) => {
    element.style.transform = '';
    element.style.webkitTransform = '';
    element.style.willChange = '';
  }
};

// Mobile-specific UI enhancements
export const mobileUI = {
  // Add tap highlight color
  setTapHighlight: (color: string = 'rgba(0, 0, 0, 0.1)') => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        -webkit-tap-highlight-color: ${color};
      }
    `;
    document.head.appendChild(style);
  },
  
  // Prevent double-tap zoom
  preventDoubleTapZoom: () => {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (e) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    }, false);
  },
  
  // Fix iOS input zoom
  fixIOSInputZoom: () => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
      const content = meta.getAttribute('content');
      if (content && !content.includes('maximum-scale')) {
        meta.setAttribute('content', content + ', maximum-scale=1');
      }
    }
  },
  
  // Handle safe area insets (iPhone X+)
  applySafeAreaInsets: () => {
    const style = document.createElement('style');
    style.textContent = `
      .safe-area-inset-top {
        padding-top: env(safe-area-inset-top);
      }
      .safe-area-inset-bottom {
        padding-bottom: env(safe-area-inset-bottom);
      }
      .safe-area-inset-left {
        padding-left: env(safe-area-inset-left);
      }
      .safe-area-inset-right {
        padding-right: env(safe-area-inset-right);
      }
    `;
    document.head.appendChild(style);
  }
};

// Responsive breakpoints
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
  
  isMobileView: (): boolean => window.innerWidth <= breakpoints.mobile,
  isTabletView: (): boolean => window.innerWidth > breakpoints.mobile && window.innerWidth <= breakpoints.tablet,
  isDesktopView: (): boolean => window.innerWidth > breakpoints.tablet,
  
  getCurrentBreakpoint: (): string => {
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) return 'mobile';
    if (width <= breakpoints.tablet) return 'tablet';
    if (width <= breakpoints.desktop) return 'desktop';
    return 'wide';
  }
};

// Network optimization for mobile
export const networkOptimization = {
  // Check connection type
  getConnectionType: (): string => {
    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    return connection?.effectiveType || 'unknown';
  },
  
  // Check if connection is slow
  isSlowConnection: (): boolean => {
    const connectionType = networkOptimization.getConnectionType();
    return ['slow-2g', '2g', '3g'].includes(connectionType);
  },
  
  // Adapt content based on connection
  adaptToConnection: () => {
    if (networkOptimization.isSlowConnection()) {
      // Disable auto-play videos
      document.querySelectorAll('video[autoplay]').forEach((video) => {
        video.removeAttribute('autoplay');
      });
      
      // Load low-quality images
      document.querySelectorAll('img[data-low-src]').forEach((img) => {
        const lowSrc = img.getAttribute('data-low-src');
        if (lowSrc) {
          img.setAttribute('src', lowSrc);
        }
      });
    }
  }
};

// PWA installation helper
export const pwaInstallation = {
  deferredPrompt: null as any,
  
  init: () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      pwaInstallation.deferredPrompt = e;
      // Show install button
      const installButton = document.getElementById('pwa-install-button');
      if (installButton) {
        installButton.style.display = 'block';
      }
    });
  },
  
  showInstallPrompt: async () => {
    if (!pwaInstallation.deferredPrompt) return false;
    
    pwaInstallation.deferredPrompt.prompt();
    const { outcome } = await pwaInstallation.deferredPrompt.userChoice;
    
    pwaInstallation.deferredPrompt = null;
    return outcome === 'accepted';
  },
  
  isPWAInstalled: (): boolean => {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true;
  }
};

// Initialize mobile optimizations
export function initializeMobileOptimizations() {
  // Set tap highlight color
  mobileUI.setTapHighlight();
  
  // Prevent double-tap zoom
  mobileUI.preventDoubleTapZoom();
  
  // Fix iOS input zoom
  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
    mobileUI.fixIOSInputZoom();
  }
  
  // Apply safe area insets
  mobileUI.applySafeAreaInsets();
  
  // Optimize images for mobile
  mobilePerformance.optimizeMobileImages();
  
  // Adapt content based on connection
  networkOptimization.adaptToConnection();
  
  // Initialize PWA installation
  pwaInstallation.init();
  
  // Log device info in development
  if (import.meta.env.DEV) {
    console.log('Device Type:', deviceDetection.getDeviceType());
    console.log('Screen Orientation:', deviceDetection.getScreenOrientation());
    console.log('Connection Type:', networkOptimization.getConnectionType());
    console.log('Current Breakpoint:', breakpoints.getCurrentBreakpoint());
  }
}
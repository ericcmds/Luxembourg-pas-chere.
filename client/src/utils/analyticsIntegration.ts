/**
 * Analytics Integration for Luxembourg Pas Chère
 * Comprehensive tracking and monitoring for SEO and user behavior
 */

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
  metadata?: Record<string, any>;
}

interface UserBehavior {
  pageViews: number;
  sessionDuration: number;
  scrollDepth: number;
  interactions: string[];
  language: string;
  device: string;
  referrer: string;
}

class AnalyticsTracker {
  private sessionStart: number;
  private userBehavior: UserBehavior;
  private scrollPositions: number[] = [];
  private maxScrollDepth: number = 0;

  constructor() {
    this.sessionStart = Date.now();
    this.userBehavior = {
      pageViews: 0,
      sessionDuration: 0,
      scrollDepth: 0,
      interactions: [],
      language: navigator.language,
      device: this.getDeviceType(),
      referrer: document.referrer
    };
    
    this.initializeTracking();
  }

  private getDeviceType(): string {
    const width = window.innerWidth;
    if (width <= 480) return 'mobile';
    if (width <= 768) return 'tablet';
    return 'desktop';
  }

  private initializeTracking() {
    // Track page views
    this.trackPageView();
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track session duration
    this.trackSessionDuration();
    
    // Track user interactions
    this.trackInteractions();
    
    // Track page visibility
    this.trackPageVisibility();
  }

  private trackPageView() {
    this.userBehavior.pageViews++;
    this.sendEvent({
      category: 'Navigation',
      action: 'Page View',
      label: window.location.pathname
    });
  }

  private trackScrollDepth() {
    let ticking = false;
    
    const updateScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const scrollPercentage = Math.round((scrolled / scrollHeight) * 100);
      
      if (scrollPercentage > this.maxScrollDepth) {
        this.maxScrollDepth = scrollPercentage;
        
        // Track milestone scroll depths
        if ([25, 50, 75, 90, 100].includes(scrollPercentage)) {
          this.sendEvent({
            category: 'Engagement',
            action: 'Scroll Depth',
            label: `${scrollPercentage}%`,
            value: scrollPercentage
          });
        }
      }
      
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDepth);
        ticking = true;
      }
    });
  }

  private trackSessionDuration() {
    // Update session duration every 30 seconds
    setInterval(() => {
      this.userBehavior.sessionDuration = Math.round((Date.now() - this.sessionStart) / 1000);
    }, 30000);
    
    // Send session duration on page unload
    window.addEventListener('beforeunload', () => {
      this.sendEvent({
        category: 'Engagement',
        action: 'Session Duration',
        value: this.userBehavior.sessionDuration
      });
    });
  }

  private trackInteractions() {
    // Track clicks
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      if (['a', 'button'].includes(tagName)) {
        const interaction = `${tagName}: ${target.innerText || target.getAttribute('aria-label') || 'unknown'}`;
        this.userBehavior.interactions.push(interaction);
        
        this.sendEvent({
          category: 'Interaction',
          action: 'Click',
          label: interaction
        });
      }
    });
    
    // Track form submissions
    document.addEventListener('submit', (event) => {
      const form = event.target as HTMLFormElement;
      const formName = form.getAttribute('name') || form.getAttribute('id') || 'unknown';
      
      this.sendEvent({
        category: 'Interaction',
        action: 'Form Submit',
        label: formName
      });
    });
  }

  private trackPageVisibility() {
    let hiddenTime = 0;
    let visibilityChangeTime = Date.now();
    
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        visibilityChangeTime = Date.now();
      } else {
        hiddenTime += Date.now() - visibilityChangeTime;
        
        this.sendEvent({
          category: 'Engagement',
          action: 'Page Visibility',
          label: 'Hidden Time',
          value: Math.round(hiddenTime / 1000)
        });
      }
    });
  }

  public trackEvent(event: AnalyticsEvent) {
    this.sendEvent(event);
  }

  private sendEvent(event: AnalyticsEvent) {
    // Send to Google Analytics if available
    if (window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        ...event.metadata
      });
    }
    
    // Log in development
    if (import.meta.env.DEV) {
      console.log('Analytics Event:', event);
    }
  }

  public getUserBehaviorSummary() {
    return {
      ...this.userBehavior,
      scrollDepth: this.maxScrollDepth,
      sessionDuration: Math.round((Date.now() - this.sessionStart) / 1000)
    };
  }
}

// E-commerce tracking
export const ecommerceTracking = {
  trackProductView: (product: { id: string; name: string; price: number; category: string }) => {
    analyticsTracker.trackEvent({
      category: 'E-commerce',
      action: 'Product View',
      label: product.name,
      value: product.price,
      metadata: {
        ecommerce: {
          currency: 'EUR',
          value: product.price,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            item_category: product.category,
            quantity: 1
          }]
        }
      }
    });
  },

  trackAddToCart: (product: { id: string; name: string; price: number; quantity: number }) => {
    analyticsTracker.trackEvent({
      category: 'E-commerce',
      action: 'Add to Cart',
      label: product.name,
      value: product.price * product.quantity,
      metadata: {
        ecommerce: {
          currency: 'EUR',
          value: product.price * product.quantity,
          items: [{
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: product.quantity
          }]
        }
      }
    });
  },

  trackCheckoutBegin: (totalValue: number, itemCount: number) => {
    analyticsTracker.trackEvent({
      category: 'E-commerce',
      action: 'Begin Checkout',
      value: totalValue,
      metadata: {
        ecommerce: {
          currency: 'EUR',
          value: totalValue,
          item_count: itemCount
        }
      }
    });
  },

  trackPurchase: (transactionData: {
    transactionId: string;
    totalValue: number;
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
  }) => {
    analyticsTracker.trackEvent({
      category: 'E-commerce',
      action: 'Purchase',
      label: transactionData.transactionId,
      value: transactionData.totalValue,
      metadata: {
        ecommerce: {
          transaction_id: transactionData.transactionId,
          value: transactionData.totalValue,
          currency: 'EUR',
          items: transactionData.items.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity
          }))
        }
      }
    });
  }
};

// Content engagement tracking
export const contentTracking = {
  trackContentInteraction: (contentType: string, contentId: string, interactionType: string) => {
    analyticsTracker.trackEvent({
      category: 'Content',
      action: interactionType,
      label: `${contentType}: ${contentId}`
    });
  },

  trackVideoEngagement: (videoId: string, action: 'play' | 'pause' | 'complete', duration?: number) => {
    analyticsTracker.trackEvent({
      category: 'Video',
      action: action,
      label: videoId,
      value: duration
    });
  },

  trackDownload: (fileName: string, fileType: string) => {
    analyticsTracker.trackEvent({
      category: 'Download',
      action: fileType,
      label: fileName
    });
  },

  trackSocialShare: (platform: string, contentId: string) => {
    analyticsTracker.trackEvent({
      category: 'Social',
      action: 'Share',
      label: `${platform}: ${contentId}`
    });
  }
};

// Search tracking
export const searchTracking = {
  trackSiteSearch: (searchTerm: string, resultsCount: number) => {
    analyticsTracker.trackEvent({
      category: 'Search',
      action: 'Site Search',
      label: searchTerm,
      value: resultsCount
    });
  },

  trackSearchRefinement: (refinementType: string, refinementValue: string) => {
    analyticsTracker.trackEvent({
      category: 'Search',
      action: 'Refinement',
      label: `${refinementType}: ${refinementValue}`
    });
  }
};

// Error tracking
export const errorTracking = {
  trackError: (errorType: string, errorMessage: string, errorLocation?: string) => {
    analyticsTracker.trackEvent({
      category: 'Error',
      action: errorType,
      label: errorMessage,
      metadata: {
        error_location: errorLocation,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    });
  },

  trackAjaxError: (url: string, statusCode: number, errorMessage: string) => {
    analyticsTracker.trackEvent({
      category: 'Error',
      action: 'AJAX Error',
      label: `${url}: ${statusCode}`,
      metadata: {
        error_message: errorMessage,
        status_code: statusCode
      }
    });
  }
};

// Language tracking
export const languageTracking = {
  trackLanguageChange: (fromLanguage: string, toLanguage: string) => {
    analyticsTracker.trackEvent({
      category: 'Language',
      action: 'Change',
      label: `${fromLanguage} → ${toLanguage}`
    });
  },

  trackPreferredLanguage: (language: string) => {
    analyticsTracker.trackEvent({
      category: 'Language',
      action: 'Preference',
      label: language
    });
  }
};

// Custom dimension tracking for Luxembourg market
export const luxembourgMarketTracking = {
  trackCityInterest: (city: string) => {
    analyticsTracker.trackEvent({
      category: 'Luxembourg Market',
      action: 'City Interest',
      label: city
    });
  },

  trackPriceRangeInterest: (priceRange: string) => {
    analyticsTracker.trackEvent({
      category: 'Luxembourg Market',
      action: 'Price Range',
      label: priceRange
    });
  },

  trackCategoryInterest: (category: string) => {
    analyticsTracker.trackEvent({
      category: 'Luxembourg Market',
      action: 'Category Interest',
      label: category
    });
  }
};

// Create singleton instance
export const analyticsTracker = new AnalyticsTracker();

// Export convenience functions
export const trackEvent = (event: AnalyticsEvent) => analyticsTracker.trackEvent(event);
export const getUserBehaviorSummary = () => analyticsTracker.getUserBehaviorSummary();

// Extend window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
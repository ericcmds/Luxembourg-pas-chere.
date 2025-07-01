/**
 * Security Utilities for Payment Processing and Data Protection
 * Implements security best practices for e-commerce
 */

// Content Security Policy directives
export const cspDirectives = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
  'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
  'font-src': ["'self'", "https://fonts.gstatic.com"],
  'img-src': ["'self'", "data:", "https:", "blob:"],
  'connect-src': ["'self'", "https://www.google-analytics.com", "https://api.stripe.com"],
  'frame-src': ["'self'", "https://js.stripe.com", "https://hooks.stripe.com"],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': []
};

// Generate CSP header string
export function generateCSP(): string {
  return Object.entries(cspDirectives)
    .map(([directive, sources]) => `${directive} ${sources.join(' ')}`)
    .join('; ');
}

// Security headers for payment pages
export const securityHeaders = {
  'Content-Security-Policy': generateCSP(),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload'
};

// Input validation for payment forms
export const paymentValidation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  phone: (phone: string): boolean => {
    // Luxembourg phone number format
    const phoneRegex = /^(\+352)?[0-9]{6,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },
  
  postalCode: (code: string): boolean => {
    // Luxembourg postal code format (L-XXXX)
    const postalRegex = /^(L-)?[0-9]{4}$/;
    return postalRegex.test(code);
  },
  
  cardNumber: (number: string): boolean => {
    // Basic Luhn algorithm for credit card validation
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length < 13 || cleaned.length > 19) return false;
    
    let sum = 0;
    let isEven = false;
    
    for (let i = cleaned.length - 1; i >= 0; i--) {
      let digit = parseInt(cleaned[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },
  
  cvv: (cvv: string): boolean => {
    return /^[0-9]{3,4}$/.test(cvv);
  },
  
  expiryDate: (expiry: string): boolean => {
    const [month, year] = expiry.split('/').map(n => parseInt(n, 10));
    if (!month || !year) return false;
    
    if (month < 1 || month > 12) return false;
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }
    
    return true;
  }
};

// Sanitize user input to prevent XSS
export function sanitizeInput(input: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };
  
  return input.replace(/[&<>"'/]/g, (char) => map[char]);
}

// Encrypt sensitive data for local storage
export function encryptData(data: string, key: string): string {
  // Simple XOR encryption for demonstration
  // In production, use a proper encryption library
  let encrypted = '';
  for (let i = 0; i < data.length; i++) {
    encrypted += String.fromCharCode(
      data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
    );
  }
  return btoa(encrypted);
}

// Decrypt sensitive data from local storage
export function decryptData(encrypted: string, key: string): string {
  try {
    const data = atob(encrypted);
    let decrypted = '';
    for (let i = 0; i < data.length; i++) {
      decrypted += String.fromCharCode(
        data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
      );
    }
    return decrypted;
  } catch {
    return '';
  }
}

// Generate secure random tokens
export function generateSecureToken(length: number = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Rate limiting for API calls
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      this.attempts.set(identifier, validAttempts);
      return false;
    }
    
    validAttempts.push(now);
    this.attempts.set(identifier, validAttempts);
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const paymentRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

// Fraud detection utilities
export const fraudDetection = {
  // Check for suspicious patterns in form submission
  checkSuspiciousActivity: (data: any): { isSuspicious: boolean; reasons: string[] } => {
    const reasons: string[] = [];
    
    // Check for automated form filling (too fast)
    if (data.fillTime && data.fillTime < 3000) {
      reasons.push('Form filled too quickly');
    }
    
    // Check for copy-paste patterns
    if (data.pasteEvents > 5) {
      reasons.push('Excessive paste events');
    }
    
    // Check for VPN/Proxy usage (simplified check)
    if (data.timezone && !['Europe/Luxembourg', 'Europe/Brussels', 'Europe/Paris', 'Europe/Berlin'].includes(data.timezone)) {
      reasons.push('Unusual timezone for Luxembourg');
    }
    
    return {
      isSuspicious: reasons.length > 0,
      reasons
    };
  },
  
  // Generate device fingerprint for fraud prevention
  generateFingerprint: async (): Promise<string> => {
    const components = [
      navigator.userAgent,
      navigator.language,
      new Date().getTimezoneOffset().toString(),
      screen.width + 'x' + screen.height,
      screen.colorDepth.toString(),
      navigator.hardwareConcurrency?.toString() || 'unknown',
      navigator.platform
    ];
    
    const fingerprint = components.join('|');
    const msgUint8 = new TextEncoder().encode(fingerprint);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
};

// PCI DSS compliance helpers
export const pciCompliance = {
  // Mask credit card number for display
  maskCardNumber: (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\D/g, '');
    if (cleaned.length < 12) return cardNumber;
    
    const firstFour = cleaned.slice(0, 4);
    const lastFour = cleaned.slice(-4);
    const masked = '*'.repeat(cleaned.length - 8);
    
    return `${firstFour} ${masked} ${lastFour}`;
  },
  
  // Format card number with spaces
  formatCardNumber: (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\D/g, '');
    const groups = cleaned.match(/.{1,4}/g) || [];
    return groups.join(' ');
  },
  
  // Detect card type
  detectCardType: (cardNumber: string): string => {
    const cleaned = cardNumber.replace(/\D/g, '');
    
    const patterns = {
      visa: /^4/,
      mastercard: /^5[1-5]|^2[2-7]/,
      amex: /^3[47]/,
      discover: /^6(?:011|5)/,
      diners: /^3(?:0[0-5]|[68])/,
      jcb: /^35/
    };
    
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(cleaned)) {
        return type;
      }
    }
    
    return 'unknown';
  }
};

// Session security
export const sessionSecurity = {
  // Generate session ID
  generateSessionId: (): string => {
    return generateSecureToken(32);
  },
  
  // Check session validity
  isSessionValid: (sessionData: any): boolean => {
    if (!sessionData || !sessionData.id || !sessionData.expires) {
      return false;
    }
    
    const now = Date.now();
    return now < sessionData.expires;
  },
  
  // Refresh session
  refreshSession: (sessionData: any): any => {
    return {
      ...sessionData,
      expires: Date.now() + (30 * 60 * 1000) // 30 minutes
    };
  }
};
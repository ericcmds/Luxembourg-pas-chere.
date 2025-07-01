# Luxembourg Pas Chère Website

## Overview

This is a modern web application for Luxembourg Pas Chère, a website promoting a guide book for affordable living in Luxembourg. The application is built as a full-stack web solution featuring a React frontend with TypeScript, an Express.js backend server, and a Progressive Web App (PWA) implementation for enhanced mobile experience.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript and Vite for build tooling
- **UI Library**: Radix UI components with Tailwind CSS for styling
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Styling Approach**: Combination of Tailwind CSS, CSS modules, and custom CSS variables
- **PWA Features**: Service worker implementation with offline support and app manifest

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Module System**: ES modules (ESM) with CommonJS fallback for deployment
- **API Design**: RESTful endpoints for contact forms and newsletter subscriptions
- **Middleware**: CORS handling, rate limiting, and host bypass functionality
- **Static Assets**: Vite-built assets served from dist/public directory

### Build System
- **Development**: Vite dev server with HMR (Hot Module Replacement)
- **Production Build**: Vite build + esbuild for server bundling
- **Deployment**: Special CommonJS compatibility layer for Replit deployment

## Key Components

### Application Structure
- **MinimalAppSimplified**: Main application component with multilingual support (French, German, English)
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **SEO Optimization**: Meta tags, Open Graph, Twitter Cards, and JSON-LD structured data

### Core Features
- **Multilingual Interface**: Language switcher with content translations
- **Book Showcase**: Prominent display of the Luxembourg Pas Chère guide book
- **Contact Forms**: Contact and newsletter subscription with validation
- **FAQ Section**: Collapsible question/answer interface
- **Checkout Modal**: E-commerce functionality for book purchases
- **Mobile Menu**: Hamburger menu with slide-out navigation
- **Back to Top**: Smooth scroll functionality

### Progressive Web App Features
- **Service Worker**: Caching strategies for offline functionality
- **Web App Manifest**: Installation support on mobile devices
- **Offline Page**: Custom offline experience when network is unavailable
- **Push Notifications**: Infrastructure ready for future implementation

## Data Flow

### Client-Side Flow
1. User visits the website → React app loads with language detection
2. User interacts with forms → Client-side validation with Zod schemas
3. Form submission → API calls to backend endpoints
4. Response handling → Success/error notifications via toast system
5. Navigation → Client-side routing without page refreshes

### Server-Side Flow
1. Express server starts → Middleware setup (CORS, rate limiting, static serving)
2. API endpoints registered → Contact and newsletter routes with validation
3. Data processing → In-memory storage for form submissions
4. Response → JSON responses with success/error status

### PWA Flow
1. Service worker registers → Caches critical assets for offline use
2. User goes offline → Service worker serves cached content
3. Background sync → Queues actions for when connection returns
4. App updates → Service worker handles version updates

## External Dependencies

### Frontend Dependencies
- **React Ecosystem**: React 18, React DOM, TypeScript support
- **UI Components**: Comprehensive Radix UI component library
- **Styling**: Tailwind CSS with custom theme configuration
- **Data Fetching**: TanStack React Query for async state management
- **Forms**: Hookform with Zod resolvers for validation
- **Icons**: Lucide React for consistent iconography

### Backend Dependencies
- **Server Framework**: Express.js with TypeScript support
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Database Driver**: Neon serverless PostgreSQL driver
- **Security**: CORS middleware and rate limiting
- **Session Management**: PostgreSQL session store ready for implementation

### Build Tools
- **Vite**: Modern build tool with optimized dev experience
- **esbuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **TypeScript**: Static type checking across the entire application

## Deployment Strategy

### Development Environment
- **Local Development**: Vite dev server with HMR on port 5173
- **Host Bypass**: Special middleware to handle Replit's host restrictions
- **Hot Reloading**: Automatic browser refresh on file changes
- **Error Overlay**: Runtime error modal for development debugging

### Production Deployment
- **Build Process**: Vite builds frontend, esbuild bundles server
- **Asset Optimization**: Minification, tree shaking, and code splitting
- **Service Worker**: Automatic copying of PWA assets to dist directory
- **Static Serving**: Express serves built assets from dist/public
- **Environment Variables**: DATABASE_URL required for PostgreSQL connection

### Replit-Specific Considerations
- **Host Restrictions**: Custom middleware to bypass Vite's host checking
- **Module Compatibility**: CommonJS fallback server for deployment compatibility
- **File Copying**: Special scripts to ensure PWA assets are properly deployed
- **CORS Configuration**: Permissive CORS setup for Replit's WebView environment

## Professional Standards Implementation

The website now implements comprehensive professional standards including:

### Performance Monitoring
- Real-time performance metrics tracking (FCP, LCP, CLS)
- Resource timing analysis for images, scripts, and CSS
- Web Vitals monitoring for Core Web Vitals compliance
- Component-level performance measurement

### SEO Optimization
- Enhanced structured data for Luxembourg market
- Local business schema implementation
- Multi-language SEO meta tags (FR, DE, EN)
- Luxembourg-specific keyword optimization
- Rich snippets for book and crowdfunding campaign

### Security Features
- Payment form validation with Luhn algorithm
- Input sanitization to prevent XSS attacks
- Rate limiting for payment attempts
- Fraud detection utilities
- PCI DSS compliance helpers
- Secure session management

### Mobile Optimization
- Device detection and adaptive content loading
- Touch gesture handling for swipe navigation
- Network-aware content adaptation
- PWA installation support
- Safe area insets for modern devices
- Hardware acceleration optimization

### Analytics Integration
- Comprehensive user behavior tracking
- E-commerce conversion tracking
- Content engagement metrics
- Luxembourg market-specific tracking
- Error and performance monitoring

## Changelog

Changelog:
- July 01, 2025. Initial setup
- July 01, 2025. Implemented professional standards: Performance monitoring, SEO optimization, security features, mobile optimization, and analytics integration

## User Preferences

Preferred communication style: Simple, everyday language.
/**
 * Luxembourg Pas Chere - Critical JavaScript
 * Critical JavaScript for initial page render
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize critical components
  initAccessibility();
  initServiceWorker();
  checkNetworkStatus();
  initPerformance();
});

/**
 * Initialize accessibility features
 */
function initAccessibility() {
  // Add focus styles for keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
  
  // Create screen reader announcer if not exists
  if (!document.getElementById('screen-reader-announcer')) {
    const announcer = document.createElement('div');
    announcer.id = 'screen-reader-announcer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'assertive');
    announcer.setAttribute('aria-atomic', 'true');
    document.body.appendChild(announcer);
  }
}

/**
 * Initialize service worker for PWA functionality
 */
function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
          
          // Handle service worker updates
          registration.addEventListener('updatefound', function() {
            const newWorker = registration.installing;
            
            newWorker.addEventListener('statechange', function() {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                showUpdateNotification();
              }
            });
          });
        })
        .catch(function(error) {
          console.error('ServiceWorker registration failed: ', error);
        });
      
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', function(event) {
        const data = event.data;
        
        if (data.type === 'CONTACT_SYNC_COMPLETE') {
          showSyncNotification('Kontaktformular', data.successCount, data.remainingCount);
        } else if (data.type === 'NEWSLETTER_SYNC_COMPLETE') {
          showSyncNotification('Newsletter', data.successCount, data.remainingCount);
        }
      });
    });
  }
}

/**
 * Show update notification when a new service worker is available
 */
function showUpdateNotification() {
  // Create notification container if not exists
  let notification = document.getElementById('update-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'update-notification';
    notification.className = 'update-notification';
    notification.innerHTML = `
      <div class="update-notification-content">
        <p>Es ist eine neue Version der Website verfügbar.</p>
        <button id="update-app" class="update-button">Jetzt aktualisieren</button>
        <button id="dismiss-update" class="dismiss-button">Später</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Add event listeners
    document.getElementById('update-app').addEventListener('click', function() {
      window.location.reload();
    });
    
    document.getElementById('dismiss-update').addEventListener('click', function() {
      notification.classList.remove('visible');
    });
  }
  
  // Show notification
  setTimeout(function() {
    notification.classList.add('visible');
  }, 1000);
}

/**
 * Show notification when background sync completes
 */
function showSyncNotification(type, successCount, remainingCount) {
  if (successCount <= 0) return;
  
  // Create notification container if not exists
  let notification = document.getElementById('sync-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'sync-notification';
    notification.className = 'sync-notification';
    document.body.appendChild(notification);
  }
  
  // Set notification content
  let message = `${successCount} ${type}-Daten wurden erfolgreich synchronisiert.`;
  
  if (remainingCount > 0) {
    message += ` ${remainingCount} stehen noch aus.`;
  }
  
  notification.innerHTML = `
    <div class="sync-notification-content">
      <p>${message}</p>
      <button class="dismiss-button">Schließen</button>
    </div>
  `;
  
  // Add event listener to dismiss button
  notification.querySelector('.dismiss-button').addEventListener('click', function() {
    notification.classList.remove('visible');
  });
  
  // Show notification
  notification.classList.add('visible');
  
  // Hide notification after 5 seconds
  setTimeout(function() {
    notification.classList.remove('visible');
  }, 5000);
}

/**
 * Check and monitor network status
 */
function checkNetworkStatus() {
  const updateNetworkStatus = function() {
    const isOnline = navigator.onLine;
    document.body.classList.toggle('is-offline', !isOnline);
    
    // Show offline banner if offline
    let offlineBanner = document.getElementById('offline-banner');
    
    if (!offlineBanner) {
      offlineBanner = document.createElement('div');
      offlineBanner.id = 'offline-banner';
      offlineBanner.className = 'offline-banner';
      offlineBanner.innerHTML = 'Sie sind offline. Einige Funktionen sind möglicherweise eingeschränkt.';
      document.body.insertBefore(offlineBanner, document.body.firstChild);
    }
    
    offlineBanner.classList.toggle('visible', !isOnline);
    
    // Announce status change to screen readers
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = isOnline 
        ? 'Sie sind wieder online. Alle Funktionen sind verfügbar.' 
        : 'Sie sind offline. Einige Funktionen sind möglicherweise eingeschränkt.';
    }
  };
  
  // Initial check
  updateNetworkStatus();
  
  // Add event listeners for online/offline events
  window.addEventListener('online', updateNetworkStatus);
  window.addEventListener('offline', updateNetworkStatus);
}

/**
 * Initialize performance optimizations
 */
function initPerformance() {
  // Remove loading screen once page is loaded
  const pageLoading = document.querySelector('.page-loading');
  if (pageLoading) {
    setTimeout(function() {
      pageLoading.classList.add('loaded');
      setTimeout(function() {
        pageLoading.remove();
      }, 300);
    }, 500);
  }
  
  // Lazy load non-critical resources
  if ('IntersectionObserver' in window) {
    // Lazy load CSS files
    const lazyStyles = document.querySelectorAll('link[rel="stylesheet"][data-lazy]');
    lazyStyles.forEach(function(link) {
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'style');
      link.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    });
    
    // Lazy load JavaScript files
    const lazyScripts = document.querySelectorAll('script[data-src]');
    lazyScripts.forEach(function(script) {
      script.src = script.getAttribute('data-src');
      script.removeAttribute('data-src');
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    document.querySelectorAll('link[rel="stylesheet"][data-lazy]').forEach(function(link) {
      link.setAttribute('rel', 'stylesheet');
    });
    
    document.querySelectorAll('script[data-src]').forEach(function(script) {
      script.src = script.getAttribute('data-src');
      script.removeAttribute('data-src');
    });
  }
  
  // Preconnect to important origins
  const origins = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];
  
  origins.forEach(function(origin) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Initialize mobile navigation
 */
function initMobileNavigation() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const overlay = document.querySelector('.mobile-menu-overlay');
  
  if (!menuToggle || !mobileMenu) return;
  
  // Create overlay if it doesn't exist
  if (!overlay) {
    const newOverlay = document.createElement('div');
    newOverlay.className = 'mobile-menu-overlay';
    document.body.appendChild(newOverlay);
  }
  
  menuToggle.addEventListener('click', function() {
    const isExpanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', !isExpanded);
    
    mobileMenu.classList.toggle('active');
    document.querySelector('.mobile-menu-overlay').classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Announce to screen readers
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = !isExpanded ? 'Mobiles Menü geöffnet' : 'Mobiles Menü geschlossen';
    }
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (
      mobileMenu.classList.contains('active') && 
      !mobileMenu.contains(e.target) && 
      !menuToggle.contains(e.target)
    ) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      document.querySelector('.mobile-menu-overlay').classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
  
  // Close menu with Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('active');
      document.querySelector('.mobile-menu-overlay').classList.remove('active');
      document.body.classList.remove('menu-open');
      
      // Return focus to toggle button
      menuToggle.focus();
    }
  });
}

/**
 * Initialize language selector
 */
function initLanguageSelector() {
  const languageButton = document.querySelector('.language-selector button');
  const languageDropdown = document.querySelector('.language-dropdown');
  
  if (!languageButton || !languageDropdown) return;
  
  languageButton.addEventListener('click', function(e) {
    e.preventDefault();
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    languageDropdown.classList.toggle('active');
    
    // Handle click outside
    const closeDropdown = function(event) {
      if (!languageButton.contains(event.target)) {
        languageButton.setAttribute('aria-expanded', 'false');
        languageDropdown.classList.remove('active');
        document.removeEventListener('click', closeDropdown);
      }
    };
    
    if (!expanded) {
      // Add click outside listener with a delay
      setTimeout(() => {
        document.addEventListener('click', closeDropdown);
      }, 0);
    } else {
      document.removeEventListener('click', closeDropdown);
    }
  });
  
  // Add keyboard support
  languageButton.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      this.setAttribute('aria-expanded', 'false');
      languageDropdown.classList.remove('active');
    } else if (e.key === 'ArrowDown' && this.getAttribute('aria-expanded') === 'true') {
      e.preventDefault();
      const firstLink = languageDropdown.querySelector('a');
      if (firstLink) firstLink.focus();
    }
  });
  
  // Add keyboard navigation within dropdown
  const languageLinks = languageDropdown.querySelectorAll('a');
  languageLinks.forEach(function(link, index) {
    link.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        languageButton.setAttribute('aria-expanded', 'false');
        languageDropdown.classList.remove('active');
        languageButton.focus();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const nextLink = languageLinks[index + 1] || languageLinks[0];
        nextLink.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prevLink = languageLinks[index - 1] || languageLinks[languageLinks.length - 1];
        prevLink.focus();
      }
    });
  });
}

/**
 * Initialize cookie consent
 */
function initCookieConsent() {
  // Check if user has already made a choice
  if (localStorage.getItem('cookie-consent')) {
    return;
  }
  
  const cookieBanner = document.querySelector('.cookie-banner');
  if (!cookieBanner) return;
  
  // Show cookie banner
  setTimeout(function() {
    cookieBanner.classList.add('active');
    
    // Announce to screen readers
    const announcer = document.getElementById('screen-reader-announcer');
    if (announcer) {
      announcer.textContent = 'Cookie-Einwilligung erforderlich. Bitte treffen Sie eine Auswahl.';
    }
  }, 1000);
  
  // Handle cookie consent actions
  const acceptButton = cookieBanner.querySelector('.accept-cookies');
  const essentialButton = cookieBanner.querySelector('.essential-cookies');
  
  if (acceptButton) {
    acceptButton.addEventListener('click', function() {
      localStorage.setItem('cookie-consent', 'all');
      cookieBanner.classList.remove('active');
    });
  }
  
  if (essentialButton) {
    essentialButton.addEventListener('click', function() {
      localStorage.setItem('cookie-consent', 'essential');
      cookieBanner.classList.remove('active');
    });
  }
}

/**
 * Register service worker if supported
 */
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(error) {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
}
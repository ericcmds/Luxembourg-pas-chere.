/**
 * Service Worker for Luxembourg Pas Chere Website
 * Provides offline support and caching for improved performance
 */

// Cache names
const CACHE_CORE = 'luxembourg-pas-chere-core-v1';
const CACHE_ASSETS = 'luxembourg-pas-chere-assets-v1';
const CACHE_PAGES = 'luxembourg-pas-chere-pages-v1';
const CACHE_API = 'luxembourg-pas-chere-api-v1';

// Resources to cache immediately on installation
const CORE_ASSETS = [
  '/',
  '/offline.html',
  '/css/critical.css',
  '/js/critical.js',
  '/manifest.json',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png'
];

// Assets to cache when they're requested
const CACHE_FIRST_EXTENSIONS = [
  '.css',
  '.js',
  '.woff2',
  '.woff',
  '.ttf',
  '.svg',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.webp',
  '.ico'
];

// Routes for API calls (network first)
const API_ROUTES = [
  '/api/'
];

// Install event - cache core assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_CORE)
      .then(cache => {
        console.log('[Service Worker] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Install error:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  const cacheWhitelist = [CACHE_CORE, CACHE_ASSETS, CACHE_PAGES, CACHE_API];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle caching strategy
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // For API requests - Network first, fallback to cache
  if (API_ROUTES.some(route => request.url.includes(route))) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }
  
  // For HTML pages - Network first with offline fallback
  if (request.headers.get('Accept').includes('text/html')) {
    event.respondWith(pageStrategy(request));
    return;
  }
  
  // For assets with cache-first extensions
  if (CACHE_FIRST_EXTENSIONS.some(ext => request.url.endsWith(ext))) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }
  
  // Default: Network first
  event.respondWith(networkFirstStrategy(request));
});

// Handle background sync events
self.addEventListener('sync', event => {
  console.log('[Service Worker] Background Sync:', event.tag);
  
  if (event.tag === 'sync-newsletter') {
    event.waitUntil(syncNewsletterData());
  } else if (event.tag === 'sync-contact') {
    event.waitUntil(syncContactData());
  }
});

// Cache-first strategy (for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache valid responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_ASSETS);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Cache first fetch failed:', error);
    
    // No specific fallback for assets
    return new Response('Network error occurred', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network-first strategy (for API and dynamic content)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_API);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Network first fetch failed, falling back to cache:', error);
    
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // No cached response for API calls
    return new Response('Network error occurred and no cache available', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Page strategy (for HTML requests)
async function pageStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_PAGES);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[Service Worker] Page fetch failed, falling back to cache:', error);
    
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If no cached version, show offline page
    console.log('[Service Worker] No cached page available, serving offline page');
    return caches.match('/offline.html');
  }
}

// Sync contact form data
async function syncContactData() {
  const contactData = await getStoredContactData();
  
  if (!contactData.length) {
    return;
  }
  
  console.log('[Service Worker] Syncing contact data:', contactData.length, 'items');
  
  // Process each stored contact form submission
  const successfulIds = [];
  
  for (const item of contactData) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item.data)
      });
      
      if (response.ok) {
        successfulIds.push(item.id);
      }
    } catch (error) {
      console.error('[Service Worker] Failed to sync contact item:', error);
    }
  }
  
  // Remove successfully synced items
  await Promise.all(successfulIds.map(id => removeStoredContactData(id)));
  
  console.log('[Service Worker] Contact sync complete, synced', successfulIds.length, 'items');
  
  // Notify clients about the sync
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => {
    client.postMessage({
      type: 'CONTACT_SYNC_COMPLETE',
      successCount: successfulIds.length,
      remainingCount: contactData.length - successfulIds.length
    });
  });
}

// Sync newsletter data
async function syncNewsletterData() {
  const newsletterData = await getStoredNewsletterData();
  
  if (!newsletterData.length) {
    return;
  }
  
  console.log('[Service Worker] Syncing newsletter data:', newsletterData.length, 'items');
  
  // Process each stored newsletter subscription
  const successfulIds = [];
  
  for (const item of newsletterData) {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item.data)
      });
      
      if (response.ok) {
        successfulIds.push(item.id);
      }
    } catch (error) {
      console.error('[Service Worker] Failed to sync newsletter item:', error);
    }
  }
  
  // Remove successfully synced items
  await Promise.all(successfulIds.map(id => removeStoredNewsletterData(id)));
  
  console.log('[Service Worker] Newsletter sync complete, synced', successfulIds.length, 'items');
  
  // Notify clients about the sync
  const clients = await self.clients.matchAll({ type: 'window' });
  clients.forEach(client => {
    client.postMessage({
      type: 'NEWSLETTER_SYNC_COMPLETE',
      successCount: successfulIds.length,
      remainingCount: newsletterData.length - successfulIds.length
    });
  });
}

// Get stored contact data from IndexedDB
function getStoredContactData() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in self)) {
      resolve([]);
      return;
    }
    
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = event => {
      console.error('[Service Worker] IndexedDB error:', event.target.error);
      resolve([]);
    };
    
    request.onsuccess = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contact-store')) {
        resolve([]);
        return;
      }
      
      const transaction = db.transaction('contact-store', 'readonly');
      const store = transaction.objectStore('contact-store');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      
      getAllRequest.onerror = () => {
        console.error('[Service Worker] Error getting stored contact data');
        resolve([]);
      };
    };
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contact-store')) {
        db.createObjectStore('contact-store', { keyPath: 'id' });
      }
      
      resolve([]);
    };
  });
}

// Remove stored contact data item
function removeStoredContactData(id) {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in self)) {
      resolve();
      return;
    }
    
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = event => {
      console.error('[Service Worker] IndexedDB error:', event.target.error);
      resolve();
    };
    
    request.onsuccess = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contact-store')) {
        resolve();
        return;
      }
      
      const transaction = db.transaction('contact-store', 'readwrite');
      const store = transaction.objectStore('contact-store');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => {
        resolve();
      };
      
      deleteRequest.onerror = () => {
        console.error('[Service Worker] Error removing contact data');
        resolve();
      };
    };
  });
}

// Get stored newsletter data from IndexedDB
function getStoredNewsletterData() {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in self)) {
      resolve([]);
      return;
    }
    
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = event => {
      console.error('[Service Worker] IndexedDB error:', event.target.error);
      resolve([]);
    };
    
    request.onsuccess = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('newsletter-store')) {
        resolve([]);
        return;
      }
      
      const transaction = db.transaction('newsletter-store', 'readonly');
      const store = transaction.objectStore('newsletter-store');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      
      getAllRequest.onerror = () => {
        console.error('[Service Worker] Error getting stored newsletter data');
        resolve([]);
      };
    };
    
    request.onupgradeneeded = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('newsletter-store')) {
        db.createObjectStore('newsletter-store', { keyPath: 'id' });
      }
      
      resolve([]);
    };
  });
}

// Remove stored newsletter data item
function removeStoredNewsletterData(id) {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in self)) {
      resolve();
      return;
    }
    
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = event => {
      console.error('[Service Worker] IndexedDB error:', event.target.error);
      resolve();
    };
    
    request.onsuccess = event => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('newsletter-store')) {
        resolve();
        return;
      }
      
      const transaction = db.transaction('newsletter-store', 'readwrite');
      const store = transaction.objectStore('newsletter-store');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => {
        resolve();
      };
      
      deleteRequest.onerror = () => {
        console.error('[Service Worker] Error removing newsletter data');
        resolve();
      };
    };
  });
}
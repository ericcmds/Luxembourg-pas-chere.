/**
 * Luxembourg Pas Chere - Service Worker
 * Provides offline functionality and background sync
 */

const CACHE_NAME = 'luxembourg-pas-chere-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache
const ASSETS_TO_CACHE = [
  '/',
  OFFLINE_URL,
  '/css/critical.css',
  '/css/styles.css',
  '/css/home.css',
  '/js/critical.js',
  '/js/main.js',
  '/images/logo.svg',
  '/images/book-cover.svg',
  '/images/hero-background.svg',
  '/images/about-image.svg',
  '/images/favicon.svg',
  '/images/press/rtl.svg',
  '/images/press/wort.svg',
  '/images/press/paperjam.svg',
  '/images/icons/icon-192x192.png',
  '/manifest.json'
];

// Install event - cache assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching app shell and assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker');
  
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
    .then(() => {
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }
  
  // Handle API requests
  if (event.request.url.includes('/api/')) {
    event.respondWith(networkFirstStrategy(event.request));
    return;
  }
  
  // HTML requests - network first with offline page fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(pageStrategy(event.request));
    return;
  }
  
  // For all other requests - cache first with network fallback
  event.respondWith(cacheFirstStrategy(event.request));
});

// Cache First Strategy
async function cacheFirstStrategy(request) {
  try {
    // Try to get from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, get from network
    const networkResponse = await fetch(request);
    
    // Clone the response
    const responseToCache = networkResponse.clone();
    
    // Cache the new response
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    
    // For image requests, return a placeholder if available
    if (request.destination === 'image') {
      return caches.match('/images/placeholder.svg')
        .then((placeholderResponse) => {
          return placeholderResponse || new Response('Image not available', {
            status: 404,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
    }
    
    // For other resources, return a simple error
    return new Response('Network error occurred', {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

// Network First Strategy
async function networkFirstStrategy(request) {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Clone the response
    const responseToCache = networkResponse.clone();
    
    // Cache the network response for future offline use
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, responseToCache);
    
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Fetch failed:', error);
    
    // If network fails, try to get from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, return an appropriate error
    return new Response(JSON.stringify({
      error: 'Network error occurred. You appear to be offline.'
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Page navigation strategy
async function pageStrategy(request) {
  try {
    // Try network first for pages
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.error('[Service Worker] Page fetch failed:', error);
    
    // If network fails, try to get from cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, return the offline page
    return caches.match(OFFLINE_URL);
  }
}

// Background sync for form submissions
self.addEventListener('sync', (event) => {
  console.log('[Service Worker] Background Sync:', event.tag);
  
  if (event.tag === 'sync-contact') {
    event.waitUntil(syncContactData());
  }
  
  if (event.tag === 'sync-newsletter') {
    event.waitUntil(syncNewsletterData());
  }
});

// Sync contact form data
async function syncContactData() {
  const contactData = await getStoredContactData();
  
  if (!contactData.length) {
    return;
  }
  
  let successCount = 0;
  let remainingCount = contactData.length;
  
  for (const data of contactData) {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        await removeStoredContactData(data.id);
        successCount++;
        remainingCount--;
      }
    } catch (error) {
      console.error('[Service Worker] Contact sync failed:', error);
    }
  }
  
  // Notify the client about the sync results
  if (successCount > 0) {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'CONTACT_SYNC_COMPLETE',
        successCount,
        remainingCount
      });
    });
  }
}

// Sync newsletter form data
async function syncNewsletterData() {
  const newsletterData = await getStoredNewsletterData();
  
  if (!newsletterData.length) {
    return;
  }
  
  let successCount = 0;
  let remainingCount = newsletterData.length;
  
  for (const data of newsletterData) {
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        await removeStoredNewsletterData(data.id);
        successCount++;
        remainingCount--;
      }
    } catch (error) {
      console.error('[Service Worker] Newsletter sync failed:', error);
    }
  }
  
  // Notify the client about the sync results
  if (successCount > 0) {
    const clients = await self.clients.matchAll();
    clients.forEach(client => {
      client.postMessage({
        type: 'NEWSLETTER_SYNC_COMPLETE',
        successCount,
        remainingCount
      });
    });
  }
}

// Get stored contact data from IndexedDB
function getStoredContactData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = () => {
      console.error('[Service Worker] IndexedDB open failed');
      resolve([]);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('contact-store')) {
        db.createObjectStore('contact-store', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('newsletter-store')) {
        db.createObjectStore('newsletter-store', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('contact-store', 'readonly');
      const store = transaction.objectStore('contact-store');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      
      getAllRequest.onerror = () => {
        console.error('[Service Worker] Get contact data failed');
        resolve([]);
      };
    };
  });
}

// Remove stored contact data from IndexedDB
function removeStoredContactData(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = () => {
      console.error('[Service Worker] IndexedDB open failed');
      resolve(false);
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('contact-store', 'readwrite');
      const store = transaction.objectStore('contact-store');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => {
        resolve(true);
      };
      
      deleteRequest.onerror = () => {
        console.error('[Service Worker] Delete contact data failed');
        resolve(false);
      };
    };
  });
}

// Get stored newsletter data from IndexedDB
function getStoredNewsletterData() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = () => {
      console.error('[Service Worker] IndexedDB open failed');
      resolve([]);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      if (!db.objectStoreNames.contains('newsletter-store')) {
        db.createObjectStore('newsletter-store', { keyPath: 'id' });
      }
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('newsletter-store', 'readonly');
      const store = transaction.objectStore('newsletter-store');
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        resolve(getAllRequest.result);
      };
      
      getAllRequest.onerror = () => {
        console.error('[Service Worker] Get newsletter data failed');
        resolve([]);
      };
    };
  });
}

// Remove stored newsletter data from IndexedDB
function removeStoredNewsletterData(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('luxembourg-pas-chere-db', 1);
    
    request.onerror = () => {
      console.error('[Service Worker] IndexedDB open failed');
      resolve(false);
    };
    
    request.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction('newsletter-store', 'readwrite');
      const store = transaction.objectStore('newsletter-store');
      const deleteRequest = store.delete(id);
      
      deleteRequest.onsuccess = () => {
        resolve(true);
      };
      
      deleteRequest.onerror = () => {
        console.error('[Service Worker] Delete newsletter data failed');
        resolve(false);
      };
    };
  });
}

// Listen for push notifications
self.addEventListener('push', (event) => {
  let notificationData = {};
  
  try {
    notificationData = event.data.json();
  } catch (e) {
    notificationData = {
      title: 'Nouvelle notification',
      message: event.data ? event.data.text() : 'No data'
    };
  }
  
  const title = notificationData.title || 'Luxembourg Pas Chère';
  const options = {
    body: notificationData.message || 'Vous avez une nouvelle notification',
    icon: '/images/icons/icon-192x192.png',
    badge: '/images/icons/icon-96x96.png',
    data: notificationData.data || {},
    actions: notificationData.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const urlToOpen = event.notification.data.url || '/';
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if a window is already open
      for (const client of clientList) {
        if (client.url.includes(urlToOpen) && 'focus' in client) {
          return client.focus();
        }
      }
      // If no window is open, open a new one
      if (self.clients.openWindow) {
        return self.clients.openWindow(urlToOpen);
      }
    })
  );
});
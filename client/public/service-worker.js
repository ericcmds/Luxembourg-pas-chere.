// Service Worker for Luxembourg Pas Chère
const CACHE_NAME = 'luxembourg-pas-chere-v1';
const OFFLINE_URL = '/offline.html';

// Assets to cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/styles.css',
  '/css/home.css',
  '/js/main.js',
  '/images/logo.png',
  '/images/hero.jpg',
  '/images/book-cover.jpg',
  // Add more assets as needed
];

// Install event - Cache initial assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching app shell and content');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  const currentCaches = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      })
      .then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache or network
self.addEventListener('fetch', event => {
  // Skip for non-GET requests and browser extensions
  if (event.request.method !== 'GET' || event.request.url.startsWith('chrome-extension://')) {
    return;
  }
  
  // For API requests, use network first, then fallback to offline page
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .catch(error => {
          console.log('API fetch failed; returning offline page instead.', error);
          return caches.match(OFFLINE_URL);
        })
    );
    return;
  }
  
  // For page navigations, use network first, then cache, then offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Cache the latest version of the page
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
          });
          return response;
        })
        .catch(error => {
          console.log('Navigation fetch failed; returning cached page or offline page', error);
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }
  
  // For other assets, use cache first, then network
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Return cached response if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise, go to network
        return fetch(event.request)
          .then(response => {
            // Return immediately and cache in the background
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Cache the new resource
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            
            return response;
          });
      })
  );
});
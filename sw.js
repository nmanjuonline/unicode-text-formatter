/* ==========================================================================
   Unicode Text Formatter - Service Worker
   Provides full offline functionality, asset caching, and fast loading.
   ========================================================================== */

const CACHE_NAME = 'unicode-text-formatter-v1';

// Static assets to precache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './jquery-3.7.1.min.js',
  './manifest.webmanifest',
  './manifest.json',
  './favicon.ico',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32x32.png',
  './icons/favicon-16x16.png'
];

// Install: Precache core shell & assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate: Clean up old cache versions & take immediate control
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch: Stale-While-Revalidate for app assets, Cache-First for web fonts
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (!url.protocol.startsWith('http')) return;

  // Strategy for Google Fonts (fonts.googleapis.com, fonts.gstatic.com)
  if (url.origin.includes('fonts.googleapis.com') || url.origin.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        const cached = await cache.match(request);
        if (cached) return cached;

        try {
          const networkResponse = await fetch(request);
          if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (err) {
          return cached || Response.error();
        }
      })
    );
    return;
  }

  // Strategy for app assets (same origin)
  event.respondWith(
    caches.match(request).then(async (cachedResponse) => {
      // Background network fetch to refresh cache (Stale-While-Revalidate)
      const fetchPromise = fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If offline and navigating to a page, serve index.html shell
          if (request.mode === 'navigate') {
            return caches.match('./index.html');
          }
          return null;
        });

      // Return cached version immediately if available, otherwise wait for network
      return cachedResponse || fetchPromise;
    })
  );
});

// Listen for message events (e.g. skipWaiting trigger from UI)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

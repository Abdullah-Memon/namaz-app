// Service Worker for Namaz PWA
const CACHE_VERSION = 'namaz-v1';
const RUNTIME_CACHE = 'namaz-runtime-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/index.css',
  '/src/theme.css',
  '/manifest.json'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      console.log('Cache installation failed, continuing...');
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_VERSION && cacheName !== RUNTIME_CACHE) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome extensions
  if (event.request.url.includes('chrome-extension')) {
    return;
  }

  // Handle API requests (network first with cache fallback)
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(RUNTIME_CACHE);
            cache.then((c) => c.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => {
          return caches.match(event.request).then((response) => {
            return response || new Response('Network error', { status: 503 });
          });
        })
    );
    return;
  }

  // Handle navigation requests (cache first, fallback to network)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return (
          response ||
          fetch(event.request)
            .then((response) => {
              return caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(event.request, response.clone());
                return response;
              });
            })
            .catch(() => {
              return caches.match(OFFLINE_URL);
            })
        );
      })
    );
    return;
  }

  // Handle static assets (cache first)
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((response) => {
          if (response.ok) {
            return caches.open(RUNTIME_CACHE).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          }
          return response;
        })
      );
    })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(syncData());
  }
});

async function syncData() {
  try {
    // Sync any pending requests when back online
    const cache = await caches.open(RUNTIME_CACHE);
    const requests = await cache.keys();
    
    for (const request of requests) {
      try {
        const response = await fetch(request);
        if (!response.ok) throw new Error(`Failed to sync ${request.url}`);
        // Update cache with successful response
        await cache.put(request, response);
      } catch (error) {
        console.log(`Sync failed for ${request.url}:`, error);
      }
    }
  } catch (error) {
    console.error('Background sync error:', error);
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Namaz notification',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'namaz-notification',
    requireInteraction: true
  };

  event.waitUntil(
    self.registration.showNotification('Namaz', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if not already open
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});

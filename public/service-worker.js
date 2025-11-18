const CACHE_NAME = 'bycrib-cache-v1';

// Defina aqui tudo que deve ficar disponível offline
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/manifest.json',
  '/src/assets/base.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Cache-first strategy
      return response || fetch(event.request);
    })
  );
});

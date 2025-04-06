const CACHE_NAME = 'verificador-precios-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/icon-192x192.png',
  '/icon-512x512.png',
  'https://servando-guardado.github.io/verificador-precios/productos.csv' // Cachear el archivo CSV
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
const CACHE_NAME = 'verificador-precios-v1';
const urlsToCache = [
  '/',
  'https://servando-guardado.github.io/verificador-precios/index.html',
  'https://servando-guardado.github.io/verificador-precios/icon-144x144.png',
  'https://servando-guardado.github.io/verificador-precios/icon-192x192.png',
  'https://servando-guardado.github.io/verificador-precios/icon-512x512.png',
  'https://servando-guardado.github.io/verificador-precios/productos.csv' // Cachear el archivo CSV
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(function(error) {
        console.error('Failed to cache:', error);
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
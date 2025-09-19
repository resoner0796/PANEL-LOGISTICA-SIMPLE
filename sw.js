const CACHE_NAME = 'panel-logistica-v3'; // Versión actualizada de la caché
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './iconolog-192.png',
  './iconolog-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Precaching files...');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(keyList.map(key => {
        if (key !== CACHE_NAME) {
          console.log('Removing old cache:', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request))
  );
});

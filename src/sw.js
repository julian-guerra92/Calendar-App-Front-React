import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { clientsClaim } from 'workbox-core';

cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
self.skipWaiting();
clientsClaim();

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING')
    self.skipWaiting()
})

self.addEventListener('install', (event) => {
  console.log('instalando');
})

const apiOfflineFallbacks = [
  'http://localhost:3000/api/auth/renew',
  'http://localhost:3000/api/events'
]

self.addEventListener('fetch', (event) => {
  // if (event.request.url !== 'http://localhost:3000/api/auth/renew') return;
  if (!apiOfflineFallbacks.includes(event.request.url)) return;
  const resp = fetch(event.request)
    .then(response => {
      if (!response) {
        return caches.match(event.request);
      }
      //Guardar en caché la respuesta
      caches.open('cache-dynamic').then(cache => {
        cache.put(event.request, response);
      })
      return response.clone();
    })
    .catch(err => {
      console.log('offlinea response');
      return caches.match(event.request);
    })
  event.respondWith(resp);
})
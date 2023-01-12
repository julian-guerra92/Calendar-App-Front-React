importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);
workbox.loadModule('workbox-background-sync');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, NetworkOnly } = workbox.strategies;
const { BackgroundSyncPlugin } = workbox.backgroundSync;


const cacheFirst = [
   'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css',
   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
]

registerRoute(
   ({ request, url }) => {
      if (cacheFirst.includes(url.href)) return true;
      return false;
   },
   new CacheFirst()
)

/*
Implementación de referencia:

registerRoute(
   new RegExp('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css'),
   new CacheFirst()
)

registerRoute(
   new RegExp('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'),
   new CacheFirst()
)
*/

const chacheNetworkFirts = [
   '/api/auth/renew',
   '/api/events'
]

registerRoute(
   ({ request, url }) => {
      if (chacheNetworkFirts.includes(url.pathname)) return true;
      return false;
   },
   new NetworkFirst()
)

/*
Implementación de referencia:

registerRoute(
   new RegExp('http://localhost:3000/api/auth/renew'),
   new NetworkFirst()
)

registerRoute(
   new RegExp('http://localhost:3000/api/events'),
   new NetworkFirst()
)
*/


//Posteor Offline
const bgSyncPlugin = new BackgroundSyncPlugin('data-offline', {
   maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

registerRoute(
   new RegExp('http://localhost:3000/api/events'),
   new NetworkOnly({
      plugins: [bgSyncPlugin],
   }),
   'POST'
)

registerRoute(
   new RegExp('http://localhost:3000/api/events/'),
   new NetworkOnly({
      plugins: [bgSyncPlugin],
   }),
   'PUT'
)

registerRoute(
   new RegExp('http://localhost:3000/api/events/'),
   new NetworkOnly({
      plugins: [bgSyncPlugin],
   }),
   'DELETE'
)
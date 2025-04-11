// self.addEventListener('fetch', (event) => {
//   const request = event.request
//   if (request.url.includes('tile.openstreetmap.org')) {
//     event.respondWith(
//       caches.open('ol-tiles-cache').then((cache) => {
//         return cache.match(request).then((response) => {
//           return (
//             response ||
//             fetch(request).then((networkResponse) => {
//               cache.put(request, networkResponse.clone())
//               return networkResponse
//             })
//           )
//         })
//       })
//     )
//   }
// })

// const CACHE_NAME = 'ol-tiles-cache';

// self.addEventListener('install', (event) => {
//   console.log('[SW] Installed');
//   self.skipWaiting();
// });

// self.addEventListener('activate', (event) => {
//   console.log('[SW] Activated');
// });

// self.addEventListener('fetch', (event) => {
//   const { request } = event;
//   const url = request.url;

//   if (url.includes('tile.openstreetmap.org')) {
//     event.respondWith(
//       caches.open(CACHE_NAME).then(async (cache) => {
//         const cached = await cache.match(request);
//         if (cached) return cached;

//         const response = await fetch(request);
//         cache.put(request, response.clone());
//         return response;
//       })
//     );
//   }
// });

import { STATIC_CACHE } from './caches';

/*
  When service worker activates, clear out all caches except the
  static assets loaded
*/
function activate(event) {
  if (DEBUG) {
    console.log('[SW] Activate event');
  }

  event.waitUntil(
    global.caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName.indexOf(STATIC_CACHE) === 0) {
            return null;
          }

          return global.caches.delete(cacheName);
        })
      );
    })
  );
}

export default activate;

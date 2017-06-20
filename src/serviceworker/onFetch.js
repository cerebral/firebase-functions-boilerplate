import { STATIC_CACHE, OTHER_CACHE } from './caches';

function onFetch(event) {
  const request = event.request;
  const requestUrl = new URL(request.url);

  // Ignore non GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW] Ignore non GET request ${request.method}`);
    }
    return;
  }

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW] Ignore difference origin ${requestUrl.origin}`);
    }
    return;
  }

  /*
    Grab the cached resource or fetch it and then put into cache
  */
  const resource = global.caches.match(request).then(response => {
    if (response && requestUrl.href.match(/\.js$/)) {
      if (DEBUG) {
        console.log(`[SW] fetch SCRIPT ${requestUrl.href} from cache`);
      }

      return response;
    } else if (response && DEBUG) {
      console.log(`[SW] fetch PAGE in background ${requestUrl.href}`);
    }

    return (
      response ||
      fetch(request).then(response => {
        const cachedResponse = response.clone();

        global.caches
          .open(requestUrl.href.match(/\.js$/) ? STATIC_CACHE : OTHER_CACHE)
          .then(cache => {
            return cache.put(request, cachedResponse);
          });

        return response;
      })
    );
  });

  event.respondWith(resource);
}

export default onFetch;

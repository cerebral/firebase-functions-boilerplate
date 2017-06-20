import { OTHER_CACHE } from './caches';

/*
  Example of message passed from client to reset the cache
*/
function message(event) {
  const message = JSON.parse(event.data);

  switch (message.type) {
    case 'reset':
      if (DEBUG) {
        console.log('[SW] Cache has been reset!');
      }
      return global.caches.delete(OTHER_CACHE);
    default:
      break;
  }
}

export default message;

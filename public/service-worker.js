const FILES_TO_CACHE = [
    '/',
    '/assets/css/styles.css',
    '/index.html',
    '/dist/manifest.json',
    '/dist/bundle.js',
    '/dist/icon_72x72.png',
    '/dist/icon_96x96.png',
    '/dist/icon_128x128.png',
    '/dist/icon_144x144.png',
    '/dist/icon_152x152.png',
    '/dist/icon_192x192.png',
    '/dist/icon_384x384.png',
    '/dist/icon_512x512.png',
  ];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

//cache files
self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
});

//removes all old cache data
self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });
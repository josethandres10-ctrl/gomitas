// service-worker.js - caché básico para PWA (cache-first para assets estáticos)
const CACHE_NAME = 'el-vaiven-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/stylesss.css',
  '/app.js',
  '/manifest.json',
  '/icono.png'
];

// Instalación: cachear assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar caches antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

// Fetch: estrategia cache-first para assets, fallback a network
self.addEventListener('fetch', event => {
  const req = event.request;
  // Solo manejar GET
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;
      return fetch(req).then(networkRes => {
        // opcional: cachear respuestas navigations and same-origin assets
        if (networkRes && networkRes.status === 200 && req.url.startsWith(self.location.origin)) {
          const respClone = networkRes.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(req, respClone);
          });
        }
        return networkRes;
      }).catch(() => {
        // fallback: si es navegación, devolver index.html del cache
        if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
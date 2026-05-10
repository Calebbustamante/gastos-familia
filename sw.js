const CACHE_NAME = 'gastos-familiar-v1';

const STATIC_ASSETS = [
  '/gastos-familia/',
  '/gastos-familia/index.html',
  '/gastos-familia/manifest.json',
  '/gastos-familia/icons/icon-192.png',
  '/gastos-familia/icons/icon-512.png',
];

const CDN_ASSETS = [
  'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.8.1/prop-types.min.js',
  'https://cdn.jsdelivr.net/npm/recharts@2.8.0/umd/Recharts.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js',
];

/* ── Install: cache everything ── */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching static assets...');
      return Promise.allSettled([
        cache.addAll(STATIC_ASSETS),
        ...CDN_ASSETS.map(url => fetch(url).then(res => cache.put(url, res)).catch(() => {}))
      ]);
    }).then(() => self.skipWaiting())
  );
});

/* ── Activate: delete old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: cache-first for assets, network-first for others ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Don't cache non-GET or chrome-extension
  if (event.request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // EmailJS API calls — always network
  if (url.hostname.includes('emailjs')) {
    event.respondWith(fetch(event.request).catch(() => new Response('offline', { status: 503 })));
    return;
  }

  // Cache-first for CDN and static assets
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

/* ── Background sync: notify when back online ── */
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') self.skipWaiting();
});

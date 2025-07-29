const CACHE_NAME = 'btadijital-v1.1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.min.css',
  '/script.min.js',
  '/critical.css',
  '/btadijital.webp',
  '/btadijital.jpg',
  '/about.html',
  '/services.html',
  '/blog.html',
  '/contact.html',
  '/influencer.html',
  '/dashboard.html',
  '/coming-soon.html',
  '/404.html',
  '/instagram-logo.svg',
  '/tiktok-logo.svg',
  '/facebook-logo.svg',
  '/manifest.json',
  '/sitemap.xml',
  '/robots.txt'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 
// Garde l'app utilisable hors connexion. Les fichiers de l'app sont pris sur le réseau en priorité,
// pour que chaque mise à jour publiée soit visible à la prochaine ouverture.
const CACHE = 'dqte-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const keep = res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; };
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(keep).catch(() => caches.match(req).then(m => m || caches.match('./index.html'))));
    return;
  }
  // SDK Firebase et polices : versions figées, on les sert depuis le cache dès qu'elles y sont
  if (url.host === 'www.gstatic.com' || url.host === 'fonts.googleapis.com' || url.host === 'fonts.gstatic.com') {
    e.respondWith(caches.match(req).then(m => m || fetch(req).then(keep)));
  }
});

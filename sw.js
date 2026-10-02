/* FarbenScanner Service Worker – v1.1.2 */

const CACHE_NAME = "farbenscanner-v1.1.2";

const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/favicon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );

  // Neuen Service Worker sofort aktivieren
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET") return;

  // HTML, CSS und JS immer zuerst aus dem Netzwerk
  if (
    req.destination === "document" ||
    req.url.endsWith(".html") ||
    req.url.endsWith(".js") ||
    req.url.endsWith(".css") ||
    req.url.endsWith("manifest.json")
  ) {
    event.respondWith(
      fetch(req, { cache: "no-cache" })
        .then((res) => {
          const clone = res.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(req, clone);
          });

          return res;
        })
        .catch(() =>
          caches.match(req).then(
            (cached) => cached || caches.match("./index.html")
          )
        )
    );

    return;
  }

  // Bilder und andere Dateien aus dem Cache
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;

      return fetch(req).then((res) => {
        const clone = res.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(req, clone);
        });

        return res;
      });
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

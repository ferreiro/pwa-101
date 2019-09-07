const cacheName = 'version-1'
const criticalAssets = ['style.css', 'bundle.js', 'index.html']

self.addEventListener('install', (event) => {
    event.waitUntil(cacheAssetsPromise)
})

const cacheAssetsPromise = caches.open(cacheName)
   .then((cache) => {
        cacheNoCriticalAssets(cache)

       return cacheCriticalAssets(cache)
   })

const cacheNoCriticalAssets = (cache) => {
    cache.add('./foo.css')
}

const cacheCriticalAssets = (cache) => cache.addAll(criticalAssets)


const cacheNameVersion = 'resources-v1'

self.addEventListener('install', () => {
    caches.open(cacheNameVersion)
        .then((cache) => {
            // Add assets to the service worker cache
            // Do something cool with the cache
        })
        .catch((error) => {
            // Error with the cache :/
        })
})

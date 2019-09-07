const cacheVersion = 'version-1'

const cleanedOldCacheAssets = () => (
    caches.keys()
)

self.addEventListener('install', (event) => {
    // Add assets to the cache...
})

self.addEventListener('activate', (event) => {
    // Removing cached assets...
    event.waitUntil(cleanedOldCacheAssets)
})
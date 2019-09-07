const cacheNameVersion = 'resources-v1'

self.addEventListener('install', (event) => {
    caches.open(cacheNameVersion)
        .then((cache) => {
            console.log('Cached is opened!', cache)
            // Do cool stuff with the cache
        })
        .catch((error) => {
            console.log('Cached has error', error)
        })
})
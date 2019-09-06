'use strict'

const cacheVersion = 'version-2'
const criticalAssets = ['/client.bundle.js', '/index.html']

self.addEventListener('install', (event) => {
    event.waitUntil(cacheAssets())
})

function cacheAssets() {
    return caches.open(cacheVersion)
        .then((cache) => {
            cacheNoCriticalAssets(cache)

            return cacheCriticalAssets(cache)
        })
}

function cacheCriticalAssets (cache) {
    return cache.addAll(criticalAssets)
}

function cacheNoCriticalAssets(cache) {
    cache.add('./foo.css')
    cache.add('./images/crystal_fighters.jpg')
}

function fetchImageOrFallback(fetchEvent) {
    return caches.match('./images/crystal_fighters.jpg', {
        cacheName: cacheVersion
    })

    // return fetch(fetchEvent.request, {
    //     mode: 'no-cors'
    // })
    // .then(({ response })) => {
    //     if (!response.ok) {
    //         return caches.match('')
    //     }
    // }
}

self.addEventListener('fetch', (event) => {
    const acceptHeader = event.request.headers.get('accept')
    const requestUrl = new URL(event.request.url)

    console.log('acceptHeader', acceptHeader)
    console.log('requestUrl', requestUrl)

    return event.respondWith(
        fetchImageOrFallback(event)
    )

    if (acceptHeader.indexOf('image') === 0) {
        if (requestUrl.pathname.indexOf('/images/') === 0) {
            event.respondWith(
                fetchImageOrFallback(event)
            )
        }
    }
})

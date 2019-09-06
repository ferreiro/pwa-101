'use strict'

const cacheVersion = 'version-1'
const PLADEHOLDER_IMAGE = '/images/placeholder.jpg'
const criticalAssets = [
    '/index.html',
    '/client.bundle.js',
    '/manifest.json',
    PLADEHOLDER_IMAGE,
    '/normalize.css'
]

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
}

function fetchHomePageOrFallback(fetchEvent) {
    return caches.match('/index.html', {
        cacheName: cacheVersion
    })
}

function fetchManifestOrFallback(fetchEvent) {
    return caches.match('/manifest.json', {
        cacheName: cacheVersion
    })
}

function fetchNormalizeOrFallback(fetchEvent) {
    return caches.match('/normalize.css', {
        cacheName: cacheVersion
    })
}

function fetchJavascriptOrFallback(fetchEvent) {
    return caches.match('/client.bundle.js', {
        cacheName: cacheVersion
    })
}

function fetchImageOrFallback(fetchEvent) {
    return fetch(fetchEvent.request, {
        mode: 'no-cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error('Can not download image from server')
            }

            // Cache in Background the image
            caches.open(cacheVersion).then(function(cache) {
                cache.put(fetchEvent.request, response)
            })

            // We need to duplicate, otherwise it says the response was consumed twice
            return response.clone()
        })
        .catch(() => {
            // NB: Try to retun cached image...
            return caches.match(event.request).catch(function() {
                // NB: No cache image... Return placeholder
                return caches.match(PLADEHOLDER_IMAGE, {
                    cacheName: cacheVersion
                })
            })
        })
}

self.addEventListener('fetch', (event) => {
    const acceptHeader = event.request.headers.get('accept')
    const requestUrl = new URL(event.request.url)

    // console.log('acceptHeader', acceptHeader)
    // console.log('requestUrl', requestUrl)

    if (acceptHeader.includes('html')) {
        return event.respondWith(
            fetchHomePageOrFallback(event)
        )
    }

    if (requestUrl.pathname.includes('/manifest.json')) {
        return event.respondWith(
            fetchManifestOrFallback(event)
        )
    }

    if (requestUrl.pathname.includes('normalize.css')) {
        return event.respondWith(
            fetchNormalizeOrFallback(event)
        )
    }

    if (requestUrl.pathname.includes('/client.bundle.js')) {
        return event.respondWith(
            fetchJavascriptOrFallback(event)
        )
    }

    if (acceptHeader.includes('image')) {
        return event.respondWith(
            fetchImageOrFallback(event)
        )
    }

    // return event.respondWith(
    //     fetchImageOrFallback(event)
    // )

    // if (acceptHeader.indexOf('image') === 0) {
    //     if (requestUrl.pathname.indexOf('/images/') === 0) {
    //         event.respondWith(
    //             fetchImageOrFallback(event)
    //         )
    //     }
    // }
})

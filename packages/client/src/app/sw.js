'use strict'

const cacheVersion = 'version-1'
const PLADEHOLDER_IMAGE = '/images/placeholder.jpg'
const MAP_PLADEHOLDER_IMAGE = '/images/map-placeholder.jpg'
const criticalAssets = [
    '/index.html',
    '/client.bundle.js',
    '/manifest.json',
    PLADEHOLDER_IMAGE,
    MAP_PLADEHOLDER_IMAGE,
    '/normalize.css'
]

self.addEventListener('install', (event) => {
    event.waitUntil(cacheAssets())
})

self.addEventListener('fetch', (event) => {
    const acceptHeader = event.request.headers.get('accept')
    const requestUrl = new URL(event.request.url)

    console.log('acceptHeader', acceptHeader)
    console.log('requestUrl', requestUrl)

    if (requestUrl.href.includes('https://maps.googleapis.com/maps/api/staticmap?')) {
        return event.respondWith(
            fetchStaticMapPageOrFallback(event)
        )
    }

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

// TODO: Refactor this into a more generic function
// that can be re-used for other critical resources
function fetchHomePageOrFallback(fetchEvent) {
    return caches.match('/index.html', {
        cacheName: cacheVersion
    })
}

// TODO: Refactor this into a more generic function
// that can be re-used for other critical resources
function fetchStaticMapPageOrFallback(fetchEvent) {
    return fetch(fetchEvent.request)
        .catch((error) => {
            return caches.match(MAP_PLADEHOLDER_IMAGE, {
                cacheName: cacheVersion
            })
        })
    // return caches.match(fetchEvent.request, {
    //     cacheName: cacheVersion
    // }).catch(() => {
    //     return fetch(fetchEvent.request)
    // }).then((response) => {
    //     return caches.open(cacheVersion).then((cache) => {
    //         cache.add(response)
    //     })
    // })
}

// TODO: Refactor this into a more generic function
// that can be re-used for other critical resources
function fetchManifestOrFallback(fetchEvent) {
    return caches.match('/manifest.json', {
        cacheName: cacheVersion
    })
}

// TODO: Refactor this into a more generic function
// that can be re-used for other critical resources
function fetchNormalizeOrFallback(fetchEvent) {
    return caches.match(fetchEvent.request)
}

// TODO: Refactor this into a more generic function
// that can be re-used for other critical resources
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

            // NB: Cache in Background the image
            caches.open(cacheVersion).then(function(cache) {
                cache.put(fetchEvent.request, response)
            })

            // NB: Duplicating response, since we can't reuse it
            // into two places.
            return response.clone()
        })
        .catch(() => {
            // NB: First try to retun cached image...
            return caches.match(fetchEvent.request).catch(function() {
                // NB: No cache image... Return placeholder
                return caches.match(PLADEHOLDER_IMAGE, {
                    cacheName: cacheVersion
                })
            })
        })
}

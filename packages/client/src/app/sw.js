'use strict'

const cacheVersion = 'version-1'
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
}

self.addEventListener('fetch', (event) => {
    caches.open(cacheVersion).then((cache) => {
        console.log('fetch::cache')
        console.log(cache)
    })

    console.log('I am intercepting network requests! ')

    const url = event.request.url

    console.log('Requested resource url: ', url)
})

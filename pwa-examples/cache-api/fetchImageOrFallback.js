function fetchImageOrFallback(fetchEvent) {
    return fetch(fetchEvent.request, {
        mode: 'no-cors'
    })
        .then((response) => {
            if (!response.ok) {
                throw Error('Can not download image from server')
            }

            return response
        })
        .catch(() => {
            // NB: Return placeholder. Image can't be downloaded...
            return caches.match(PLADEHOLDER_IMAGE, {
                cacheName: cacheVersion
            })
        })
}


self.addEventListener('fetch', (event) => {
    const acceptHeader = event.request.headers.get('accept')

    if (acceptHeader.includes('image')) {
        return event.respondWith(
            fetchImageOrFallback(event)
        )
    }
})
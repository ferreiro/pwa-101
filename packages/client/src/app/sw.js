'use strict'

console.log('I am a new service worker :)')

self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    console.group('fetch')
    console.log('event')
    console.log(event)
    console.log('url', url);
    console.groupEnd()
})

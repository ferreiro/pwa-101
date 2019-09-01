self.addEventListener('install', (event) => {
    console.log('Service worker is installed', event)
})

self.addEventListener('activate', (event) => {
    console.log('Service worker is activated', event)
})

self.addEventListener('fetch', (event) => {
    console.log('Service worker fetched', event)
})
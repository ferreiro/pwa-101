// const navigator = {
//     serviceWorker: {
//         register: () => {},
//     }
// }

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker')
        .then(registration => console.log('SW is registered', registration))
        .catch(error => console.log('SW failed to registered', error))
} else {
    // Browser does not support service worker
}
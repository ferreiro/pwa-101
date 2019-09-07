import artists from './__fixtures__/artists.json'

export const launchNotification = ({
    artistId,
    isEnabled,
}) => {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            const artist = artists[artistId]
            const title = isEnabled
                ? `✅ Notifications for ${artist.name} are activated!`
                : `❌ Deactivate ${artist.name} notifications!`
            const options = {
                body: 'You will be notified for this event',
                icon: '/images/pennapps_logo_pwa_192_192.png',
            }

            new Notification(title, options)
        })
    }
}

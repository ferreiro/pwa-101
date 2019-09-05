export const createArtistNotification = ({
    type,
    artistId,
}) => ({
    id: artistId,
    type,
    artistId: artistId,
    frequency: 'once',
    alertBefore: 3600,
})

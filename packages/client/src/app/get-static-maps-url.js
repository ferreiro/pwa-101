const GOOGLE_MAPS_PUBLIC_KEY = 'AIzaSyAiXJF6d7OzrMCOY5viYgWYCIAb07-n1ls'
const STATIC_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap'

export const getStaticMapsUrl = ({
    query,
    lat,
    long,
}) => {
    const zoom = 17
    const size = '600x300'

    return `${STATIC_MAP_URL}?center=${query}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:blue%7Clabel:S%7C${lat},${long}&key=${GOOGLE_MAPS_PUBLIC_KEY}`
}
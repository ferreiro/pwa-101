const GOOGLE_MAPS_PUBLIC_KEY = 'AIzaSyAiXJF6d7OzrMCOY5viYgWYCIAb07-n1ls'
const STATIC_MAP_URL = 'https://maps.googleapis.com/maps/api/staticmap'

export const getStaticMapsUrl = () => {
    const center = 'Unniversity+of+Pennsylvania'
    const zoom = 17
    const size = '600x300'

    return `${STATIC_MAP_URL}?center=${center}&zoom=${zoom}&size=${size}&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${GOOGLE_MAPS_PUBLIC_KEY}`
}
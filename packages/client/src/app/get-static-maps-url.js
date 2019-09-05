const GOOGLE_MAPS_PUBLIC_KEY = 'AIzaSyAiXJF6d7OzrMCOY5viYgWYCIAb07-n1ls'

export const getStaticMapsUrl = () => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=${GOOGLE_MAPS_PUBLIC_KEY}`
}
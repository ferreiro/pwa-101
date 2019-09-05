import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

export const debug = process.env === 'production'
    ? () => {}
    : console.log

import { PageLayout } from './components/PageLayout'
import { PageHome } from './components/PageHome'
import { PageArtist } from './components/PageArtist'
import { PageNotFound } from './components/PageNotFound'
import { PageNotifications } from './components/PageNotifications'
import { PageFavorites } from './components/PageFavorites'
import {
    PATH_ARTIST,
    PATH_HOME,
    PATH_NOTIFICATIONS,
    PATH_FAVORITES,
} from './constants/paths'

export const NOTIFICATION_ARTIST = 'notification/artist'
export const NOTIFICATION_PUSH = 'notification/push'

const DATE_FRIDAY = 'date/friday'
const DATE_SATURDAY = 'date/saturday'
const DATE_SUNDAY = 'date/sunday'

/**
 * Returns a human readable date
 */
export const DATE_MAPPER_TO_HUMAN_TIME = {
    [DATE_FRIDAY]: 'Friday 6 September',
    [DATE_SATURDAY]: 'Saturday 7 September',
    [DATE_SUNDAY]: 'Sunday 8 September'
}

const STAGE_ROCK_IN_RIO = 'building/rockInRio'

export const STAGE_MAPPER = {
    [STAGE_ROCK_IN_RIO]: {
        text: 'Rock in Rio',
        googleMapsUrl: 'Bla bla bla',
    }
}

if ('serviceWorker' in navigator) {
    debug('Trying to register a service worker yay!')
    navigator.serviceWorker.register('/static/sw.js')
        .then((registration) => {
            debug('registration', registration)
            // registration.showNotification('pene',{
            //     'body': 'Did you make a $1,000,000 purchase at Dr. Evil...',
            //     'icon': 'images/ccard.png',
            //     'vibrate': [200, 100, 200, 100, 200, 100, 400],
            //     'tag': 'request',
            //     'actions': [
            //         { 'action': 'yes', 'title': 'Yes', 'icon': 'images/yes.png' },
            //         { 'action': 'no', 'title': 'No', 'icon': 'images/no.png' }
            //     ]
            // })
        })
        .catch((error) => debug(error))
}

// state = {
//     // NB: List of arists that you like and wanna keep
//     // track of them
//     // NB2: Ideally this can be a Set, so we make sure
//     // we don't duplicate the arist lists.
//     // We use a dictionary, so we can access in constant
//     // time the artist who is favoited.
//     favorites: {
//         'jorge-ferreiro': true,
//     },

//     // NB: list of artist to get notifications 30 minutes
//     // before the concert starts.
//     notifications: {
//         "jorge-ferreiro": true,
//     }
// }

// onFavoriteArtist = (artistId) => {
//     // TODO: Check first if the artist exists in the list
//     // TODO: THen if not, add it, otherwise dont;
//     if (artistId in this.state.favorites) {
//         return
//     }

//     const favorites = {
//         ...this.state.favorites,
//         [artistId]: true,
//     }
    
//     this.setState({favorites})
// }

// onRemoveFavoriteArtist = (artistId) => {
//     if (!artistId in this.state.favorites) {
//         // SKIP: Artist does not exist...
//         return
//     }
    
//     const favorites = {
//         ...this.state.favorites
//     }

//     delete favorites[artistId]

//     this.setState({favorites})
// }

function App(props) {
    const artists = {
        'jorge-ferreiro': {
            id: 'jorge-ferreiro',
            name: 'Jorge Ferreiro',
            city: 'Madrid, Spain',
            country: '🇪🇸',
            // TODO: Add title of the talk...
            imageHero: '/static/images/jorge_ferreiro_at_pennapps.jpg',
            imageIcon: '',
            biography: 'This is my super biography<br /><br />Hi there!',
        },
        'venmo-232': {
            id: 'venmo-232',
            name: 'Venmo brothers',
            city: 'Madrid, Spain',
            country: '🇪🇸',
            imageHero: '/static/images/crystal_fighters.jpg',
            imageIcon: '',
            biography: 'This is my super biography<br /><br />Hi there!',
        }
    }

    const agenda = {
        '23424234': {
            id: '23424234',
            time: '5 PM',
            date: DATE_FRIDAY,
            stage: STAGE_ROCK_IN_RIO,
            artistId: 'venmo-232',
            purchaseUrl: 'eventbrite.com',
        },
        'wsfefwefweefewfe': {
            id: 'wsfefwefweefewfe',
            time: '6 PM',
            date: DATE_FRIDAY,
            stage: STAGE_ROCK_IN_RIO,
            artistId: 'venmo-232',
            purchaseUrl: 'eventbrite.com',
        },
        '3423423': {
            id: '3423423',
            time: '7 PM',
            date: DATE_FRIDAY,
            stage: STAGE_ROCK_IN_RIO,
            artistId: 'jorge-ferreiro',
            purchaseUrl: 'eventbrite.com',
        },
    }

    const findArtistStage = (artist) => {
        const artistId = artist.id
        const matchedAgendaItem = Object.values(agenda).find((agendaItem) =>
            agendaItem.artistId === artistId
        )

        return matchedAgendaItem.stage || ''
    }

    // TODO: Move into the state...
    let favorites = {
        'jorge-ferreiro': true,
        'venmo-232': true,
    }

    // TODO: Move into the state...
    let notifications = {
        'jorge-ferreiro': {
            type: NOTIFICATION_ARTIST,
            artistId: 'jorge-ferreiro',
            frequency: 'once',
            alertBefore: 3600,
        },
        'randomId': {
            type: NOTIFICATION_PUSH,
            frequency: 'once',
            alertBefore: 3600,
        },
        'jorge-ferreiro-23': {
            type: NOTIFICATION_ARTIST,
            artistId: 'jorge-ferreiro',
            frequency: 'once',
            alertBefore: 3600,
        },
        'jorge-ferreiro-234': {
            type: NOTIFICATION_ARTIST,
            artistId: 'jorge-ferreiro',
            frequency: 'once',
            alertBefore: 3600,
        },
    }

    const addFavoriteArtist = (artistId) => {
        debug('favoring an artist. yay!')

        const updatedFavorites = {
            ...favorites,
            // ...this.state.favorites,
            [artistId]: true,
        }
        
        favorites = updatedFavorites
        // this.setState({favorites})
    }

    const removeFavoriteArtist = (artistId) => {
        debug('Removing artist from favorites. yay!')

        if (!(artistId in favorites)) {
            // SKIP: Artist does not exist...
            return
        }

        const updatedFavorites = {
            ...favorites
        }

        delete updatedFavorites[artistId]

        favorites = updatedFavorites
    } 

    const onFavoriteArtist = (artistId) => {
        if (artistId in favorites) {
            return removeFavoriteArtist(artistId)
        }

        return addFavoriteArtist(artistId)
    } 

    const addNotificationArtist = (artistId) => {
        debug('adding notification artist. yay!')
    }

    const removeNotificationArtist = (artistId) => {
        debug('removing new artist. yay!')
    }

    const onNotifyArtist = (artistId) => {
        if (artistId in notifications) {
            return removeNotificationArtist(artistId)
        }

        return addNotificationArtist(artistId)
    }

    const withLayout = (Component, { props = {}, routeProps = {} }) => (
        <PageLayout
            title={props.title}
            routeProps={routeProps}
        >
            <Component
                {...routeProps}
                {...props}
            />
        </PageLayout>
    )

    return (
        <Switch>
            <Route
                path={PATH_HOME}
                exact
                render={(routeProps) => {
                    const props = {
                        title: 'Agenda',
                        agenda: agenda,
                        onFavoriteArtist: onFavoriteArtist,
                        onNotifyArtist: onNotifyArtist,
                        favorites,
                        notifications,
                        artists,
                    }

                    return withLayout(PageHome, { props, routeProps })
                }}
            />
            <Route
                path={`${PATH_ARTIST}/:id`}
                exact
                render={(routeProps) => {
                    const artistId = routeProps.match.params.id
                    const artist = artists[artistId] || {}

                    if (isEmpty(artist)) {
                        const props = {
                            
                        }

                        return withLayout(PageNotFound, { props, routeProps })
                    }

                    // const artist = artists[]
                    const props = {
                        artist,
                        title: artist.name,
                        // agenda: agenda,
                        onFavoriteArtist: onFavoriteArtist,
                        onNotifyArtist: onNotifyArtist,
                        favorites,
                        notifications,
                        artists,
                        findArtistStage,
                    }

                    return withLayout(PageArtist, { props, routeProps })
                }}
            />
            <Route
                path={PATH_NOTIFICATIONS}
                exact
                render={(routeProps) => {
                    const props = {
                        artists,
                        title: 'Notifications',
                        notifications,
                        onFavoriteArtist: onFavoriteArtist,
                        onNotifyArtist: onNotifyArtist,
                    }

                    return withLayout(PageNotifications, { props, routeProps })
                }}
            />
            <Route
                path={PATH_FAVORITES}
                exact
                render={(routeProps) => {
                    const props = {
                        artists,
                        title: 'Favorites',
                        favorites,
                        notifications,
                        onFavoriteArtist: onFavoriteArtist,
                        onNotifyArtist: onNotifyArtist,
                    }

                    return withLayout(PageFavorites, { props, routeProps })
                }}
            />
        </Switch>
    )
}

export default withRouter(App)

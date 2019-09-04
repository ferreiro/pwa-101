import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { PageLayout } from './components/PageLayout'
import { PageHome } from './components/PageHome'
import { PageArtist } from './components/PageArtist'
import { PageNotifications } from './components/PageNotifications'
import { PageFavorites } from './components/PageFavorites'
import {
    PATH_ARTIST,
    PATH_HOME,
    PATH_NOTIFICATIONS,
    PATH_FAVORITES,
} from './constants/paths'

if ('serviceWorker' in navigator) {
    console.log('Sap2 232')
    console.log('Trying to register a service worker yay!')
    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log('registration', registration)
            registration.showNotification('pene',{
                'body': 'Did you make a $1,000,000 purchase at Dr. Evil...',
                'icon': 'images/ccard.png',
                'vibrate': [200, 100, 200, 100, 200, 100, 400],
                'tag': 'request',
                'actions': [
                    { 'action': 'yes', 'title': 'Yes', 'icon': 'images/yes.png' },
                    { 'action': 'no', 'title': 'No', 'icon': 'images/no.png' }
                ]
            })
        })
        .catch((error) => console.log(error))
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
            imageHero: '/static/images/crystal_fighters.jpg',
            imageIcon: '',
        },
        'venmo-232': {
            id: 'venmo-232',
            name: 'Venmo brothers',
            city: 'Madrid, Spain',
            country: '🇪🇸',
            imageHero: '/static/images/crystal_fighters.jpg',
            imageIcon: '',
        }
    }

    const agenda = {
        '5pm': {
            id: '23424234',
            time: '5 PM',
            stage: 'Rock in Rio',
            artistId: 'venmo-232',
            purchaseUrl: 'eventbrite.com',
        },
        '7pm': {
            id: '3423423',
            time: '7 PM',
            stage: 'Rock in Rio',
            artistId: 'jorge-ferreiro',
            purchaseUrl: 'eventbrite.com',
        }
    }

    // TODO: Move into the state...
    let favorites = {
        // 'jorge-ferreiro': true,
    }

    // TODO: Move into the state...
    let notifications = {
        'jorge-ferreiro': {
            frequency: 'once',
            alertBefore: 3600,
        },
    }

    const addFavoriteArtist = (artistId) => {
        console.log('favoring an artist. yay!')

        const updatedFavorites = {
            ...favorites,
            // ...this.state.favorites,
            [artistId]: true,
        }
        
        favorites = updatedFavorites
        // this.setState({favorites})
    }

    const removeFavoriteArtist = (artistId) => {
        console.log('Removing artist from favorites. yay!')

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
        console.log('adding notification artist. yay!')
    }
    
    const removeNotificationArtist = (artistId) => {
        console.log('removing new artist. yay!')
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

                    // const artist = artists[]
                    const props = {
                        artist,
                        title: artist.name,
                        // agenda: agenda,
                        onFavoriteArtist: onFavoriteArtist,
                        onNotifyArtist: onNotifyArtist,
                    }

                    return withLayout(PageArtist, { props, routeProps })
                }}
            />
            <Route
                path={PATH_NOTIFICATIONS}
                exact
                render={(routeProps) => {
                    const props = {
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
                        title: 'Favorites',
                        favorites,
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

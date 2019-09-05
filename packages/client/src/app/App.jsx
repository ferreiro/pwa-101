import React, { PureComponent } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import artists from './__fixtures__/artists.json'

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

class App extends PureComponent {
    state = {
        artists,
        agenda: {
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
        },
        favorites: {},
        subscriptions: {}
    }

    findArtistStage = (artist) => {
        const artistId = artist.id
        const matchedAgendaItem = Object.values(this.state.agenda).find((agendaItem) =>
            agendaItem.artistId === artistId
        )

        return matchedAgendaItem.stage || ''
    }

    onFavoriteArtist = (artistId) => {
        if (artistId in this.state.favorites) {
            return this.removeFavoriteArtist(artistId)
        }

        return this.addFavoriteArtist(artistId)
    }
    
    addFavoriteArtist = (artistId) => {
        debug('favoring an artist. yay!')

        const favorites = {
            ...this.state.favorites,
            [artistId]: true,
        }
        
        this.setState({favorites})
    }

    removeFavoriteArtist = (artistId) => {
        debug('Removing artist from favorites. yay!')

        const favorites = {
            ...this.state.favorites
        }

        delete favorites[artistId]

        this.setState({favorites})
    } 

    onSubscribeArtist = (subscription) => {
        if (subscription.id in this.state.subscriptions) {
            return this.removeSubscription(subscription)
        }

        return this.addSubscription(subscription)
    }

    addSubscription = (subscription) => {
        debug('adding subscription artist. yay!')

        this.setState((state, props) => ({
            subscriptions: {
                ...state.subscriptions,
                ...{[subscription.id]: subscription},
            },
        }))
    }

    removeSubscription = (subscription) => {
        debug('removing new artist. yay!')

        this.setState((state, props) => {
            const subscriptions = {...state.subscriptions}

            delete subscriptions[subscription.id]

            return { subscriptions }
        })
    }

    render() {
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

        const {
            agenda,
            artists,
            favorites,
            subscriptions
        } = this.state;

        return (
            <Switch>
                <Route
                    path={PATH_HOME}
                    exact
                    render={(routeProps) => {
                        const props = {
                            title: 'Agenda',
                            agenda: agenda,
                            onFavoriteArtist: this.onFavoriteArtist,
                            onSubscribeArtist: this.onSubscribeArtist,
                            favorites,
                            subscriptions,
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
                            onFavoriteArtist: this.onFavoriteArtist,
                            onSubscribeArtist: this.onSubscribeArtist,
                            favorites,
                            subscriptions,
                            artists,
                            findArtistStage: this.findArtistStage,
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
                            subscriptions,
                            onFavoriteArtist: this.onFavoriteArtist,
                            onSubscribeArtist: this.onSubscribeArtist,
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
                            subscriptions,
                            onFavoriteArtist: this.onFavoriteArtist,
                            onSubscribeArtist: this.onSubscribeArtist,
                        }

                        return withLayout(PageFavorites, { props, routeProps })
                    }}
                />
            </Switch>
        )
    }
}

export default withRouter(App)

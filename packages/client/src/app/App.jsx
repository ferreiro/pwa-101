import React, { PureComponent } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import {getStaticMapsUrl} from './get-static-maps-url'
import artists from './__fixtures__/artists.json'
import agenda from './__fixtures__/agenda'
import ScrollToTop from './components/ScrollToTop'

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

const NOTIFICATIONS_MANAGER_DELAY = 5000

export const NOTIFICATION_ARTIST = 'notification/artist'
export const NOTIFICATION_PUSH = 'notification/push'

export const DATE_FRIDAY = 'date/friday'
export const DATE_SATURDAY = 'date/saturday'
export const DATE_SUNDAY = 'date/sunday'

/**
 * Returns a human readable date
 */
export const DATE_MAPPER_TO_HUMAN_TIME = {
    [DATE_FRIDAY]: 'Friday 6 September',
    [DATE_SATURDAY]: 'Saturday 7 September',
    [DATE_SUNDAY]: 'Sunday 8 September'
}

export const STAGE_TOWNE_100 = 'building/Towne100'
export const STAGE_TOWNE_321 = 'building/towne321'


export const STAGE_MAPPER = {
    [STAGE_TOWNE_100]: {
        text: 'Towne building 100',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Towne+Building',
        staticMapUrls: getStaticMapsUrl({
            query: 'Towne+Building',
            lat: '39.9516691',
            long: '-75.1912037',
        })
    },
    [STAGE_TOWNE_321]: {
        text: 'Towne building 321',
        googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Towne+Building',
        staticMapUrls: getStaticMapsUrl({
            query: 'Towne+Building',
            lat: '39.9516691',
            long: '-75.1912037',
        })
    }
}

if ('serviceWorker' in navigator) {
    console.log('⭐ Start to register a service worker')

    navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
            console.log('SW::Registration', registration)
        })
        .catch((error) => {
            console.log('SW::Error registering', error)
        });
}

class App extends PureComponent {
    state = {
        artists,
        agenda,
        favorites: {},
        subscriptions: {}
    }

    findArtistAgendaItem = ({artistId}) => {
        const matchedAgendaItem = Object.values(this.state.agenda).find((agendaItem) =>
            agendaItem.artistId === artistId
        )

        return matchedAgendaItem || {}
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
        const withLayout = (Component, { props = {}, routeProps = {} }) => {
            const PageWithLayout = (
                <PageLayout
                    title={props.title}
                    routeProps={routeProps}
                    isFullScreen={props.isFullScreen}
                >
                    <Component
                        {...routeProps}
                        {...props}
                    />
                </PageLayout>
            )

            return props.scrollToTop ? (
                <ScrollToTop>
                    {PageWithLayout}
                </ScrollToTop>
            ) : (
                PageWithLayout
            )
        }

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
                            const props = {}

                            return withLayout(PageNotFound, { props, routeProps })
                        }

                        const artistAgendaItem = this.findArtistAgendaItem({artistId});

                        const props = {
                            artist,
                            artistAgendaItem,
                            favorites,
                            isFullScreen: true,
                            onFavoriteArtist: this.onFavoriteArtist,
                            onSubscribeArtist: this.onSubscribeArtist,
                            subscriptions,
                            scrollToTop: true,
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
                            findArtistAgendaItem: this.findArtistAgendaItem,
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

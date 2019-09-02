import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { PageHome } from './components/PageHome'
import {
    PATH_HOME,
    PATH_NOTIFICATIONS,
    PATH_FAVORITES,
} from './constants/paths.js'

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

const App = () => {

    return (
        <Switch>
            <Route
                path={PATH_HOME}
                exact
                render={(props) => {
                    console.log(props)

                    return <PageHome {...props} />
                }}
            />
            <Route
                path={PATH_NOTIFICATIONS}
                exact
                render={(props) => {
                    console.log(props)

                    return <PageHome {...props} />
                }}
            />
            <Route
                path={PATH_FAVORITES}
                exact
                render={(props) => {
                    console.log(props)

                    return <PageHome {...props} />
                }}
            />
        </Switch>
    )
}


export default withRouter(App)

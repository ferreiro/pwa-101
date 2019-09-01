function _objectDestructuringEmpty(obj) {
    if (obj == null) throw new TypeError('Cannot destructure undefined')
}

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'

var Notification = function Notification(_ref) {
    _objectDestructuringEmpty(_ref)

    return React.createElement('div', null, 'I\'m a notification LOL')
}
console.log('das');

ReactDOM.render(
    React.createElement(BrowserRouter, null, React.createElement(App, null)),
    document.getElementById('app')
)
ReactDOM.render(
    React.createElement(Notification, null),
    document.getElementById('notifications')
)

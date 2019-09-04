import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('app')
)

// if (module.hot) {
//     module.hot.accept()
//     module.hot.dispose(function() {
//           clearInterval(timer)
//     })
// }

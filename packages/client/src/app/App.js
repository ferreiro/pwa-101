import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'

import { PageHome } from './components/PageHome'
import {
    PATH_HOME,
    PATH_NOTIFICATIONS,
    PATH_FAVORITES,
} from './constants/paths.js'

if ('serviceWorker' in navigator) {
    console.log('Sap2')
    console.log('Trying to register a service worker yay!')
    navigator.serviceWorker.register('sw.js')
        .then((registration) => {
            console.log(registration)

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










// function _typeof31(obj) {
//     if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
//         _typeof31 = function _typeof31(obj) {
//             return typeof obj
//         }
//     } else {
//         _typeof31 = function _typeof31(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : typeof obj
//         }
//     }
//     return _typeof31(obj)
// }

// function _typeof30(obj) {
//     if (typeof Symbol === 'function' && _typeof31(Symbol.iterator) === 'symbol') {
//         _typeof30 = function _typeof30(obj) {
//             return _typeof31(obj)
//         }
//     } else {
//         _typeof30 = function _typeof30(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof31(obj)
//         }
//     }

//     return _typeof30(obj)
// }

// function _typeof29(obj) {
//     if (typeof Symbol === 'function' && _typeof30(Symbol.iterator) === 'symbol') {
//         _typeof29 = function _typeof29(obj) {
//             return _typeof30(obj)
//         }
//     } else {
//         _typeof29 = function _typeof29(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof30(obj)
//         }
//     }

//     return _typeof29(obj)
// }

// function _typeof28(obj) {
//     if (typeof Symbol === 'function' && _typeof29(Symbol.iterator) === 'symbol') {
//         _typeof28 = function _typeof28(obj) {
//             return _typeof29(obj)
//         }
//     } else {
//         _typeof28 = function _typeof28(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof29(obj)
//         }
//     }

//     return _typeof28(obj)
// }

// function _typeof27(obj) {
//     if (typeof Symbol === 'function' && _typeof28(Symbol.iterator) === 'symbol') {
//         _typeof27 = function _typeof27(obj) {
//             return _typeof28(obj)
//         }
//     } else {
//         _typeof27 = function _typeof27(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof28(obj)
//         }
//     }

//     return _typeof27(obj)
// }

// function _typeof26(obj) {
//     if (typeof Symbol === 'function' && _typeof27(Symbol.iterator) === 'symbol') {
//         _typeof26 = function _typeof26(obj) {
//             return _typeof27(obj)
//         }
//     } else {
//         _typeof26 = function _typeof26(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof27(obj)
//         }
//     }

//     return _typeof26(obj)
// }

// function _typeof25(obj) {
//     if (typeof Symbol === 'function' && _typeof26(Symbol.iterator) === 'symbol') {
//         _typeof25 = function _typeof25(obj) {
//             return _typeof26(obj)
//         }
//     } else {
//         _typeof25 = function _typeof25(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof26(obj)
//         }
//     }

//     return _typeof25(obj)
// }

// function _typeof24(obj) {
//     if (typeof Symbol === 'function' && _typeof25(Symbol.iterator) === 'symbol') {
//         _typeof24 = function _typeof24(obj) {
//             return _typeof25(obj)
//         }
//     } else {
//         _typeof24 = function _typeof24(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof25(obj)
//         }
//     }

//     return _typeof24(obj)
// }

// function _typeof23(obj) {
//     if (typeof Symbol === 'function' && _typeof24(Symbol.iterator) === 'symbol') {
//         _typeof23 = function _typeof23(obj) {
//             return _typeof24(obj)
//         }
//     } else {
//         _typeof23 = function _typeof23(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof24(obj)
//         }
//     }

//     return _typeof23(obj)
// }

// function _typeof22(obj) {
//     if (typeof Symbol === 'function' && _typeof23(Symbol.iterator) === 'symbol') {
//         _typeof22 = function _typeof22(obj) {
//             return _typeof23(obj)
//         }
//     } else {
//         _typeof22 = function _typeof22(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof23(obj)
//         }
//     }

//     return _typeof22(obj)
// }

// function _typeof21(obj) {
//     if (typeof Symbol === 'function' && _typeof22(Symbol.iterator) === 'symbol') {
//         _typeof21 = function _typeof21(obj) {
//             return _typeof22(obj)
//         }
//     } else {
//         _typeof21 = function _typeof21(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof22(obj)
//         }
//     }

//     return _typeof21(obj)
// }

// function _typeof20(obj) {
//     if (typeof Symbol === 'function' && _typeof21(Symbol.iterator) === 'symbol') {
//         _typeof20 = function _typeof20(obj) {
//             return _typeof21(obj)
//         }
//     } else {
//         _typeof20 = function _typeof20(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof21(obj)
//         }
//     }

//     return _typeof20(obj)
// }

// function _typeof19(obj) {
//     if (typeof Symbol === 'function' && _typeof20(Symbol.iterator) === 'symbol') {
//         _typeof19 = function _typeof19(obj) {
//             return _typeof20(obj)
//         }
//     } else {
//         _typeof19 = function _typeof19(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof20(obj)
//         }
//     }

//     return _typeof19(obj)
// }

// function _typeof18(obj) {
//     if (typeof Symbol === 'function' && _typeof19(Symbol.iterator) === 'symbol') {
//         _typeof18 = function _typeof18(obj) {
//             return _typeof19(obj)
//         }
//     } else {
//         _typeof18 = function _typeof18(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof19(obj)
//         }
//     }

//     return _typeof18(obj)
// }

// function _typeof17(obj) {
//     if (typeof Symbol === 'function' && _typeof18(Symbol.iterator) === 'symbol') {
//         _typeof17 = function _typeof17(obj) {
//             return _typeof18(obj)
//         }
//     } else {
//         _typeof17 = function _typeof17(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof18(obj)
//         }
//     }

//     return _typeof17(obj)
// }

// function _typeof16(obj) {
//     if (typeof Symbol === 'function' && _typeof17(Symbol.iterator) === 'symbol') {
//         _typeof16 = function _typeof16(obj) {
//             return _typeof17(obj)
//         }
//     } else {
//         _typeof16 = function _typeof16(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof17(obj)
//         }
//     }

//     return _typeof16(obj)
// }

// function _typeof15(obj) {
//     if (typeof Symbol === 'function' && _typeof16(Symbol.iterator) === 'symbol') {
//         _typeof15 = function _typeof15(obj) {
//             return _typeof16(obj)
//         }
//     } else {
//         _typeof15 = function _typeof15(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof16(obj)
//         }
//     }

//     return _typeof15(obj)
// }

// function _typeof14(obj) {
//     if (typeof Symbol === 'function' && _typeof15(Symbol.iterator) === 'symbol') {
//         _typeof14 = function _typeof14(obj) {
//             return _typeof15(obj)
//         }
//     } else {
//         _typeof14 = function _typeof14(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof15(obj)
//         }
//     }

//     return _typeof14(obj)
// }

// function _typeof13(obj) {
//     if (typeof Symbol === 'function' && _typeof14(Symbol.iterator) === 'symbol') {
//         _typeof13 = function _typeof13(obj) {
//             return _typeof14(obj)
//         }
//     } else {
//         _typeof13 = function _typeof13(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof14(obj)
//         }
//     }

//     return _typeof13(obj)
// }

// function _typeof12(obj) {
//     if (typeof Symbol === 'function' && _typeof13(Symbol.iterator) === 'symbol') {
//         _typeof12 = function _typeof12(obj) {
//             return _typeof13(obj)
//         }
//     } else {
//         _typeof12 = function _typeof12(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof13(obj)
//         }
//     }

//     return _typeof12(obj)
// }

// function _typeof11(obj) {
//     if (typeof Symbol === 'function' && _typeof12(Symbol.iterator) === 'symbol') {
//         _typeof11 = function _typeof11(obj) {
//             return _typeof12(obj)
//         }
//     } else {
//         _typeof11 = function _typeof11(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof12(obj)
//         }
//     }

//     return _typeof11(obj)
// }

// function _typeof10(obj) {
//     if (typeof Symbol === 'function' && _typeof11(Symbol.iterator) === 'symbol') {
//         _typeof10 = function _typeof10(obj) {
//             return _typeof11(obj)
//         }
//     } else {
//         _typeof10 = function _typeof10(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof11(obj)
//         }
//     }

//     return _typeof10(obj)
// }

// function _typeof9(obj) {
//     if (typeof Symbol === 'function' && _typeof10(Symbol.iterator) === 'symbol') {
//         _typeof9 = function _typeof9(obj) {
//             return _typeof10(obj)
//         }
//     } else {
//         _typeof9 = function _typeof9(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof10(obj)
//         }
//     }

//     return _typeof9(obj)
// }

// function _typeof8(obj) {
//     if (typeof Symbol === 'function' && _typeof9(Symbol.iterator) === 'symbol') {
//         _typeof8 = function _typeof8(obj) {
//             return _typeof9(obj)
//         }
//     } else {
//         _typeof8 = function _typeof8(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof9(obj)
//         }
//     }

//     return _typeof8(obj)
// }

// function _typeof7(obj) {
//     if (typeof Symbol === 'function' && _typeof8(Symbol.iterator) === 'symbol') {
//         _typeof7 = function _typeof7(obj) {
//             return _typeof8(obj)
//         }
//     } else {
//         _typeof7 = function _typeof7(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof8(obj)
//         }
//     }

//     return _typeof7(obj)
// }

// function _typeof6(obj) {
//     if (typeof Symbol === 'function' && _typeof7(Symbol.iterator) === 'symbol') {
//         _typeof6 = function _typeof6(obj) {
//             return _typeof7(obj)
//         }
//     } else {
//         _typeof6 = function _typeof6(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof7(obj)
//         }
//     }

//     return _typeof6(obj)
// }

// function _typeof5(obj) {
//     if (typeof Symbol === 'function' && _typeof6(Symbol.iterator) === 'symbol') {
//         _typeof5 = function _typeof5(obj) {
//             return _typeof6(obj)
//         }
//     } else {
//         _typeof5 = function _typeof5(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof6(obj)
//         }
//     }

//     return _typeof5(obj)
// }

// function _typeof4(obj) {
//     if (typeof Symbol === 'function' && _typeof5(Symbol.iterator) === 'symbol') {
//         _typeof4 = function _typeof4(obj) {
//             return _typeof5(obj)
//         }
//     } else {
//         _typeof4 = function _typeof4(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof5(obj)
//         }
//     }

//     return _typeof4(obj)
// }

// function _typeof3(obj) {
//     if (typeof Symbol === 'function' && _typeof4(Symbol.iterator) === 'symbol') {
//         _typeof3 = function _typeof3(obj) {
//             return _typeof4(obj)
//         }
//     } else {
//         _typeof3 = function _typeof3(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof4(obj)
//         }
//     }

//     return _typeof3(obj)
// }

// function _typeof2(obj) {
//     if (typeof Symbol === 'function' && _typeof3(Symbol.iterator) === 'symbol') {
//         _typeof2 = function _typeof2(obj) {
//             return _typeof3(obj)
//         }
//     } else {
//         _typeof2 = function _typeof2(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof3(obj)
//         }
//     }

//     return _typeof2(obj)
// }

// function _typeof(obj) {
//     if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
//         _typeof = function _typeof(obj) {
//             return _typeof2(obj)
//         }
//     } else {
//         _typeof = function _typeof(obj) {
//             return obj &&
//         typeof Symbol === 'function' &&
//         obj.constructor === Symbol &&
//         obj !== Symbol.prototype
//                 ? 'symbol'
//                 : _typeof2(obj)
//         }
//     }

//     return _typeof(obj)
// }

// function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//         throw new TypeError('Cannot call a class as a function')
//     }
// }

// function _defineProperties(target, props) {
//     for (var i = 0; i < props.length; i++) {
//         var descriptor = props[i]
//         descriptor.enumerable = descriptor.enumerable || false
//         descriptor.configurable = true
//         if ('value' in descriptor) descriptor.writable = true
//         Object.defineProperty(target, descriptor.key, descriptor)
//     }
// }

// function _createClass(Constructor, protoProps, staticProps) {
//     if (protoProps) _defineProperties(Constructor.prototype, protoProps)
//     if (staticProps) _defineProperties(Constructor, staticProps)
//     return Constructor
// }

// function _possibleConstructorReturn(self, call) {
//     if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
//         return call
//     }

//     return _assertThisInitialized(self)
// }

// function _assertThisInitialized(self) {
//     if (self === void 0) {
//         throw new ReferenceError(
//             'this hasn\'t been initialised - super() hasn\'t been called'
//         )
//     }

//     return self
// }

// function _getPrototypeOf(o) {
//     _getPrototypeOf = Object.setPrototypeOf
//         ? Object.getPrototypeOf
//         : function _getPrototypeOf(o) {
//             return o.__proto__ || Object.getPrototypeOf(o)
//         }
//     return _getPrototypeOf(o)
// }

// function _inherits(subClass, superClass) {
//     if (typeof superClass !== 'function' && superClass !== null) {
//         throw new TypeError('Super expression must either be null or a function')
//     }

//     subClass.prototype = Object.create(superClass && superClass.prototype, {
//         constructor: {
//             value: subClass,
//             writable: true,
//             configurable: true
//         }
//     })
//     if (superClass) _setPrototypeOf(subClass, superClass)
// }

// function _setPrototypeOf(o, p) {
//     _setPrototypeOf =
//     Object.setPrototypeOf ||
//     function _setPrototypeOf(o, p) {
//         o.__proto__ = p
//         return o
//     }

//     return _setPrototypeOf(o, p)
// }


// var App =
//   /*#__PURE__*/
//   (function(_Component) {
//       _inherits(App, _Component)

//       function App() {
//           _classCallCheck(this, App)

//           return _possibleConstructorReturn(
//               this,
//               _getPrototypeOf(App).apply(this, arguments)
//           )
//       }

//       _createClass(App, [
//           {
//               key: 'render',
//               value: function render() {
//                   return React.createElement(
//                       'div',
//                       {
//                           className: 'App'
//                       },
//                       React.createElement(
//                           Switch,
//                           null,
//                           React.createElement(Route, {
//                               path: '/',
//                               exact: true,
//                               render: function render(props) {
//                                   console.log('props', props)
//                                   return React.createElement(PageHome, props)
//                               }
//                           })
//                       )
//                   )
//               }
//           }
//       ])

//       return App
//   })(Component)

// export default withRouter(App)

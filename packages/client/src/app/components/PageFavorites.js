import React from 'react'
import isEmpty from 'lodash'

export function PageFavorites({
    favorites,
}) {
    if (isEmpty(Object.keys(favorites))) {
        return (
            <p>You don't have any favorites... Go and add some!</p>
        )
    }
    console.log('favorites')
    console.log(favorites)
    return (
        <p>Page of the notifications</p>
    )
}

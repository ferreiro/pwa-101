import React from 'react'
import { css, cx } from 'emotion'

import { spacing05, spacing1 } from '../constants/style'
import { NOTIFICATION_ARTIST } from '../App'
import { createArtistNotification } from '../create-notification'

const buttonFavoriteStyle = {
    wrapper: css`
        border: 2px solid #cecece;
        background: #fff;
        padding: ${spacing05} ${spacing1};
        border-radius: 5px;
    `,
    active: css`
        border-color: #bb6f83;
        background-color: #ffbacc;
    `,
    text: css``,
}

function ButtonFavorite({
    isFavorited,
    onClick,
}) {
    const wrapperClassName = isFavorited
        ? cx(buttonFavoriteStyle.wrapper, buttonFavoriteStyle.active) 
        : buttonFavoriteStyle.wrapper

    return (
        <button
            onClick={onClick}
            className={wrapperClassName}
        >
            <span className={buttonFavoriteStyle.text}>
                {isFavorited ? '💔' : '❤️'}
            </span>
        </button>
    )
}

const buttonsubscriptionstyle = {
    wrapper: css`
        border: 2px solid #cecece;
        background: #fff;
        padding: ${spacing05} ${spacing1};
        border-radius: 5px;
    `,
    active: css`
        border-color: #c1bf51;
        background-color: #fffeba;
    `,
    text: css``,
}

function ButtonNotify({
    isNotified,
    onClick,
}) {
    const wrapperClassName = isNotified
        ? cx(buttonsubscriptionstyle.wrapper, buttonsubscriptionstyle.active) 
        : buttonFavoriteStyle.wrapper

    return (
        <button
            onClick={onClick}
            className={wrapperClassName}
        >
            <span className={buttonsubscriptionstyle.text}>
                {isNotified ? '🔕' : '🔔'}
            </span>
        </button>
    )
}

const artistActionsStyle = {
    wrapper: css`
        margin: 0;
        padding: 0;
        display: flex;
    `,
    item: css`
        list-style: none;
        margin-right: ${spacing1};
    `
}

export function ArtistActions({
    artistId,
    purchaseUrl,
    favorites,
    subscriptions,
    onFavoriteArtist,
    onSubscribeArtist,
}) {
    console.group('ArtistActions')
    console.log('artistId', artistId)
    console.log('subscriptions', subscriptions)
    console.log('favorites', favorites)
    console.groupEnd('subscriptions', subscriptions)

    const isFavorited = artistId in favorites
    const isNotified = artistId in subscriptions

    const _handleFavoriteArtist = (event) => {
        onFavoriteArtist(artistId)
    }

    const _handleNotifyArtist = (event) => {
        const newNotification = createArtistNotification({
            artistId,
            type: NOTIFICATION_ARTIST,
        })

        onSubscribeArtist(newNotification)
    }

    return (
        <ul className={artistActionsStyle.wrapper}>
            <li className={artistActionsStyle.item}>
                <ButtonFavorite
                    onClick={_handleFavoriteArtist}
                    isFavorited={isFavorited}
                />
            </li>

            <li className={artistActionsStyle.item}>
                <ButtonNotify
                    onClick={_handleNotifyArtist}
                    isNotified={isNotified}
                />
            </li>

            <li className={artistActionsStyle.item}>
                {purchaseUrl && (
                    <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                        RSVP
                    </a>
                )}
            </li>
        </ul>
    )
}
import React from 'react'
import { css, cx } from 'emotion'

import { spacing05, spacing1 } from '../constants/style'

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

const buttonNotificationStyle = {
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
        ? cx(buttonNotificationStyle.wrapper, buttonNotificationStyle.active) 
        : buttonFavoriteStyle.wrapper

    return (
        <button
            onClick={onClick}
            className={wrapperClassName}
        >
            <span className={buttonNotificationStyle.text}>
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
    notifications,
    onFavoriteArtist,
    onNotifyArtist,
}) {
    const isFavorited = favorites[artistId] === true
    const isNotified = notifications[artistId] === true

    const _handleFavoriteArtist = (event) => {
        onFavoriteArtist(artistId)
    }

    const _handleNotifyArtist = (event) => {
        onNotifyArtist(artistId)
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
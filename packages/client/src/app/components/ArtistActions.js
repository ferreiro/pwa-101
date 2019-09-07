import React from 'react'
import { css, cx } from 'emotion'

import { spacing05, spacing1 } from '../constants/style'
import { NOTIFICATION_ARTIST } from '../App'
import { createArtistNotification } from '../create-notification'
import { launchPayment } from '../launch-payment'
import { launchNotification } from '../launch-notification'

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

const buttonSubscriptionStyle = {
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
    artistId,
    isNotified,
    onClick,
}) {
    const wrapperClassName = isNotified
        ? cx(buttonSubscriptionStyle.wrapper, buttonSubscriptionStyle.active)
        : buttonFavoriteStyle.wrapper

    const handleOnClick = (event) => {
        onClick()
        launchNotification({ artistId, isEnabled: !isNotified })
    }

    return (
        <button
            onClick={handleOnClick}
            className={wrapperClassName}
        >
            <span className={buttonSubscriptionStyle.text}>
                {isNotified ? '🔕' : '🔔'}
            </span>
        </button>
    )
}

const buttonsPurchaseStyle = {
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

function ButtonPurchase({
    artistId,
    tickets,
}) {
    const handlePaymentChange = (event) => {
        // TODO: Implement Handle payment change.
        // We can keep the state inside the ButtonPurchase,
        // and pass down this handler
        console.log('handlePaymentChange was dispatched')
    }

    const handleShippingAddressChange = (event) => {
        // TODO: Implement Handle payment change.
        // We can keep the state inside the ButtonPurchase,
        // and pass down this handler
        console.log('handleShippingAddressChange was dispatched')
    }

    const initializePurchase = () => {
        return launchPayment({
            artistId,
            tickets,
            handlePaymentChange,
            handleShippingAddressChange,
        })
    }

    return (
        <button
            onClick={initializePurchase}
            className={buttonFavoriteStyle.wrapper}
        >
            <span className={buttonsPurchaseStyle.text}>
                RSVP
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

// TODO: Ideally, this component should only get an artistId,
// and through ContextApi or hooks, it should get the required data
export function ArtistActions({
    artistId,
    favorites,
    subscriptions,
    tickets,
    onFavoriteArtist,
    onSubscribeArtist,
}) {
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
                    artistId={artistId}
                    onClick={_handleNotifyArtist}
                    isNotified={isNotified}
                />
            </li>

            <li className={artistActionsStyle.item}>
                {tickets && (
                    <ButtonPurchase
                        artistId={artistId}
                        tickets={tickets}
                    />
                )}
            </li>
        </ul>
    )
}
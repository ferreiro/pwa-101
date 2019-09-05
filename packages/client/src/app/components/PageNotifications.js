import React from 'react'
import isEmpty from 'lodash'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import { PATH_ARTIST } from '../constants/paths'
import { NOTIFICATION_ARTIST, NOTIFICATION_PUSH } from '../App'
import { spacing1 } from '../constants/style'

const baseNotificationStyle = {
    wrapper: css`
        align-items: center;
        border: 3px solid #f2f2f2;
        border-radius: 5px;
        color: #000;
        display: flex;
        margin-bottom: ${spacing1};
        padding: ${spacing1} ${spacing1};
        text-decoration: none;
    `,
    content: css`
        flex: 1 1 auto;
    `,
    title: css`
        margin: 0;
        margin-bottom: ${spacing1};
        padding: 0;
    `,
    subtitle: css`
        margin: 0;
        padding: 0;
        font-weight: 400;
    `,
    aside: css`
        flex: 0 0 auto;
        margin-left: ${spacing1};
    `,
    asideImage: css`
        width: 70px;
        height: 70px;
        border-radius: 100%;
        object-fit: cover;
    `
}

function NotificationCardArtist({
    artists,
    artistId,
    frequency,
    alertBefore,
}) {
    const artist = artists[artistId]

    return (
        <Link
            className={baseNotificationStyle.wrapper}
            to={`${PATH_ARTIST}/${artistId}`}
        >
            <div className={baseNotificationStyle.content}>
                <h4 className={baseNotificationStyle.title}>
                    🔴 {artist.name} Starting now!
                </h4>
                <h5 className={baseNotificationStyle.subtitle}>
                    Talk from {artist.title}
                </h5>
            </div>
            <div className={baseNotificationStyle.aside}>
                <img
                    alt="Artist image hero"
                    className={baseNotificationStyle.asideImage}
                    src={artist.imageHero}
                />
            </div>
        </Link>
    )
}

function NotificationProvider({
    notification,
    artists,
}) {
    const { type } = notification

    switch (type) {
    case NOTIFICATION_ARTIST:
        return (
            <NotificationCardArtist
                {...notification}
                artists={artists}
            />
        )
    case NOTIFICATION_PUSH:
        return null
    default:
        // TODO: Throw an specific Error
        // NoSupportedNotification
        throw Error('Notification Not Supported!!')
    }
}

export function PageNotifications({
    artists,
    notifications,
}) {
    console.log('notifications')
    console.log(notifications)

    return (
        <div>
            {Object.values(notifications).map((notification) => (
                <NotificationProvider
                    notification={notification}
                    artists={artists}
                />
            ))}
        </div>
    )

    if (isEmpty(notifications)) {
        return (
            <div>
                <span>🙌</span>
                <p>Cool! You don't have any pending notification :)</p>
            </div>
        )
    }
}

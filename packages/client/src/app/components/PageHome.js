import React from 'react'
import { css, cx } from 'emotion'
import { Link } from 'react-router-dom'

import { PATH_ARTIST } from '../constants/paths'
import { spacing1, spacing3 } from '../constants/style'

function Agenda(props) {
    const { artists, agenda, favorites, notifications, onFavoriteArtist, onNotifyArtist } = props
    const agendaItems = Object.values(agenda)

    // NB: Expected Result
    // "FRIDAY": [{]}]
    const agendaItemsGroupedByDates = agendaItems.reduce((accumValue, currentValue) => {
        const date = currentValue.date
        const dateItems = accumValue[date] || []

        dateItems.push(currentValue)

        accumValue[date] = dateItems

        return accumValue
    }, {})

    return (
        <div>
            {Object.keys(agendaItemsGroupedByDates).map((date) => {
                const dateItems = Object.values(agendaItemsGroupedByDates[date])

                return (
                    <div key={date}>
                        <p>Date: {date}</p>

                        {dateItems.map((agendaItem) => {
                            const artist = artists[agendaItem.artistId]

                            console.log('agendaItem.artistId', agendaItem.artistId)

                            return (
                                <AgendaItem
                                    key={agendaItem.id}
                                    {...agendaItem}
                                    artist={artist}
                                    favorites={favorites}
                                    notifications={notifications}
                                    onFavoriteArtist={onFavoriteArtist}
                                    onNotifyArtist={onNotifyArtist}
                                />
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}

const agendaItemStyle = {
    wrapper: css`
        display: flex;
        flex-direction: row;
        margin-bottom: ${spacing3};
    `,
    time: css`
        width: 50px;
        text-align: left;
        flex: 0 0 auto;
    `,
    content: css`
        flex: 1 1 auto;
    `,
}

function AgendaItem(props) {
    const id = props.id
    const time = props.time

    return (
        <div key={id} className={agendaItemStyle.wrapper}>
            <div className={agendaItemStyle.time}>
                <span>{time}</span>
            </div>
            <div className={agendaItemStyle.content}>
                <AgendaCard
                    {...props}
                />
            </div>
        </div>
    )
}

const agendaCardStyles = {
    wrapper: css``,
    image: css`
        width: 100%;
        min-height: 180px;
        object-fit: cover;
        object-position: center;
    `,
}

function AgendaCard(props) {
    const {
        stage,
        artist = {},
        favorites,
        notifications,
        onFavoriteArtist,
        onNotifyArtist,
        purchaseUrl,
    } = props

    const {
        id,
        name,
        city,
        country,
        hero,
        imageHero,
    } = artist

    return (
        <div className={agendaCardStyles.wrapper}>
            <Link to={`${PATH_ARTIST}/${id}`}>
                <img
                    className={agendaCardStyles.image}
                    src={imageHero}
                    alt={artist.name}
                />
                <h2>{name}</h2>
            </Link>

            <h3>📍 {stage}</h3>

            <ArtistActions
                artistId={id}
                favorites={favorites}
                notifications={notifications}
                onFavoriteArtist={onFavoriteArtist}
                onNotifyArtist={onNotifyArtist}
            />
        </div>
    )
}

const buttonFavoriteStyle = {
    wrapper: css`
        padding: $spacing1 $spacing2;
        border-radius: 5px;
    `,
    active: css`
        background-color: blue;
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
        padding: $spacing1 $spacing2;
        border-radius: 5px;
    `,
    'wrapper:active': css`
        background-color: blue;
    `,
    text: css``,
}

function ButtonNotify({
    isNotified,
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={buttonNotificationStyle.wrapper}
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

function ArtistActions({
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

export function PageHome({
    artists,
    agenda,
    favorites,
    notifications,
    onFavoriteArtist,
    onNotifyArtist,
}) {
    return (
        <Agenda
            artists={artists}
            agenda={agenda}
            favorites={favorites}
            notifications={notifications}
            onFavoriteArtist={onFavoriteArtist}
            onNotifyArtist={onNotifyArtist}
        />
    )
}
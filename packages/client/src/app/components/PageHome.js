import React from 'react'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import { PATH_ARTIST } from '../constants/paths'

function Agenda(props) {
    const { artists, agenda, favorites, notifications, onFavoriteArtist, onNotifyArtist } = props
    const agendaItems = Object.values(agenda)

    console.log('Agenda:props')
    console.log(props)

    return (
        <div>
            {agendaItems.map((agendaItem) => {
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
}

const agendaItemStyle = {
    wrapper: css`
        display: flex;
        flex-direction: row;
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
        <ul>
            <button onClick={_handleFavoriteArtist}>
                {isFavorited ? '💔' : '❤️'}
            </button>

            <button onClick={_handleNotifyArtist}>
                {isNotified ? '🔕' : '🔔'}
            </button>

            {purchaseUrl && (
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                    RSVP
                </a>
            )}
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
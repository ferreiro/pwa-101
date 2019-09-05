import React from 'react'
import { css, cx } from 'emotion'
import { Link } from 'react-router-dom'

import { DATE_MAPPER_TO_HUMAN_TIME } from '../App'
import { PATH_ARTIST } from '../constants/paths'
import { spacing05, spacing1, spacing2, spacing3 } from '../constants/style'

import { getAgendaGroupByDates } from './get-agenda-group-by-dates'


const agendaStyle = {
    wrapper: css``,
    date: css``,
    dateTitle: css`
        font-size: 20px;
        margin-bottom: ${spacing2};
    `,
}

function Agenda(props) {
    const { artists, agenda, favorites, notifications, onFavoriteArtist, onNotifyArtist } = props
    
    const agendaItemsGroupedByDates = getAgendaGroupByDates(agenda)

    return (
        <div className={agendaStyle.wrapper}>
            {Object.keys(agendaItemsGroupedByDates).map((date) => {
                const dateItems = Object.values(agendaItemsGroupedByDates[date])

                return (
                    <div
                        className={agendaStyle.date}
                        key={date}
                    >
                        <p
                            className={agendaStyle.dateTitle}
                        >
                            {DATE_MAPPER_TO_HUMAN_TIME[date]}
                        </p>

                        TODO: Make this sticky, yay!!

                        {dateItems.map((agendaItem) => {
                            const artist = artists[agendaItem.artistId]

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
    link: css`
        text-decoration: none;
    `,
    image: css`
        width: 100%;
        min-height: 180px;
        object-fit: cover;
        object-position: center;
        margin-bottom: ${spacing1};
    `,
    title: css`
        color: #000;
        font-size: ${spacing2};
        margin: 0;
        margin-bottom: ${spacing1};
        padding: 0;
    `,
    venue: css`
        color: #000;
        font-size: ${spacing1};
        font-weight: 400;
        margin: 0;
        margin-bottom: ${spacing1};
        padding: 0;
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
            <Link
                to={`${PATH_ARTIST}/${id}`}
                className={agendaCardStyles.link}
            >
                <img
                    className={agendaCardStyles.image}
                    src={imageHero}
                    alt={artist.name}
                />
                <h2 className={agendaCardStyles.title}>
                    {name}
                </h2>
                <h3 className={agendaCardStyles.venue}>
                    📍 {stage}
                </h3>
            </Link>

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
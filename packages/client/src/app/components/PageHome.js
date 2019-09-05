import React from 'react'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import { DATE_MAPPER_TO_HUMAN_TIME, STAGE_MAPPER } from '../App'
import { PATH_ARTIST } from '../constants/paths'
import { spacing1, spacing2, spacing3 } from '../constants/style'

import { ArtistActions } from './ArtistActions'
import { getAgendaGroupByDates } from './get-agenda-group-by-dates'

function AgendaComingNext(props) {
    return null
    return (
        <div>
            Coming up next!
        </div>
    )
}

const agendaStyle = {
    wrapper: css``,
    date: css``,
    dateTitle: css`
        font-size: 20px;
        margin-bottom: ${spacing2};
    `,
}

function Agenda(props) {
    const { artists, agenda, favorites, subscriptions, onFavoriteArtist, onSubscribeArtist } = props
    
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

                        {/* TODO: Make this sticky, yay!! */}

                        {dateItems.map((agendaItem) => {
                            const artist = artists[agendaItem.artistId]

                            return (
                                <AgendaItem
                                    key={agendaItem.id}
                                    {...agendaItem}
                                    artist={artist}
                                    favorites={favorites}
                                    subscriptions={subscriptions}
                                    onFavoriteArtist={onFavoriteArtist}
                                    onSubscribeArtist={onSubscribeArtist}
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
        subscriptions,
        onFavoriteArtist,
        onSubscribeArtist,
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
                {imageHero && (
                    <img
                        className={agendaCardStyles.image}
                        src={imageHero}
                        alt={artist.name}
                    />
                )}

                <h2 className={agendaCardStyles.title}>
                    {name}
                </h2>

                <h3 className={agendaCardStyles.venue}>
                    📍 {STAGE_MAPPER[stage].text}
                </h3>
            </Link>

            <ArtistActions
                artistId={id}
                favorites={favorites}
                subscriptions={subscriptions}
                onFavoriteArtist={onFavoriteArtist}
                onSubscribeArtist={onSubscribeArtist}
                purchaseUrl={purchaseUrl}
            />
        </div>
    )
}

export function PageHome({
    artists,
    agenda,
    favorites,
    subscriptions,
    onFavoriteArtist,
    onSubscribeArtist,
}) {
    return (
        <div>
            <AgendaComingNext />

            <Agenda
                artists={artists}
                agenda={agenda}
                favorites={favorites}
                subscriptions={subscriptions}
                onFavoriteArtist={onFavoriteArtist}
                onSubscribeArtist={onSubscribeArtist}
            />
        </div>
    )
}
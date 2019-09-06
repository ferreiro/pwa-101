import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import { PATH_ARTIST, PATH_HOME } from '../constants/paths'
import { spacing1,spacing2, spacing3 } from '../constants/style'
import { ArtistActions } from './ArtistActions'

const favoriteCardStyles = {
    wrapper: css`
        margin-bottom: ${spacing3};
    `,
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

function CardFavorite({
    artist,
    favorites,
    findArtistAgendaItem,
    subscriptions,
    onFavoriteArtist,
    onSubscribeArtist,
}) {
    const artistId = artist.id
    const artistName = artist.name
    const imageHero = artist.imageHero

    const agendaItem = findArtistAgendaItem({artistId})
    const tickets = agendaItem.tickets

    return (
        <div className={favoriteCardStyles.wrapper}>
            <Link
                to={`${PATH_ARTIST}/${artistId}`}
                className={favoriteCardStyles.link}
            >
                <img
                    className={favoriteCardStyles.image}
                    src={imageHero}
                    alt={artistName}
                />

                <h2
                    className={favoriteCardStyles.title}
                >
                    {artistName}
                </h2>
            </Link>

            <ArtistActions
                artistId={artistId}
                favorites={favorites}
                subscriptions={subscriptions}
                tickets={tickets}
                onFavoriteArtist={onFavoriteArtist}
                onSubscribeArtist={onSubscribeArtist}
            />
        </div>
    )
}

export function PageFavorites({
    artists,
    favorites,
    findArtistAgendaItem,
    subscriptions,
    onFavoriteArtist,
    onSubscribeArtist
}) {
    if (isEmpty(favorites)) {
        return (
            <p>
                You do not have any favorites... Go and add some!
                <br /><br />
                <Link to={PATH_HOME}>
                    🤗 Explore the agenda >
                </Link>
            </p>
        )
    }

    return (
        <div>
            {Object.keys(favorites).map((artistId) => {
                const artist = artists[artistId]

                return (
                    <CardFavorite
                        key={artist.id}
                        artist={artist}
                        favorites={favorites}
                        findArtistAgendaItem={findArtistAgendaItem}
                        subscriptions={subscriptions}
                        onFavoriteArtist={onFavoriteArtist}
                        onSubscribeArtist={onSubscribeArtist}
                    />
                )
            })}
        </div>
    )
}

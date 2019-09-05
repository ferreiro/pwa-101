import React from 'react'
import isEmpty from 'lodash'
import { css } from 'emotion'
import { Link } from 'react-router-dom'

import { PATH_ARTIST } from '../App'
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
    notifications,
    onFavoriteArtist,
    onNotifyArtist,
}) {
    const artistId = artist.id
    const artistName = artist.name
    const imageHero = artist.imageHero

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
                <h3
                    className={favoriteCardStyles.venue}
                >
                    {/* 📍 {STAGE_MAPPER[stage].text} */}
                </h3>
            </Link>

            <ArtistActions
                artistId={artistId}
                favorites={favorites}
                notifications={notifications}
                onFavoriteArtist={onFavoriteArtist}
                onNotifyArtist={onNotifyArtist}
            />
        </div>
    )
}

export function PageFavorites({
    artists,
    favorites,
    notifications,
    onFavoriteArtist,
    onNotifyArtist
}) {
    // if (isEmpty(Object.keys(favorites))) {
    //     return (
    //         <p>You don't have any favorites... Go and add some!</p>
    //     )
    // }

    return (
        <div>
            {Object.keys(favorites).map((artistId) => {
                const artist = artists[artistId]

                return (
                    <CardFavorite
                        key={artist.id}
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

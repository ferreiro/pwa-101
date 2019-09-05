import React from 'react'
import { css } from 'emotion'

import { ArtistActions } from './ArtistActions'
import { STAGE_MAPPER } from '../App'
import { spacing1 } from '../constants/style'

function ArtistLocation({
    stage,
}) {
    const { googleMapsUrl, text } = STAGE_MAPPER[stage]

    return (
        <div>
            <span>
                Building: {text}

                {googleMapsUrl && (
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        Open Google Maps

                        TODO: Add image...
                    </a>
                )}
            </span>
        </div>
    )
}

const artistCardStyles = {
    wrapper: css``,
    image: css`
        width: 100%;
        min-height: 270px;
        object-fit: cover;
        object-position: center;
        margin-bottom: ${spacing1};
    `,
}

export function PageArtist({
    artist,
    favorites,
    notifications,
    onFavoriteArtist,
    onNotifyArtist,
    findArtistStage,
}) {
    const {
        id,
        name,
        city,
        country,
        biography,
        hero,
        imageHero,
    } = artist;

    const stage = findArtistStage(artist)

    return (
        <span>
            <img
                className={artistCardStyles.image}     
                src={imageHero}
                alt={artist.name}
            />

            <ArtistActions
                artistId={id}
                favorites={favorites}
                notifications={notifications}
                onFavoriteArtist={onFavoriteArtist}
                onNotifyArtist={onNotifyArtist}
            />

            <h4>
                Location
            </h4>

            <ArtistLocation
                stage={stage}
            />

            <h4>
                Biography
            </h4>
            <p
                dangerouslySetInnerHTML={{
                    __html: biography
                }}
            />
        </span>
    )
}

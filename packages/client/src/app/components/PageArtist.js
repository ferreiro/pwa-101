import React from 'react'
import { css } from 'emotion'

import { ArtistActions } from './ArtistActions'
import { STAGE_MAPPER } from '../App'
import { spacing1, spacing2 } from '../constants/style'

const artistLocationStyles = {
    wrapper: css``,
    mapImage: css`
        width: 100%;
        min-height: 270px;
        object-fit: cover;
        object-position: center;
        margin-top: ${spacing1};
        margin-bottom: ${spacing1};
    `,
}

function ArtistLocation({
    stage,
}) {
    const { googleMapsUrl, staticMapUrls, text } = STAGE_MAPPER[stage]

    return (
        <div>
            <span>
                <b>Building:</b> {text}
                <img src="" />

                {googleMapsUrl && (
                    <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                        <span>                        
                            {staticMapUrls && (
                                <img
                                    alt="Static map"
                                    className={artistLocationStyles.mapImage}
                                    src={staticMapUrls}
                                />
                            )}
                        </span>
                        <p>Open Google Maps</p>
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
    `,
    title: css`
        margin: 0;
        margin-bottom: ${spacing2};
        padding: 0;
    `,
    container: css`
        padding: 2em;
    `
}

export function PageArtist({
    artist,
    artistAgendaItem,
    favorites,
    subscriptions,
    onFavoriteArtist,
    onSubscribeArtist,
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

    console.log(artistAgendaItem)
    

    const stage = artistAgendaItem.stage
    const tickets = artistAgendaItem.tickets

    return (
        <span>
            <img
                className={artistCardStyles.image}     
                src={imageHero}
                alt={artist.name}
            />

            <div className={artistCardStyles.container}>
                <h1 className={artistCardStyles.title}>
                    {artist.name}
                </h1>

                <ArtistActions
                    artistId={id}
                    favorites={favorites}
                    subscriptions={subscriptions}
                    tickets={tickets}
                    onFavoriteArtist={onFavoriteArtist}
                    onSubscribeArtist={onSubscribeArtist}
                />

                <h4>
                    About the event:
                </h4>

                <p
                    dangerouslySetInnerHTML={{
                        __html: biography
                    }}
                />

                <ArtistLocation
                    stage={stage}
                />
            </div>
        </span>
    )
}

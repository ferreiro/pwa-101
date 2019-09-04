import React from 'react'
import { css } from 'emotion'

const artistCardStyles = {
    wrapper: css``,
    image: css`
        width: 100%;
        height: 250px;
        object-fit: cover;
        object-position: center;
    `,
}

export function PageArtist({
    artist,
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

    return (
        <span>
            <img
                className={artistCardStyles.image}     
                src={imageHero}
                alt={artist.name}
            />
            <h2>{name}</h2>
            <p
                dangerouslySetInnerHTML={{
                    __html: biography
                }}
            />
        </span>
    )
}

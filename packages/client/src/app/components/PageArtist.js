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

function ArtistCard(props) {
    const {
        artist = {},
        onFavoriteArtist,
        onNotifyArtist,
        purchaseUrl,
    } = props;

    const {
        id,
        name,
        city,
        country,
        hero,
        imageHero,
    } = artist;

    return (
        <div className={artistCardStyles.wrapper}>
            <Link to={`${PATH_ARTIST}/${id}`}>
                
            </Link>

            <h3>📍 {city}</h3>

            <ul>
                <button onClick={onFavoriteArtist}>
                    Save
                </button>
                <button onClick={onNotifyArtist}>
                    Notify
                </button>
                <a href={purchaseUrl} target="_blank" rel="noopener noreferrer">
                    RSVP
                </a>
            </ul>
        </div>
    )
}

export function PageArtist({
    artist,
}) {
    const {
        id,
        name,
        city,
        country,
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
        </span>
    )
}

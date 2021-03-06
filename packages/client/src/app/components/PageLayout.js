import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

import {
    containerMaxWidth,
    colorPrimary,
    spacing05,
    spacing2,
} from '../constants/style'

import {
    PATH_NOTIFICATIONS,
    PATH_FAVORITES
} from '../constants/paths'

const goBackWidth = '80px'

const actionsWidth = '80px'

const logoFontSize = '30px'
const logoColor = colorPrimary

const largeUp = '1000px'

const buttonCloseStyle = {
    wrapper: css`
        padding: ${spacing05};
        border: 0;
        background: #f4f4f4;
        border-radius: 5px;

        @include all and (min-width: ${largeUp}) {
            max-width: 600px;
            margin: 0 auto;
        }
    `,
    active: css`
        background-color: blue;
    `,
    text: css``,
}

function ButtonGoBack({
    onClick,
}) {
    return (
        <button
            onClick={onClick}
            className={buttonCloseStyle.wrapper}
        >
            <span className={buttonCloseStyle.text}>
                ⬅ Back
            </span>
        </button>
    )
}

const pageHeaderStyle = {
    wrapper: css`
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #cecece;
        display: flex;
        justify-content: space-between;
        padding: ${spacing2} ${spacing2};
    `,
    goBack: css`
        min-width: ${goBackWidth};
    `,
    logo: css`
        flex: 1 1 auto;
        justify-content: center;
    `,
    logoText: css`
        color: ${logoColor};
        font-size: ${logoFontSize};
        text-align: center;
        text-decoration: none;
        padding: 0;
        margin: 0;
    `,
    logoTextLink: css`
        text-decoration: none;
    `,
    actions: css`
        display: flex;
        min-width: ${actionsWidth};
        margin: 0;
        padding: 0;
        list-style: none;
        justify-content: space-around;
    `,
    actionsLink: css`
        text-decoration: none;
    `,
}

export function PageHeader({
    routeProps,
}) {
    const isEnabledGoBack = routeProps.match.path !== '/'
    const onClickGoBack = (event) => {
        // NB: You can also use routeProps.history.push('/')
        routeProps.history.goBack()
    }

    return (
        <header className={pageHeaderStyle.wrapper}>
            <div className={pageHeaderStyle.goBack}>
                {isEnabledGoBack && (
                    <ButtonGoBack
                        onClick={onClickGoBack}
                    />
                )}
            </div>

            <div className={pageHeaderStyle.logo}>
                <Link to="/" className={pageHeaderStyle.logoTextLink}>
                    <h1 className={pageHeaderStyle.logoText}>
                        Pennapps
                    </h1>
                </Link>
            </div>
            <ul className={pageHeaderStyle.actions}>
                <li>
                    <Link
                        className={pageHeaderStyle.actionsLink}
                        to={PATH_FAVORITES}
                    >
                      ❤️
                    </Link>  
                </li>
                <li>
                    <Link
                        className={pageHeaderStyle.actionsLink}
                        to={PATH_NOTIFICATIONS}
                    >
                      🛎
                    </Link>  
                </li>
            </ul>
        </header>
    )
}


const PageTitleStyles = {
    title: css`
        font-size: 2em;
        font-weight: bold;
        margin-bottom: ${spacing2};
    `,
}

function PageTitle({
    title,
}) {
    return (
        <div className={PageTitleStyles.title}>
            {title}
        </div>
    )
}

const pageLayoutStyle = {
    wrapper: css`
        width: 100%;
    `,
    container: css`
        padding: 2em;
        max-width: ${containerMaxWidth};
        margin: 0 auto;
    `,
    containerFullScreen: css`
        max-width: ${containerMaxWidth};
        margin: 0 auto;
    `,
    credits: css`
        width: 100%;
        background: rgba(0, 0, 0, 0.4);
        text-align: center;
        padding: 5px 10px;
        position: fixed;
        bottom: 0;
        left: 0;
    `
}

export function PageLayout({
    routeProps,
    children,
    title,
    isFullScreen,
}) {
    const containerWrapper = isFullScreen
        ? pageLayoutStyle.containerFullScreen
        : pageLayoutStyle.container

    return (
        <div className={pageLayoutStyle.wrapper}>
            <PageHeader
                routeProps={routeProps}
            />

            <div className={containerWrapper}>
                {title && (
                    <PageTitle
                        title={title}
                    />
                )}

                {children}
            </div>

            <footer className={pageLayoutStyle.credits}>
                Made with love by <a href="https://twitter.com/JGFerreiro" target="_blank">@jgferreiro</a>
            </footer>
        </div>
    )
}

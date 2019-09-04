import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

import {
    colorPrimary,
    spacing1,
    spacing2,
} from '../constants/style'

const goBackWidth = '80px'

const actionsWidth = '80px'

const logoFontSize = '30px'
const logoColor = colorPrimary

const pageHeaderStyle = {
    wrapper: css`
        align-items: center;
        background: #fff;
        border-bottom: 1px solid #cecece;
        display: flex;
        justify-content: space-between;
        padding: ${spacing1} ${spacing2};
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

const PageTitleStyles = {
    title: css`
        font-size: 2em;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: ${spacing2};
    `,
}

const pageLayoutStyle = {
    wrapper: css`
        font-family: 'Roboto', sans-serif;
        font-family: 'Open Sans', sans-serif;
    `,
    container: css`
        padding: 2em;
    `,
}

function PageHeader({
    isEnabledGoBack,
}) {
    return (
        <header className={pageHeaderStyle.wrapper}>
            <div className={pageHeaderStyle.goBack}>
                {isEnabledGoBack && (
                    'Go back'
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
                        to="/notifications"
                    >
                      🛎
                    </Link>  
                </li>
                <li>
                    <Link
                        className={pageHeaderStyle.actionsLink}
                        to="/favorites"
                    >
                      ❤️
                    </Link>  
                </li>
            </ul>
        </header>
    )
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

export function PageLayout({
    children,
    title,
}) {
    const isEnabledGoBack = false

    return (
        <div className={pageLayoutStyle.wrapper}>
            <PageHeader
                isEnabledGoBack={isEnabledGoBack}
            />
            <div className={pageLayoutStyle.container}>
                <PageTitle
                    title={title}
                />
                {children}
            </div>
        </div>
    )
}

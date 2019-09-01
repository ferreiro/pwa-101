import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'emotion'

import {
    colorPrimary,
    spacing1,
    spacing2,
} from '../constants/style'

const goBackWidth = '120px'

const actionsWidth = '120px'

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
        
    `,
    logoText: css`
        color: ${logoColor};
        font-size: ${logoFontSize};
    `,
    actions: css`
        display: flex;
        min-width: ${actionsWidth};
    `,
}

const pageTitleStyle = {
}

const pageLayoutStyle = {}

function PageHeader(props = {}) {
    return (
        <header className={pageHeaderStyle.wrapper}>
            <div className={pageHeaderStyle.goBack}>
                Go back
            </div>
            <div className={pageHeaderStyle.logo}>
                <h1 className={pageHeaderStyle.logoText}>
                    Pennapps
                </h1>
            </div>
            <ul className={pageHeaderStyle.actions}>
                <li>
                    <Link to="/">
                      Notifications
                    </Link>  
                </li>
                <li>
                    <Link to="/">
                      Loved
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
        <div>
            {title}
        </div>
    )
}

export function PageLayout({
    children,
    title,
}) {
    return (
        <div>
            <PageHeader />
            <PageTitle title={title} />
            <div>
                {children}
            </div>
        </div>
    )
}

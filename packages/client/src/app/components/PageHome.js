import React from 'react'
import { PageLayout } from './PageLayout'

export function PageHome(props) {
    return (
        <PageLayout
            title="Agenda for today"
        >
            <h1>Welcome to the home22! {props.title}</h1>
        </PageLayout>
    )
}

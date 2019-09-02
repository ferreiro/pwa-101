import React from 'react'
import { PageLayout } from './PageLayout'

export function PageHome(props) {
    return (
        <PageLayout
            title="Agenda for today"
        >
            <h1>Hi there! Welcome dsds ds {props.title}</h1>
        </PageLayout>
    )
}

import React from 'react'
import isEmpty from 'lodash'

export function PageNotifications({
    notifications,
}) {
    console.log('notifications')
    console.log(notifications)
    if (isEmpty(notifications)) {
        return (
            <div>
                <span>🙌</span>
                <p>Cool! You don't have any pending notification :)</p>
            </div>
        )
    }

    return (
        <div>
            {/* {Object.values(notifications).map((notification) => {
                <Notification
                    notification
                />
            })} */}
        </div>
    )
}

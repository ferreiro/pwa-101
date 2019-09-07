import moment from 'moment'

import {
    DATE_FRIDAY,    
} from '../app'

import {
    STAGE_TOWNE_100,
    STAGE_TOWNE_321,
} from '../app'

export default {
    '23424234': {
        id: '23424234',
        time: '5 PM',
        timestamp: moment('2019-11-07T11:00:00'),
        date: DATE_FRIDAY,
        stage: STAGE_TOWNE_321,
        artistId: 'venmo-qa',
        tickets: {
            price: 0,
            currency: 'USD',
            available: 1000,
        }
    },
    '3423423': {
        id: '3423423',
        time: '7 PM',
        date: DATE_FRIDAY,
        stage: STAGE_TOWNE_100,
        artistId: 'jorge-ferreiro',
        tickets: {
            price: 0,
            currency: 'USD',
            available: 1000,
        }
    },
}
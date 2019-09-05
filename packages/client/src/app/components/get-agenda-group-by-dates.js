const reducerGroupByDates = (accumValue, currentValue) => {
    const date = currentValue.date
    const dateItems = accumValue[date] || []

    dateItems.push(currentValue)

    accumValue[date] = dateItems

    return accumValue
}

/**
 * Returns an object literal with <key> being a date,
 * and <value> a list of all the agenda items for
 * that day 
 * @param {*} agenda
 */
export const getAgendaGroupByDates = (agenda) => {
    const agendaItems = Object.values(agenda)
    const initialValue = {}

    return agendaItems.reduce(reducerGroupByDates, initialValue)
}
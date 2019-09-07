const methods = [{
    supportedMethods: 'basic-card',
    data: { supportedNetworks: [ 'visa', 'mastercard' ] }
}]

const details = {
    displayItems: [{
        label: 'Computer to 💪 mine bitcoin',
        amount: { currency: 'USD', value: 1000 }
    }],
    total: {
        label: 'Total due',
        amount: { currency: tickets.currency, value : 1000 }
    }
}

const options = {
    requestPayerEmail: true,
    requestPayerName: true,
}

const request = new PaymentRequest(methods, details, options)


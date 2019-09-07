import artists from './__fixtures__/artists.json'

// Supported payment methods
const SUPPORTED_METHODS = [{
    supportedMethods: 'basic-card',
    data: {
        supportedNetworks: [
            'visa', 'mastercard'
        ]
    }
}]

export const launchPayment = ({
    artistId,
    tickets = {},
    handlePaymentChange,
    handleShippingAddressChange,
}) => {
    if (!PaymentRequest) {
        // PaymentRequest not supported in users browser
        return
    }

    const artist = artists[artistId]
    const label = `Ticket for ${artist.name}`
    const details = {
        displayItems: [{
            label,
            amount: { currency: 'USD', value: tickets.price }
        }],
        total: {
            label: 'Total due',
            amount: { currency: tickets.currency, value : tickets.price }
        }
    }

    const options = {
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true,
        shippingType: 'delivery'
    }

    const paymentRequest = new PaymentRequest(SUPPORTED_METHODS, details, options)

    paymentRequest.addEventListener('paymentmethodchange', handlePaymentChange, false)
    paymentRequest.addEventListener('shippingaddresschange', handleShippingAddressChange, false)
    paymentRequest.show().then(response => {
        console.log('💰 payments response', response)
        // [process payment]
        // send to a PSP etc.
        response.complete('success')
    }).catch(() => {
        // error on showing a modal.
    })
}
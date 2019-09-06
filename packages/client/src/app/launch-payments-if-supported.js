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


export const launchPaymentIfSupported = ({
    artistId,
    tickets = {},
}) => {
    if (!PaymentRequest) {
        console.log('PaymentRequest not supported in users browser')
        return
    }

    console.log('initialize purchase')

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
        requestShipping: false,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true,
        shippingType: 'delivery'
    }

    const request = new PaymentRequest(
        SUPPORTED_METHODS,
        details,
        options
    )

    request.addEventListener('shippingaddresschange', function(evt) {
        evt.updateWith(new Promise(function(resolve) {
            Promise.resolve()
            // updateDetails(details, request.shippingAddress, resolve);
        }))
    })

    request.show().then(response => {
        console.log('💰 payments response', response)
        // [process payment]
        // send to a PSP etc.
        response.complete('success')
    }).catch((error) => {
        alert(error)
    })

}
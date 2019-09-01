const certificatesPath = '../certificates'

var fs = require('fs');
var path = require('path');

module.exports = getSSLConfig = (/* env */) => {
    const keyPath = path.join(__dirname, `${certificatesPath}/localhost.key`)
    const certPath = path.join(__dirname, `${certificatesPath}/localhost.cert`)

    // TODO: Check if certificates folder was created...
    // Otherwise, throw error and warn to run yarn setup

    if (process.env !== 'production') {
        return sslOptions = {
          key: fs.readFileSync(keyPath),
          cert: fs.readFileSync(certPath),
        }
    }
    // TODO: Do something for produciton

    return {}
}


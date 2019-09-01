/* eslint-env node */

module.exports = function({
    outputPath,
}) {
    return {
        port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        compress: true,
        contentBase: outputPath,
        // debug: true,
        disableHostCheck: true,
        stats: {
            colors: true
        }
    }
}

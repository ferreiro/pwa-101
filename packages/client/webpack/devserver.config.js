/* eslint-env node */

module.exports = function({
    outputPath,
}) {
    return {
        // port: 3000,
        host: 'localhost',
        historyApiFallback: true,
        compress: true,
        contentBase: '../dist',
        // debug: true,
        disableHostCheck: true,
        stats: {
            colors: true
        },
        inline: true,
        hot: true,
        watchContentBase: true,
    }
}

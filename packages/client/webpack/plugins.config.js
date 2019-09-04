const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlWebpackConfig = {
    html: require('./html.config'),
    hash: true,
}

const getDevelopmentPlugins = () => [
    new webpack.HotModuleReplacementPlugin(),
]

const getProductionPlugins = () => [
    new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css'
    }),
]

module.exports = ({
    mode,
    outputPath,
}) => {
    let plugins = [
        new HtmlWebpackPlugin(
            htmlWebpackConfig.html
        ),
        new CopyWebpackPlugin([
            {
                from: './src/app/sw.js',
                to: outputPath,
            }
        ]),
        new CopyWebpackPlugin([
            {
                from: './src/images/**/**',
                to: outputPath,
                transformPath: (targetPath) => (
                    targetPath.replace('src/', '')
                )
            }
        ]),
    ]

    if (mode === 'development') {
        const devPlugins = getDevelopmentPlugins();

        plugins = plugins.concat(devPlugins)
    } else {
        plugins.concat(getProductionPlugins())
    }

    return plugins;
}
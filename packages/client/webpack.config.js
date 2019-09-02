/* eslint-env node */
const path = require('path')

const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServer = require('./webpack/devserver.config')
const plugins = require('./webpack/plugins.config')

// const DESTINATION_PATH = path.join(__dirname, '../server/dist')
const DESTINATION_PATH = path.join(__dirname, './dist')

const env = process.env
// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = function(env, argv = {}) {
    const mode = argv.mode || 'development'

    console.log(`
        ℹ️  Webpack mode: ${mode}
    `)

    const isWatchModeEnabled = mode === 'development'

    return {
        mode,
        watch: isWatchModeEnabled,
        entry: {
            client: [path.join(__dirname, './src/index.js'), 'webpack-hot-middleware/client'],
        },
        output: {
            filename: '[name].bundle.js',
            path: DESTINATION_PATH,
            publicPath: '/static/',
        },
        // This is required to make the hot reload work for the web...
        target: 'web',
        devServer: devServer({
            outputPath: DESTINATION_PATH
        }),
        devtool: '#source-map',
        plugins: plugins({
            mode,
            outputPath: DESTINATION_PATH,
        }),
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // NB: https://git.io/fXylx
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                hmr: process.env.NODE_ENV === 'development',
                            }
                        }, 
                        'css-loader',
                        'sass-loader'
                    ]
                },
            ]
        },
        resolve: {
            extensions: ['*', '.js', '.jsx']
        }
    }
}
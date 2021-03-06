/* eslint-env node */
const path = require('path')

const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devServer = require('./webpack/devserver.config')
const plugins = require('./webpack/plugins.config')

// const DESTINATION_PATH = path.join(__dirname, '../server/dist')
const DESTINATION_PATH = path.join(__dirname, './dist')

// const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';


module.exports = function(env, argv) {
    const mode = argv.mode

    console.log(`
        ℹ️  Webpack mode: ${mode}
    `)

    return {
        mode,
        entry: {
            client: [path.join(__dirname, './src/index.js')], // , 'webpack-hot-middleware/client'
        },
        output: {
            filename: '[name].bundle.js',
            path: DESTINATION_PATH,
            publicPath: '/',
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
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        // NB: https://git.io/fXylx
                        // {
                        //     loader: MiniCssExtractPlugin.loader,
                        //     // options: {
                        //     //     hmr: process.env.NODE_ENV === 'development',
                        //     // }
                        // },
                        MiniCssExtractPlugin.loader,
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
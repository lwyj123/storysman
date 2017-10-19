var path = require('path');
var config = require('../config');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var src = path.resolve(__dirname, '../src');

module.exports = {
    entry: {
        app: './src/storysman.js'
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            'game': resolve('game'),
            'config': resolve('config')
        }
    },
    externals: {
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader?cacheDirectory',
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            }
            /*{
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }*/
        ]
    },
}

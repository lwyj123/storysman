var path = require('path');
var config = require('../config');
const webpack = require('webpack');

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
        contentBase: './',
        open: true,
        hot: true,
        openPage: 'test/test.html'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // 更新组件时在控制台输出组件的路径而不是数字ID，用在开发模式
    ],
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.ts', '.json'],
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
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')],
            },
            {
                test: /\.json$/,
                use: 'json-loader',
            },
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
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

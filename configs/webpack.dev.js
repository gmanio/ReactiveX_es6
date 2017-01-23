/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

const proxyRules = require('../proxy/rules');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(webpackCommon, {
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id]-chunk.js',
        publicPath: '/'
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: "'development'"
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, '../index.html'),
            favicon: path.resolve(__dirname, '../assets/rx.png')
        })
    ],

    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        },
        proxy: proxyRules
    }
});

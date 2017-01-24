/**
 * Created on 2017-01-24.
 * @author: Gman Park
 */

const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackCommon = require('./webpack.common');

// webpack plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = webpackMerge(webpackCommon, {
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id]-chunk.js'
    },
    plugins: [
        new DefinePlugin({
            'process.env': {
                NODE_ENV: "'production'"
            }
        }),
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(process.cwd(), 'src/index.html'),
            favicon: path.resolve(process.cwd(), 'assets/rx.png'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            },
            mangle: {
                screw_ie8: true
            },
            output: {
                comments: false,
                screw_ie8: true
            },
            sourceMap: false
        })
    ]
});

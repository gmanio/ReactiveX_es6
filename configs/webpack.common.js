/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */
const path = require('path');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: path.resolve(process.cwd(), './src'),
    entry: {
        'app': ['./bootstrap.js']
    },
    resolve: {
        extensions: ['.js', '.scss'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'babel-loader',
                    options: {presets: ['es2015']}
                }]
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file',
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['app'],
            minChunks: Infinity
        }),

        new ExtractTextPlugin({
            filename: '[name].bundle.css',
            allChunks: true,
        }),
    ]
};
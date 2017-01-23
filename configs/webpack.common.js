/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        'app': ['./src/bootstrap.js']
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
                use: ['babel-loader']
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
                use: [{
                    loader: ExtractTextPlugin.extract({
                        fallbackLoader: "style-loader",
                        loader: "css-loader"
                    })
                }]
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['app'],
            minChunks: Infinity
        }),

        new ExtractTextPlugin("customStyle.css")
    ]
};
/**
 * Created on 2017-01-23.
 * @author: Gman Park
 */

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

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
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['app', 'vendor'],
            minChunks: Infinity
        })
    ]
};
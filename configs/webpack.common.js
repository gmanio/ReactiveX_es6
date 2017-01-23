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
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)$/,
                loader: 'file',
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            modules: true,
                            localIdentName: '[name]__[local]'
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            outputStyle: 'expanded',
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin({
            name: ['app'],
            minChunks: Infinity
        })
    ]
};
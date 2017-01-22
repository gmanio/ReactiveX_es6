/**
 * Created on 2017-01-21.
 * @author: Gman Park
 */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(process.cwd(), './src'),
    entry: {
        app: './app.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["es2015"]
                        ]
                    }
                }],
            },
        ],
    },
    output: {
        path: path.resolve(process.cwd(), './dist'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],

    devServer: {
        contentBase: path.resolve(process.cwd(), './'),  // New
        index: "src/index.html",
        // the index path for web server
        stats: {
            colors: true
        },
        // options for formating the statistics
        serverSideRender: false,
        // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.
        noInfo: false,
        // display no info to console (only warnings and errors)
        quiet: true,
        // display nothing to the console
        lazy: true,
        // switch into lazy mode
        // that means no watching, but recompilation on every request
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
    },
};
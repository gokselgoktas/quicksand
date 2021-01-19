const TerserWebpackPlugin = require('terser-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,

            use: 'babel-loader',
        }]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
            })
        ],
    },

    plugins: [
        new CleanWebpackPlugin(),
    ],
}

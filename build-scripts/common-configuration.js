const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/u,
                exclude: /node_modules/u,

                use: 'babel-loader',
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserWebpackPlugin({
                extractComments: false,
            }),
        ],
    },

    plugins: [new CleanWebpackPlugin()],

    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, '..', 'assets'),
        },

        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    },
};

const TerserWebpackPlugin = require('terser-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /node_modules/,

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
        extensions: ['.ts', '.js', '.tsx', '.jsx', '.json'],
    },
};

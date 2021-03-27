const path = require('path');

const HTMLMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { merge } = require('webpack-merge');

const { ProvidePlugin } = require('webpack');

module.exports = merge(require(path.resolve(__dirname, 'common-configuration.js')), {
    entry: {
        frontEnd: path.resolve('src', 'front-end', 'index.tsx'),
    },

    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/,
                use: 'html-loader',
            },
        ],
    },

    optimization: {
        minimize: true,
        minimizer: [new HTMLMinimizerPlugin(), new CSSMinimizerPlugin()],
    },

    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            hash: true,
            title: 'Quicksand',
        }),

        new ProvidePlugin({
            $: 'jquery',
        }),
    ],
});

const path = require('path');

const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HTMLMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-configuration.js')), {
    entry: {
        frontEnd: path.resolve('src', 'front-end', 'index.tsx'),
    },

    module: {
        rules: [
            {
                test: /\.s?css$/u,
                use: [MiniCSSExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.html$/u,
                use: 'html-loader',
            },
            {
                test: /\.glsl$/u,
                type: 'asset/source',
            },
        ],
    },

    optimization: {
        minimizer: [new HTMLMinimizerPlugin(), new CSSMinimizerPlugin()],
    },

    plugins: [
        new HTMLWebpackPlugin({
            favicon: path.resolve('assets', 'img', 'favicon.png'),
            filename: 'index.html',
            hash: true,
            minify: true,
            title: 'Quicksand',
        }),
    ],
});

const path = require('path');

const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-front-end-configuration.js')), {
    devtool: 'source-map',
    mode: 'production',

    output: {
        filename: '[contenthash].js',
        path: path.resolve('build', 'express', 'production', 'client'),
    },

    plugins: [
        new MiniCSSExtractPlugin({
            filename: '[contenthash].css',
        }),
    ],
});

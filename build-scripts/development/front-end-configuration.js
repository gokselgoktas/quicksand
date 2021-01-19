const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, '..', 'common-front-end-configuration.js')), {
    devtool: 'inline-source-map',
    mode: 'development',

    output: {
        filename: '[name].js',
        path: path.resolve('build', 'development', 'front-end'),
    },

    plugins: [
        new MiniCSSExtractPlugin({
            filename: '[name].css',
        }),
    ],
});

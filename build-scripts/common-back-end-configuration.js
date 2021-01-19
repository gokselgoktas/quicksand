const nodeExternals = require('webpack-node-externals');
const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-configuration.js')), {
    entry: {
        backEnd: path.resolve('src', 'back-end', 'index.js'),
    },

    externals: [nodeExternals()],

    node: {
        __dirname: false,
        __filename: false,
    },

    output: {
        filename: 'index.js',
    },

    target: 'node',
});

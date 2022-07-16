const path = require('path');

const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');

module.exports = merge(require(path.resolve(__dirname, 'common-configuration.js')), {
    externals: [nodeExternals()],

    node: {
        __dirname: false,
        __filename: false,
    },

    output: {
        filename: 'index.js',
    },
});

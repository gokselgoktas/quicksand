const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, '..', 'common-back-end-configuration.js')), {
    mode: 'development',

    entry: {
        server: path.resolve('src', 'back-end', 'server.js'),
    },

    output: {
        path: path.resolve('build', 'web', 'development', 'server'),
    },

    target: 'node',
});

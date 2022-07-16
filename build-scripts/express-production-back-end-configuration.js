const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-back-end-configuration.js')), {
    mode: 'production',

    entry: {
        express: path.resolve('src', 'back-end', 'express.ts'),
    },

    output: {
        path: path.resolve('build', 'express', 'production', 'server'),
    },

    target: 'node',
});

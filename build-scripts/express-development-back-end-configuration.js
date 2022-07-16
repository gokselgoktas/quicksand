const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-back-end-configuration.js')), {
    mode: 'development',

    entry: {
        express: path.resolve('src', 'back-end', 'express.ts'),
    },

    output: {
        path: path.resolve('build', 'express', 'development', 'server'),
    },

    target: 'node',
});

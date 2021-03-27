const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-back-end-configuration.js')), {
    mode: 'production',

    entry: {
        electron: path.resolve('src', 'back-end', 'electron.ts'),
    },

    output: {
        path: path.resolve('build', 'electron', 'production'),
    },

    target: 'electron-main',
});

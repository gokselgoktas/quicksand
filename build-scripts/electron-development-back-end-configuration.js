const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, 'common-back-end-configuration.js')), {
    mode: 'development',

    entry: {
        electron: path.resolve('src', 'back-end', 'electron.ts'),
    },

    output: {
        path: path.resolve('build', 'electron', 'development'),
    },

    target: 'electron-main',
});

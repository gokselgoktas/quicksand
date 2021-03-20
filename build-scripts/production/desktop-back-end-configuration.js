const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, '..', 'common-back-end-configuration.js')), {
    mode: 'production',

    entry: {
        app: path.resolve('src', 'back-end', 'app.js'),
    },

    output: {
        path: path.resolve('build', 'desktop', 'production'),
    },

    target: 'electron-main',
});

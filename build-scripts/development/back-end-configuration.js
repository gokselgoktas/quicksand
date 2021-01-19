const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, '..', 'common-back-end-configuration.js')), {
    mode: 'development',

    output: {
        path: path.resolve('build', 'development', 'back-end'),
    },
});

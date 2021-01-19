const path = require('path');

const { merge } = require('webpack-merge');

module.exports = merge(require(path.resolve(__dirname, '..', 'common-back-end-configuration.js')), {
    mode: 'production',

    output: {
        path: path.resolve('build', 'production', 'back-end'),
    },
});

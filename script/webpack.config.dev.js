const { merge } = require('webpack-merge')
const path = require('path')
const common = require('./webpack.config.common')

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, '../lib'),
        compress: true,
        port: 9000,
        open: true,
    },
})
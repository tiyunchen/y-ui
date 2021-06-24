const { merge } = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.config.common')

module.exports = merge(common, {
    devServer: {
        contentBase: path.join(__dirname, '../lib'),
        compress: true,
        port: 9000,
        open: true,
    },
    entry: {
        index: path.resolve(__dirname, '/src/index.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'index.html')
        })
    ]
})
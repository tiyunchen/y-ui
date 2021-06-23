const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

console.log('__dir', path.resolve(__dirname, '/src/index.js'))
module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, '/src/index.js')
    },
    devtool: process.env.mode,
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: "[name].bundle.js",
        chunkFilename: "[id].chunk.js",
        library: {
            type: "umd"
        }
    },
    plugins: [
        new HtmlWebpackPlugin()
    ]
}
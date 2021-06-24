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
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader?cacheDirectory',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'index.html')
        })
    ]
}
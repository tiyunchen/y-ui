const path = require('path')


console.log('__dir', path.resolve(__dirname, '/src/index.js'))
module.exports = {
    mode: 'development',
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
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },

}
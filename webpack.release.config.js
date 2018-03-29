const path = require('path');

module.exports = {
    entry: {
        main: ['whatwg-fetch', './src/index.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    externals: {
        'WxLogin': 'WxLogin',
        'BMap': 'BMap',
        'BMapLib': 'BMapLib'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.css$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
            ]
        }, {
            test: /\.less$/,
            use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
                { loader: "less-loader" }
            ]
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    outputPath: '/assets/images/'
                }
            }]
        }, {
            test: /\.(eot|woff|woff2|svg|ttf)\??.*$/,
            use: [{
                loader: "file-loader",
                options: {
                    outputPath: '/assets/iconfont/'
                }
            }, ]
        }, ]
    }
}
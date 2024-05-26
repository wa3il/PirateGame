// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const stylesHandler = 'style-loader';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        open: true,
        host: 'localhost',
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: ['node_modules'],
            emitWarning: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
    } else {
        config.mode = 'development';
    }
    return config;
};


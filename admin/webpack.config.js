// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let apiPath = '';
const stylesHandler = 'style-loader';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
    entry: {
        index:path.resolve(__dirname,'./src/index.js'),
        apiconf:path.resolve(__dirname,'./src/apiconfig.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].bundle.js',
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
            filename: 'admin.html',
        }),
        new ESLintPlugin({
            extensions: ['js', 'jsx'],
            exclude: ['node_modules'],
            emitWarning: true,
        }),
        new webpack.DefinePlugin({
            'process.env.API_PATH': JSON.stringify(apiPath), // Définissez le chemin de l'API comme variable d'environnement
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
        apiPath = 'http://localhost:3376';
    } else {
        config.mode = 'development';
    }
    console.log('API_PATH:', apiPath);
    return config;
};


// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

let apiPath = '';
const stylesHandler = 'style-loader';


const config = {
	entry: {
		index:'./src/index.js',
		apiconf:'./src/apiconfig.js',
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

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		config.mode = 'production';
		apiPath = 'http://localhost:3376';
	}
	else {
		config.mode = 'development';
	}

	return config;
};


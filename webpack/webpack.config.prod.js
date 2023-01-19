'use strict';
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
/*
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd();

var config = {
  context: path.resolve(CURRENT_WORKING_DIR, 'client'),
  entry: {
    app: ['./main.jsx'],
  },
  mode: 'production',
  output: {
    path: path.resolve(CURRENT_WORKING_DIR, 'dist'), //  destination
    filename: 'client.bundle.js',
    publicPath: '/dist/',
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // check for all js files
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
          plugins: [
            '@babel/plugin-proposal-function-bind',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-transform-runtime',
          ],
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg|gif)$/,
        loader: 'url-loader?limit=100000',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    roots: [__dirname, path.resolve(__dirname, 'client')],
    alias: {
      '@': path.resolve(__dirname, '../client'),
    },
  },
  devtool: 'hidden-source-map',
};

module.exports = config;

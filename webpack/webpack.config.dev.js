'use strict';
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

/*
 * so process.cwd() is used instead to determine the correct base directory
 * Read more: https://nodejs.org/api/process.html#process_process_cwd
 */
const CURRENT_WORKING_DIR = process.cwd();

const config = {
  context: path.resolve(CURRENT_WORKING_DIR, 'client'),
  entry: {
    app: [
      'webpack-hot-middleware/client', // bundle the client for hot reloading
      './main.jsx', // the entry point of app
    ],
  },
  mode: 'development',
  output: {
    path: path.resolve(CURRENT_WORKING_DIR, 'dist'), //  destination
    filename: 'client.bundle.js',
    publicPath: '/dist/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // enable HMR globally
    new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors
    new Dotenv(),
    new ReactRefreshWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // check for all js files
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]],
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
          plugins: [
            'react-refresh/babel',
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
      inferno: 'inferno/dist/index.dev.esm.js',
    },
  },
  devtool: 'inline-source-map',
};

module.exports = config;

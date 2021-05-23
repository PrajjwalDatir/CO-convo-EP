/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    // config options found at:
    // https://github.com/webpack-contrib/webpack-hot-middleware#config
    'webpack-hot-middleware/client',
    path.join(__dirname, 'client/index.js'),
  ],
  plugins: [
    // use webpack hot middleware
    // https://github.com/webpack-contrib/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
  ],
});

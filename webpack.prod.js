/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const merge = require('webpack-merge');
// minify css
// https://github.com/NMFR/optimize-css-assets-webpack-plugin
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  entry: path.join(__dirname, 'client/index.js'),
  // https://github.com/NMFR/optimize-css-assets-webpack-plugin
  plugins: [new OptimizeCssAssetsPlugin()],
});

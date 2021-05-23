/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');
// show visual treemap of bundle
// https://github.com/webpack-contrib/webpack-bundle-analyzer
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const prod = require('./webpack.prod.js');

module.exports = merge(prod, {
  // https://github.com/webpack-contrib/webpack-bundle-analyzer
  plugins: [new BundleAnalyzerPlugin()],
});

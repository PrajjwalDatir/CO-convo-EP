/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const babelConfig = require('./babel.config');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    // dynamically loading react components
    // https://webpack.js.org/guides/code-splitting/#dynamic-imports
    chunkFilename: '[name].bundle.js',
    // publicPath is required:
    // https://github.com/webpack/webpack-dev-middleware#options
    publicPath: process.env.PUBLIC_PATH || '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [
          // extract css to its own file
          // https://webpack.js.org/plugins/mini-css-extract-plugin/
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: [/\.module\.css$/, /node_modules/],
        use: [
          // tailwind uses postcss
          // https://tailwindcss.com/docs/installation/#webpack
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: 'css-loader',
            options: { modules: true, sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig,
        },
      },
    ],
  },
  plugins: [
    // mini css extract settings
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[name].bundle.css',
    }),
    // inject title, and script bundle to html
    // https://github.com/jantimon/html-webpack-plugin#usage
    new HtmlWebpackPlugin({
      title: 'Yet Another Chat App',
      template: 'client/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      // from: https://stackoverflow.com/a/42753045
      '#': path.resolve('client'),
    },
  },
};

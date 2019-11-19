/* eslint import/no-extraneous-dependencies: 0 */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');


module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          'url-loader',
        ],
      },
      {
        test: /\.css$/,
        use: 'raw-loader',
      },
    ],
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/static',
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};

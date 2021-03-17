const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'public'),
  mode: 'development',
  entry: './js/main.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist/public')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      excludeChunks: ['server']
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'img', to: 'img'}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: ''
            },
          },
          'css-loader'],
      },
      {
        test: /\.(svg|jpg|jpeg|png|gif)/,
        use: ['file-loader']
      }
    ]
  }
};
const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/index.html'],
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          // 关闭es6  module
          esModule: false,
        },
      },
    ],
  },
  resolve: {
    alias: {
      // # ！！！！！！注意如果配置了此处 要安装 eslint-import-resolver-webpack的插件！！！！！！！！ #
      // 在package.json 配置eslinConfig 或者添加.eslintrc文件
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: './css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    () => ['postcss-preset-env', {}],
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ['js', 'json'],
      exclude: '/node_modules/',
    }),
  ],
  mode: 'development',
  devServer: {
    compress: true,
    port: 3001,
    open: true,
  },
};

/**
 * loader 西在 配置loader使用
 * plugin 下载 引入 使用
 */


const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module:{
    rules: []
  },
  plugins:[
    // 功能： 默认创建空的html文件，自动引入打包输出所有资源（js/css）
    new HtmlWebpackPlugin({
      // 复制 指定的文件，并自动引入打包资源
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
        exclude: /node_modules/,
      },
      {
        /**
         * js的兼容问题
         * babel-loader-使用 Babel 和 webpack 传输文件。
            @babel/core-将ES2015+ 转换为向后兼容的 JavaScript
            @babel/preset-env-Babel 的智能默认设置
            @babel/plugin-proposal-class-properties-自定义 Babel 配置的示例（直接在类上使用属性）

            项目的根目录中创建一个.babelrc文件。可以使用preset-env和plugin-proposal-class-properties添加更多默认值。

            以上的处理方式只能转换基本的语法，promise不能转换
            全部兼容的处理  ---> @babel/polyfill
              问题--我只需要解决部分的兼容性问题，但是将所有的兼容性问题全部解决，体积太大了
            
            需要按需做兼容性处理 --- corejs

         */
        test: /\.js$/,
        exclude: /node_modules/,
        // loader: "babel-loader",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      // # ！！！！！！注意如果配置了此处 要安装 eslint-import-resolver-webpack的插件！！！！！！！！ #
      // 在package.json 配置eslinConfig 或者添加.eslintrc文件
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/index.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    () => ["postcss-preset-env", {}],
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ["js", "json"],
      exclude: "/node_modules/",
    }),
  ],
  mode: "development",
  devServer: {
    compress: true,
    port: 3001,
    open: true,
  },
};

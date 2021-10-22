const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ESLintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // 将MiniCssExtractPlugin.loader css插入到html
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "less-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
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
      {
        test: /\.html$/,
        loader: "html-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      // eslint规则配置
      // # ！！！！！！注意如果配置了此处 要安装 eslint-import-resolver-webpack的插件！！！！！！！！ #
      // 在package.json 配置eslinConfig 或者添加.eslintrc文件
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true, // 移除空格
        removeComments: true, // 移除注释
      },
    }),
    new MiniCssExtractPlugin({
      // css代码打包到一个文件中
      filename: "./css/index.css",
    }),
    new OptimizeCssAssetsWebpackPlugin(), // css压缩
    // () => ["postcss-preset-env", {}],
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ESLintWebpackPlugin({
      fix: true,
      extensions: ["js", "json"],
      exclude: "/node_modules/",
    }),
  ],
  // 生产环境自动压缩代码
  mode: "production",
  devServer: {
    compress: true,
    port: 3001,
    open: true,
  },
};

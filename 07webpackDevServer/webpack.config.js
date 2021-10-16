const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve, path } = require("path");
const webpack = require("webpack");

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
        use: ["style-loader", "css-loader"],
      },
      {
        // 打包其他资源 除html/css/js，
        exclude: /\.(css|js|html)$/,
        loader: "file-loader",
        // type: "asset",
        options: {
          esModule: false,
        },
        type: "javascript/auto",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  mode: "development",
  target: "web",
  devServer: {
    // contentBase: resolve(__dirname, "build"), //
    compress: true, //启动Gzip压缩
    port: 3009,
    open: true,
    // hot: true,
  },
};

const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// 设置nodejs环境变量
process.env.NODE_ENV !== "development";

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
        use: [
          // "style-loader", // c创建style标签将样式放上去

          // 取代style-loader，将css提取到css文件中
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            // 能找到package.json 中的browserslist里边的配置，通过配置加载制定的css兼容样式
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "./css/main.css",
    }),
  ],
  mode: "production",
  devServer: {
    port: 3001,
    compress: true,
    open: true,
  },
};

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "biult.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset",
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename: "img/[name].[hash:6].[ext]",
          //打包后对资源的引入，文件命名已经有/img了
          publicPath: "./",
        },
      },
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          esModule: false,
        },
      },
      {
        exclude: /\.(less|css|js|png|jpg|gif|html)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash:10].[ext]",
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
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // contenBase: resolve(__dirname, "build"),
    compress: true,
    port: 3009,
    open: true,
    hot: true,
    historyApiFallback: true,
    static: {
      directory: "./build",
    },
  },
  mode: "development",
  target: "web",
};

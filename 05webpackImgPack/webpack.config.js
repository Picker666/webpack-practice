const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
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
          filename: "img/[name].[hash:6][ext]",
          //打包后对资源的引入，文件命名已经有/img了
          publicPath: "./",
        },
      },
      {
        // 处理标签的图片
        test: /\.html$/,
        loader: "html-loader",
        options: {
          // 关闭es6  module
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};

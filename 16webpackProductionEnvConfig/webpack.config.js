const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const EslintWebpackPlugin = require("eslint-webpack-plugin");

// 定义nodejs的环境变量，决定使用browerslist哪个环境
process.env.NODE_ENV = "development";
process.env.NODE_ENV = "production";

const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  "css-loader",
  {
    loader: "postcss-loader",
    options: {
      postcssOptions: {
        plugins: [["postcss-preset-env", {}]],
      },
    },
  },
];

module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
        options: {
          // 关闭es6  module
          esModule: false,
        },
        // use: {
        //   // options: { // ??
        //   //   attrs: ["img:src", "a:href"],
        //   // },
        // },
      },
      {
        //
        test: /\.css$/,
        use: commonCssLoader,
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, "less-loader"],
      },
      {
        // 在package。json中添加eslintConfig， -》 airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              // {
              //   useBuiltIns: "usage", // 按需加载
              //   // corejs: { version: 3 },
              //   targets: {
              //     chrome: "60",
              //     firefox: "50",
              //   },
              // },
            ], // need loader function for using
          },
        },
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        // enforce: "pre",
        generator: {
          filename: "img/[name].[hash:6][ext]",
          // publicPath: "./",
        },
      },
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          outputPath: "madia",
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css", // [name] 默认的样式名字
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // minify: {// 已经自动移除
      //   collapseWhitespace: true,
      //   removeComments: true,
      // },
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new EslintWebpackPlugin({
      fix: true,
      extensions: ["js", "json"],
      exclude: "/node_modules/",
    }),
  ],
  mode: "production",
  // mode: "development",
  devServer: { compress: true, port: 3001, open: true },
};

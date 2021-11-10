/**
 * HMR
 *
 * 作用：一个模块发生变化，只会重新打包这一个模块
 *  极大提升构建速度
 *
 * 样式文件： 可以使用HMR功能：因为style-loader内部实现了
 * js文件： 默认是不支持HMR功能的 ---> 需要修改代码，添加支持HMR的代码 ---- 只能支持非入口文件的处理
 * html文件：默认是不能使用HMR功能，同时html文件不能惹更新了；（不需要支持）
 *        解决：入口更改，将html文件引入
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resolve } = require("path");
const webpack = require("webpack");

module.exports = {
  entry: ["./src/index.js", "./src/index.html"],
  output: {
    filename: "biult.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        // handle some type files with loader
        // enforce: 'pre' //优先执行
      },
      {
        // 一下loader只会匹配一个
        // 注意，不能有两个配置处理同一个类型的文件
        oneOf: [{
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
        },]
      }
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
  devtool: 'source-map'
};

/**
 * source-map: 一种提供源代码构建后代码映射的技术（如果构建后代码运行报错，通过映射可以跟踪错误代码）
 *  [inline-|hidden- | eval-][nosources-][cheap-[module-]]source-map
 *
 * source-map： 外部
 *    错误代码的准确信息 和 源代码的错误位置
 *
 * inline-source-map: 内联，
 *    只生成一个内联的source-map
 *    错误代码的准确信息 和 源代码的错误位置
 *
 * hideden-source-map: 外部
 *   提示错错误代码的错误原因，但是没有错误位置，不能追踪到源代码的错误，只能提示到构建后代码的位置
 *
 * eval-source-map: 内联，
 *    每个文件后边sourceMppingUrl，生成对应的sorce-map，都在eval
 *    错误代码的准确信息 和 源代码的错误位置，只不过文件名字后边多了hash值
 *
 * nosources-source-map: 外部
 *    能找到错误代码的准确错误信息，但是没有任何源代码的信息
 *
 * cheap-source-map: 外部
 *    错误代码的准确信息 和 源代码的错误位置，但是不能提示到具体报错的行，不能详细到列信息
 *
 * cheap-module-source-map: 外部
 *    能找到错误代码的准确错误信息，但是没有任何源代码的信息
 *    module会将loader的source-map 加入
 *
 * 内联和外联的区别：
 *  1、外联生成了文件，内联没有；
 *  2、内链构建速度更快
 *
 * 开发环境：速度快，调试友好
 *  速度快： eval > inline > cheap > ...
 *    eval-cheap-source-map
 *    eval-source-map
 *  调试友好
 *    source-map
 *    cheap-module-source-map
 *    cheap-module-source-map
 *
 *  eval-source-map > eval-cheap-module-source-map
 *
 * 生产环境：源代码要不要隐藏？调试要不要更友好
 *    内联会让代码体积变大，所以在生产环境不用内联
 *    nosource-source-map 全部隐藏
 *    hidden-source-map  只隐藏源代码，会提示构建后代码错误信息
 *
 *  eval-source-map > eval-cheap-module-source-map
 */

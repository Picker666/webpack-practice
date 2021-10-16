/**
 * webpack.config.js config
 * 作用指示webpack 工作，运行webpack得指令，会加载里边的配置
 * 
 * 所有的构建工具都是基于nodejs平台运行的，模块化采用的是commonjs
 * 
 */

// 用来拼接路径
const { resolve } = require('path');

module.exports = {
  //webpack 配置
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: resolve(__dirname, 'build') // __dirname nodejs的变量，代表当前文件的牡蛎的据对路径
  },
  module: {
    rules: [
      // lodaer 配置
      {
        test: /\.css$/,
        // 使用那些loader处理
        // use的执行顺序 从后边到前边
        use: [
          // 创建style标签，将js中的样式资源插入进去，添加到header中生效
          'style-loader',
          // 将css文件变成commonjs模块加载到js中，里边内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        // 使用那些loader处理
        // use的执行顺序 从后边到前边
        use: [
          'style-loader',
          'css-loader',
          // 将 less 文件编译成css文件
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    // 插件配置
  ],
  mode: 'development',
  // mode: 'production',
}
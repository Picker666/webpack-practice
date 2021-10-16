/**
 * 人口文件
 * 1.运行指令：
 * 开发环境指令：webpack ./src/index.js -o ./build/built.js --mode=development
 * 
 * 生产环境指令：webpack ./src/index.js -o ./build/built.js --mode=production
 * 
 * 2.结论
 *  webpack 可以处理js/json 资源，不能处理css/img 等其他资源
 *  生产环境和开发环境将 es6模块化编译成浏览器能识别的模块化
 *  生产环境和开发环境多了一个压缩js代码
 */

import data from './data.json';
console.log(data);


const add = (x, y) => {
  return x + y;
}

console.log(add(1,2));
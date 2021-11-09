import print from "./print";

import "./iconfont.css";
import "./index.less";

const add = (x, y) => {
  return x + y;
};

print();

console.log(add(1, 19));

console.log(add(1, 1));

if (module.hot) {
  console.log(module, "============");
  module.hot.accept("./print.js", function () {
    console.log(module, "============");
    // 方法会监听 print.js文件的变化，一旦发生变化，其他模块不会重新打包。
    // 会执行后面的函数
  });
}

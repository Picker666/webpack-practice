// import '@babel/polyfill';

import './css/index.css';

const add = (x, y) => x + y;

console.log(add(1, 2));
add(1, 8);

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('time out over!!!');
    resolve();
  }, 1000);
});

console.log(promise);

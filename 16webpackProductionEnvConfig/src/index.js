import "./index.css";
import "./another.less";

const add = (x, y) => x + y;

const result = add(1, 2);
console.log(result);

const mu = (z) => {
  const r = add(1, 2);
  return r * z;
};

const obj = {
  add,
  mu,
  look: true,
};

export default obj;

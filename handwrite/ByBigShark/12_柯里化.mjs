/**
 * 实现函数柯里化
 *
 */

const currying = function (fn, ...args) {
  const len = fn.length; // 统计函数有多少个参数

  let allArgs = [...args]; // 保存出现过的参数
  const result = function (...innerArgs) {
     allArgs = [...allArgs, ...innerArgs]; // 更新出现过的参数
    if (allArgs.length === len) {
      return fn(...allArgs);
    } else {
      return result;
    }
  };

  return result;
};


const add = (a, b, c) => a + b + c;
const a = currying(add, 1);
console.log(a(2)(3))
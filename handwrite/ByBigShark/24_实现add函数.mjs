/**
 * 实现add函数
 *
 * 使计算结果能够满足如下预期： add(1)(2)(3)()=6 add(1,2,3)(4)()=10
 *
 */

// 感觉这种写法并不能实现题目的要求
const add = function (...args) {
  let allArgs = [...args]; // 这里必须定义。用于记录所有的入参

  const fn = function (innerArgs) {
    allArgs = [...allArgs, innerArgs];

    return fn;
  };

  // 如果遇到console.log(add(1)(2)(3))这种，会将函数转换为字符串，此时重写toString方法
  fn.toString = function () {
    if (!allArgs.length) {
      return;
    }

    return allArgs.reduce((pre, cur) => {
      return pre + cur;
    });
  };

  return fn;
};


const sum = (...args) => {
  const result = args.reduce((pre, cur) => pre + cur);
  return (...args) => {
    if (args.length === 0) return result;
    return sum(result, ...args);
  };
}
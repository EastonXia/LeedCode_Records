/**
 * 实现数组扁平化
 *
 */

// ES6
const myFlatten = function (arr) {
  return arr.flat(Infinity);
};

// 数组中全是数字
const myFlatten1 = function (arr) {
  return arr.toString().split(',').map(Number);
};

// 递归
const myFlatten2 = function (arr) {
  const result = [];

  const fn = function (ary) {
    for (let item of ary) {
      if (Array.isArray(item)) {
        fn(item);
      } else {
        result.push(item);
      }
    }
  };

  fn(arr);

  return result;
};

const myFlatten3 = function (arr) {
  let str = JSON.stringify(arr);
  // 过滤所有的中中括号
  str = str.replace(/(\[|\])/g, '');
  str = '[' + str + ']';

  return JSON.parse(str);
};

export { myFlatten, myFlatten1, myFlatten2, myFlatten3 };

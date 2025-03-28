/**
 * 实现数组扁平化
 *
 * 递归方法和迭代方法
 *
 */

// 递归
const flatter = function (arr) {
  if (arr.length === 0) return arr;

  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur];
  });
};

// 迭代
const flatter2 = function (arr) {
  if (arr.length === 0) return arr;

  while (arr.some((cur) => Array.isArray(cur))) { 
      arr = [].concat(arr);
  }

  return arr
};

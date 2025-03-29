/**
 * 实现数组扁平化
 *
 * 单层扁平化可用函数
 * 1.扩展运算符 [ ...arr ]
 * 2.数组的 concat 方法 [].concat(arr)
 * 3.数组的 flat 方法 arr.flat()
 * 4.数组的 arr4.flat(Infinity); 这是多层方法
 */

const flatter = function (arr) {
  if (arr.length === 0) return arr;

  return arr.reduce((pre, cur) => {
    return Array.isArray(cur) ? [...pre, ...flatter(cur)] : [...pre, cur];
  });
};


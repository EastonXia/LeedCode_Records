/**
 * 实现数组元素求和
 *
 */

// 对于单层级的数组
const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const sum1 = arr1.reduce((total, i) => (total += i), 0);
console.log(sum1);

// 对于有多层级的数组
const arr2 = [1, 2, 3, [[4, 5], 6], 7, 8, 9];
const sum2 = arr2
  .toString()
  .split(',')
  .reduce((total, i) => (total += i), 0);

console.log(sum2);

/**
 * 将数字每千分位用逗号隔开
 *
 * 实现的是有小数版本的
 *
 */

const format = function (number) {
  let arr = number.toString().split('.');
  let num = arr[0]; // 整数部分
  let first = ''; // 重组整数金额的string

  while (num.length > 3) {
    first = ',' + num.slice(-3) + first; // 截取整数的尾部，拼接到已重组的字符串头部
    num = num.slice(0, num.length - 3); // 整数部分删除最后三位
  }

  // 此时num的长度为 1/2/3
  if (num) {
    first = num + first;
  }
  return [first, arr[1]].join('.');
};

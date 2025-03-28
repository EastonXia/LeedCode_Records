/**
 * 手写类型判断函数
 *
 * 返回的是一个字符串
 *
 */

const getType = function (value) {
  // 判断数据是 null 的情况
  if (value === null) {
    return value + '';
  }

  // 判断数据是引用类型的情况
  if (typeof value === 'object') {
    const valueClass = Object.prototype.toString.call(value); // [objcet xxx]
    const valueType = valueClass.split(' ')[1].split(''); // xxx]
    valueType.pop(); // xxx
    return valueType.join('').toLowerCase(); // 'xxx'
  } else {  // 判断数据是基本数据类型的情况和函数的情况
    return typeof value;
  }
};

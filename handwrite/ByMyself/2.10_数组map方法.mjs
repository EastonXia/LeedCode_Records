/**
 * 实现数组的map方法
 * 
 */

 Array.prototype._map = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须是一个函数');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(fn(this[i]))
  }

  return result;
};
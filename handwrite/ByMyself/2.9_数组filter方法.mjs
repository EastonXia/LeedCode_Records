/**
 * 实现数组的filter方法
 *
 */

Array.prototype._filter = function (fn) {
  if (typeof fn !== 'function') {
    throw Error('参数必须是一个函数');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    fn(this[i]) && result.push(this[i]); // 执行结果为true就进数组
  }

  return result;
};

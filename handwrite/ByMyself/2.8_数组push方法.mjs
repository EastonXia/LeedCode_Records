/**
 * 实现数组push方法
 *
 */

Array.prototype._push = function () {
  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i]; // 通过长度拓展数组
  }

  return this.length;
};

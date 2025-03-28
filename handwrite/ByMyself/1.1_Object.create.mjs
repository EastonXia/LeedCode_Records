/**
 * 实现Object.create
 *
 * 思路：将传入的对象作为原型
 *
 */

const create = function (obj) {
  const F = function () {};
  F.prototype = obj;
  
  return new F();
};

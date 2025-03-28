/**
 * 实现new操作符
 *
 */

const myNew = function (fn, ...args) {
  // 1. 创建一个空对象，并将其原型链指向构造函数的 prototype
  const obj = Object.create(fn.prototype);

  // 2. 使用 apply 将 obj 作为 this 执行构造函数，传入参数，改变obj的内部属性
  const res = fn.call(obj, ...args);

  // 3. 如果构造函数返回一个对象，那么返回这个对象，否则返回 obj
  if (res && (typeof res === 'object' || typeof res === 'function')) {
    return res;
  }

  // 大部分情况都不会返回一个对象，所以会执行这段代码
  return obj
};

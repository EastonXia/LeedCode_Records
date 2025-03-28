/**
 * 实现apply()、bind()、call()
 *
 */

Function.prototype.myApply = function (context, args) {
  if (!context || context === null) {
    context = window;
  }

  // 创造唯一的key值  作为我们构造的context内部方法名
  const fn = Symbol('fn');
  context[fn] = this; // this指向调用apply的函数

  return context[fn](...args);
};

// 和apply实现一致，只不过第二个参数变了
Function.prototype.myCall = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }

  const fn = Symbol('fn');
  context[fn] = this;

  return context[fn](...args);
};

// 要考虑两种情况，一种是正常函数，一种是构造函数，同时要考虑参数合并
Function.prototype.myBind = function (context, ...args) {
  if (!context || context === null) {
    context = window;
  }

  const fn = Symbol('fn');
  context[fn] = this;

  let _this = this; // 为构造函数情况保存调用函数

  const result = function (...innerArgs) {
    if (this instanceof _this) {
      // 构造函数时，this为实例对象，函数的执行要在实例对象里面
      this[fn] = _this;
      this[fn](...[...args, ...innerArgs]);
    } else {
      context[fn](...[...args, ...innerArgs]);
    }
  };

  result.prototype = Object.create(this.prototype);
  return result;
};

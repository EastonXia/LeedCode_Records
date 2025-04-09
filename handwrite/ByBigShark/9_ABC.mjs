/**
 * 实现apply()、bind()、call()
 *
 */

Function.prototype.myApply = function (context, args) {
  context = context || window; // 如果传入上下文，则默认为全局对象
  const uniqueId = Symbol(); // 传入唯一值，避免属性冲突
  context[uniqueId] = this; // 在上下文中添加一个属性，将函数赋值给这个属性
  const result = context[uniqueId](...args); // 执行函数
  delete context[uniqueId]; // 删除属性
  return result; // 返回结果
};

// 和apply实现一致，只不过第二个参数变了
Function.prototype.myCall = function (context, args) {
  context = context || window; // 如果传入上下文，则默认为全局对象
  const uniqueId = Symbol(); // 传入唯一值，避免属性冲突
  context[uniqueId] = this; // 在上下文中添加一个属性，将函数赋值给这个属性
  const result = context[uniqueId](...args); // 执行函数
  delete context[uniqueId]; // 删除属性
  return result; // 返回结果
};


Function.prototype.myBind = function (context, ...args) {
  const func = this;
  return function(...newArgs) {
    func.apply(context, [...args, ...newArgs]);
  }
};

/**
 * 实现一个 once 函数，传入函数参数只执行一次
 */

function once(fn) {
  let called = false;
  
  return function (...args) {
    if (!called) {
      called = true;
      return fn.apply(this, args);
    }
  }
}
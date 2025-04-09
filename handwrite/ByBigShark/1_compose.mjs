/**
 * 实现compose函数
 *
 */

const compose = function (...fn) {
  // 处理特殊情况
  if (fn.length === 0) return (val) => val;
  if (fn.length === 1) return fn[0];

  // 返回的是一连串嵌套函数，例如: fn(fn2(fn3(fn4(...args))))
  return fn.reduce((pre, cur) => {
    return (...args) => {
      return pre(cur(...args));
    };
  });
};

f1 = (...args) => {
  return fn(fn2(...args))
}
f2 = (...args) => {
  return (fn3) => {
    return fn(fn2(fn3(...args)))
  }
}
f3 = (...args) => {
  return (fn4) => {
    return (fn3) => {
      return fn(fn2(fn3(fn4(...args))))
    }
  }
}
/**
 * 实现防抖节流
 *
 */

// 防抖，触发最后一次
const debounce = function (fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
};

// 节流，触发第一次
const throttle = function (fn, delay) {
  let timer;

  return function (...args) {
    const context = this;
    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
};

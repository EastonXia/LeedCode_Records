/**
 * 实现防抖节流
 *
 */

// 防抖，触发最后一次
const debounce = function (fn, delay) {
  let timer = null;

  return function (...args) {
    const context = this;

    if (timer) {
      clearTimeout(timer);

      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
};

// 节流，触发第一次
const throttle = function (fn, delay) {
  let flag = true;

  return function (...args) {
    const context = this;
    
    if (!flag) return;
    flag = false;

    setTimeout(() => {
      fn.apply(context, args);
      flag = true;
    }, delay);
  };
};

/**
 * setTimeout 与 setInterval互相转换
 *
 */

// 与requestAnimationFrame调用类似
const setInterval = function (fn, delay) {
  let timer = null;

  const interval = function () {
    fn();
    timer = setTimeout(interval, delay);
  };
  interval();

  return {
    cancel: () => {
      clearTimeout(timer);
    },
  };
};

const setTimeout = function (fn, delay) {
  const timer = setInterval(() => {
    clearInterval(timer); 
    fn();
  }, delay);
};

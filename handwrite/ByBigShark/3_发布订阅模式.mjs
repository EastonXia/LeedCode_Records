/**
 * 实现一个发布订阅模式拥有 on emit once off 方法
 *
 */

class EventEmitter {
  constructor() {
    this.event = {};
  }

  on(type, callback) {
    if (!this.event[type]) {
      this.event[type] = [callback];
    } else {
      this.eventp[type].push(callback);
    }
  }

  off(type, callback) {
    if (!this.event[type]) {
      return;
    } else {
      this.event[type].filter((cur) => {
        return cur !== callback;
      });
    }
  }

  once(type, callback) {
    function fn() {
      callback();
      this.off(type, fn);
    }

    this.on(type, fn);
  }

  emit(type, ...rest) {
    this.event[type] &&
      this.event[type].forEach((callback) => {
        callback.apply(this, rest); // 这里不一定要加this，加了this只是把this指向EventEmitter实例
      });
  }
}

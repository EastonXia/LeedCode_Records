/**
 * 实现发布-订阅模式
 *
 */

class EventCenter {
  constructor() {
    this.handlers = {};
  }

  addEventLister(type, handler) {
    if (!this.handlers[type]) {
      this.handlers[type] = [];
    }
    this.handlers.push(handler);
  }

  dispatchEvent(type, params) {
    if (!this.handler[type]) {
      return new Error('该事件未注册');
    }

    this.handlers[type].forEach((handler) => {
      handler(...params);
    });
  }

  removeEventLister(type, handler) {
    if (!this.handlers[type]) {
      return new Error('该事件未注册');
    }

    if (!handler) {
      // 若无第二个参数则删除该事件的订阅和发布
      delete this.handlers[type];
    } else {
      const index = this.handlers[type].findIndex((cur) => cur === handler);
      if (index === -1) {
        return new Error('无该绑定事件');
      }

      this.handlers[type].splice(index, 1);
      if (this.handlers[type].length === 0) {
        // 有type，但里面没有回调函数，所以直接删除type。
        delete this.handlers[type];
      }
    }
  }
}

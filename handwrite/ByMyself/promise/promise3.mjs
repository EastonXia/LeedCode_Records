/**
 * 实现 then 方法多次调用添加多个处理函数
 *
 * 此时的promise.then()还没有返回值，无法链式调用
 *
 */

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // executor 就是外面传入的函数，进入会立即执行
    executor(this.resolve, this.reject);
  }

  // 储存状态的变量，初始值是 pending
  promiseStatus = PENDING;

  // 成功之后的值
  value = null;
  // 失败之后的原因 
  reason = null;

  // 存储成功回调函数
  // onFulfilledCallback = null;
  // ==== 新增 ====
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  // onRejectedCallback = null;
  onRejectedCallbacks = [];
  // ==== 新增 ====

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = FULFILLED;
      this.value = value;
      // 判断成功回调是否存在，如果存在就调用
      // this.onFulfilledCallback && this.onFulfilledCallback(value);
      // ==== 新增 ====
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
      // ==== 新增 ====
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = REJECTED;
      this.reason = reason;
      // 判断失败回调是否存在，如果存在就调用
      // this.onRejectedCallback && this.onRejectedCallback(reason);
      // ==== 新增 ====
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
      // ==== 新增 ====
    }
  };

  then(onFulfilled, onRejected) {
    // 判断状态
    if (this.promiseStatus === FULFILLED) {
      // 调用成功回调，并且把值返回
      onFulfilled(this.value);
    } else if (this.promiseStatus === REJECTED) {
      // 调用失败回调，并且把原因返回
      onRejected(this.reason);
    } else if (this.promiseStatus === PENDING) {
      // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
      // 等到执行成功失败函数的时候再传递
      // this.onFulfilledCallback = onFulfilled;
      // this.onRejectedCallback = onRejected;
      // ==== 新增 ====
      this.onFulfilledCallbacks.push(onFulfilled);
      this.onRejectedCallbacks.push(onRejected);
      // ==== 新增 ====
    }
  }
}

export { MyPromise };

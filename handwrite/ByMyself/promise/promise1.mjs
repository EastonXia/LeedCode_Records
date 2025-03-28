/**
 * 1、Promise 是一个类，在执行这个类的时候会传入一个执行器，这个执行器会立即执行
 * 2、Promise 会有三种状态
 *    - Pending 等待
 *    - Fulfilled 完成
 *    - Rejected 失败
 * 3、状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
 * 4、Promise 中使用 resolve 和 reject 两个函数来更改状态；
 * 5、then 方法内部做但事情就是状态判断
 *    - 如果状态是成功，调用成功回调函数
 *    - 如果状态是失败，调用失败回调函数
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

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = FULFILLED;
      this.value = value;
    }
  };
  
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = REJECTED;
      this.reason = reason;
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
    }
  }
}

// module.exports = MyPromise;
export { MyPromise };

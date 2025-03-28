/**
 * 实现promise
 *
 * 包含的功能
 * 1、含有三种状态
 * 2、状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改
 * 3、通过 setTimeout 等异步代码改变状态，then不会立马执行
 * 4、同一个 promise 可以多次调用then
 * 5、可以链式调用
 * 6、then 方法 return 一个返回值作为下一个 then 方法的参数，如果是 return 一个 Promise 对象，那么就需要判断它的状态
 * 7、如果 then 方法返回的是自己的 Promise 对象，程序会报错
 * 8、捕获错误
 *
 */

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  promiseStatus = PENDING;

  value = null;
  reason = null;

  onFulfilledCallback = [];
  onRejectedCallback = [];

  resolve = (value) => {
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = FULFILLED;
      this.value = value;

      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  };

  reject = (reason) => {
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = REJECTED;
      this.reason = reason;

      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  };

  then = (onFulfilled, onRejected) => {
    const newPromise = new MyPromise((resolve, reject) => {
      if (this.promiseStatus === FULFILLED) {
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(newPromise, x, resolve, reject);
          } catch (error) {
            this.reject(error);
          }
        });
      } else if (this.promiseStatus === REJECTED) {
        onRejected(this.reason);
      } else if (this.promiseStatus === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
    });

    return newPromise;
  };
}

const resolvePromise = function (newPromise, x, resolve, reject) {
  if (x === newPromise) {
    return reject(new TypeError('chaining cycle detected for promise'));
  }

  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
};

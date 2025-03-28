/**
 * 捕获错误及 then 链式调用其他状态代码补充
 * 
 * 目前还缺少重要的一个环节，就是我们的错误捕获还没有处理
 * 
 * 无论是执行器或者是then()中抛出的错误，我们都要进行捕获并抛到reject中
 *
 */

// 先定义三个常量表示状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  constructor(executor) {
    // executor 就是外面传入的函数，进入会立即执行
    // ==== 新增 ====
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
    // ==== 新增 ====
  }

  // 储存状态的变量，初始值是 pending
  promiseStatus = PENDING;

  // 成功之后的值
  value = null;
  // 失败之后的原因
  reason = null;

  // 存储成功回调函数
  onFulfilledCallbacks = [];
  // 存储失败回调函数
  onRejectedCallbacks = [];

  // 更改成功后的状态
  resolve = (value) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = FULFILLED;
      this.value = value;
      // 判断成功回调是否存在，如果存在就调用
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素，直到数组为空
        this.onFulfilledCallbacks.shift()(value);
      }
    }
  };
  // 更改失败后的状态
  reject = (reason) => {
    // 只有状态是等待，才执行状态修改
    if (this.promiseStatus === PENDING) {
      this.promiseStatus = REJECTED;
      this.reason = reason;
      // 判断失败回调是否存在，如果存在就调用
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  };

  then(onFulfilled, onRejected) {
    // 为了链式调用这里直接创建一个 MyPromise，并在后面 return 出去
    const newPromise = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.promiseStatus === FULFILLED) {
        // 创建一个微任务等待 newPromise 完成初始化
        queueMicrotask(() => {
          // ==== 新增 ====
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(newPromise, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
          // ==== 新增 ====
        });
      } else if (this.promiseStatus === REJECTED) {
        // 调用失败回调，并且把原因返回
        onRejected(this.reason);
      } else if (this.promiseStatus === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(onFulfilled);
        this.onRejectedCallbacks.push(onRejected);
      }
    });

    return newPromise;
  }
}

function resolvePromise(newPromise, x, resolve, reject) {
  // 如果相等了，说明return的是自己，抛出类型错误并返回
  if (newPromise === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<Promise>')
    );
  }

  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}

export { MyPromise };

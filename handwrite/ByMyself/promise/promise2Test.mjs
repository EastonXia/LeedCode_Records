/**
 * promise1中，如果有异步逻辑加如来会带来一些问题
 *
 */
import { MyPromise as promise1 } from './promise1.mjs';
import { MyPromise as promise2 } from './promise2.mjs';

const exPromise = new promise1((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

exPromise.then(
  (value) => {
    console.log('resolve', value);
  },
  (reason) => {
    console.log('reject', reason);
  }
);
// 没有打印信息！！！

/**
 * 主线程代码立即执行，setTimeout 是异步代码，then 会马上执行，这个时候判断 Promise 状态，状态是 Pending，
 * 然而之前并没有判断等待这个状态
 *
 */

const promise = new promise2((resolve, reject) => {
  setTimeout(() => {
    resolve('success');
  }, 2000);
});

promise.then(
  (value) => {
    console.log('resolve', value);
  },
  (reason) => {
    console.log('reject', reason);
  }
);


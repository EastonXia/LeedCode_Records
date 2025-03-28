import { MyPromise } from './promise1.mjs';

// 测试效果
const promise = new MyPromise((resolve, reject) => {
  resolve('success');
  reject('err');
});

promise.then(
  (value) => {
    console.log('resolve', value);
  },
  (reason) => {
    console.log('reject', reason);
  }
);

// 执行结果：resolve success

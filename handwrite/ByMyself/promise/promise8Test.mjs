import { MyPromise as Promise8 } from './promise8.mjs';

const promise1 = new Promise8((resolve, reject) => {
  resolve('succ');
});

promise1
  .then()
  .then()
  .then((value) => console.log(value));

// 打印 succ

const promise2 = new Promise8((resolve, reject) => {
  reject('err');
});

promise2
  .then()
  .then()
  .then(
    (value) => console.log(value),
    (reason) => console.log(reason)
  );

// 打印 err

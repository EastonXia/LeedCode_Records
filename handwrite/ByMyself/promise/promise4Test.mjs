import { MyPromise as Promise4 } from './promise4.mjs';

const promise = new Promise4((resolve, reject) => {
  // 目前这里只处理同步的问题
  resolve('success');
});

function other() {
  return new Promise4((resolve, reject) => {
    resolve('other');
  });
}

promise
  .then((value) => {
    console.log(1);
    console.log('resolve', value);
    return other();
  })
  .then((value) => {
    console.log(2);
    console.log('resolve', value);
  });


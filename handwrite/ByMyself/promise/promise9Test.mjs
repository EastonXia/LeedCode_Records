import { MyPromise as Promise9 } from './promise9.mjs';

Promise9.resolve()
  .then(() => {
    console.log(0);
    return Promise9.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

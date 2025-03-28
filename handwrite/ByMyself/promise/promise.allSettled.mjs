/**
 * 实现Promise.allSettled()
 *
 */

export function promiseAllSettled(promiseList) {
  if (promiseList.length === 0) return Promise.resolve([]);

  // 预处理一下promise数组，里面有不是promise类型的包装一层promise
  const newPromiseList = promiseList.map((promise) => {
    return promise instanceof Promise ? promise : Promise.resolve(promise);
  });

  return new Promise((resolve) => {
    const result = [];
    let unSettledCount = newPromiseList.length; // 计算还没处理的promise数量

    newPromiseList.forEach((promise, index) => {
      promise.then(
        (res) => {
          // 添加处理结果
          result[index] = {
            status: 'fulfilled',
            value: res,
          };

          unSettledCount -= 1;
          unSettledCount === 0 && resolve(result);
        },
        (err) => {
          // 添加处理结果
          result[index] = {
            status: 'rejected',
            reason: err,
          };

          unSettledCount -= 1;
          unSettledCount === 0 && resolve(result);
        }
      );
    });
  });
}

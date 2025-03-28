/**
 * 实现Promise.race()
 *
 */

export function promiseRace(promiseList) {
  return new Promise((resolve, reject) => {
    // 判断是否为数组
    if (!Array.isArray(promiseList)) {
      throw new TypeError('promises must be an array');
    }

    promiseList.forEach((promise) => {
       // 获取当前promise的结果
      Promise.resolve(promise).then(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

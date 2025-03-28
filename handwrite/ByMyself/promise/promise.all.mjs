/**
 * 实现Promise.all()
 *
 */

export function promiseAll(promiseList) {
  return new Promise((resolve, reject) => {
    // 判断是否为数组
    if (!Array.isArray(promiseList)) {
      throw new TypeError('promises must be an array');
    }

    const result = [];
    let count = 0;

    promiseList.forEach((promise, index) => {
      // 获取当前promise的结果
      Promise.resolve(promise).then(
        (res) => {
          result[index] = res;
          count += 1;
          // 计数达到promiseList长度后，就resolve结果
          count === promiseList.length && resolve(result);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}

/**
 * 实现Promise.prototype.finally()
 *
 * 与Promise.resolve(2).then(() => {}, () => {}) （resolved的结果为undefined）不同，Promise.resolve(2).finally(() => {}) resolved的结果为 2。
 * 同样，Promise.reject(3).then(() => {}, () => {}) (fulfilled的结果为undefined), Promise.reject(3).finally(() => {}) rejected 的结果为 3。
 */

Promise.prototype.myFinally = function (fn) {
  return this.then(
    (res) => {
      return Promise.resolve(fn()).then(() => res);
    },
    (err) => {
      return Promise.resolve(fn()).then(() => {
        throw err;
      });
    }
  );
};

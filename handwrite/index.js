/**
 * 练习手写js专用文件
 * 写完就删代码，多练几次，加深理解和记忆
 *
 */

const test = new Promise((resolve, rejcet) => {
  setTimeout(() => {
    rejcet(11111);
  }, 1000);
}).catch((reason) => {
  console.log(reason);
  console.log(test);
  return Promise.reject('aaa');
});

setTimeout(() => {
  console.log(test);
}, 3000);

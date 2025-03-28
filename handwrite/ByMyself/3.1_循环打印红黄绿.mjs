/**
 * 循环打印红黄绿
 *
 * 红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
 *
 */

// 三个亮灯函数
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

/**
 * promise实现
 *
 */
const task = function (timer, light) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (light === 'red') {
        red();
      } else if (light === 'yellow') {
        yellow();
      } else if (light === 'green') {
        green();
      }
      resolve();
    }, timer);
  });
};

/**
 * 通过then链调用
 *
 */
const step = function () {
  task(3000, 'red')
    .then(() => task(2000, 'green'))
    .then(() => task(1000, 'yellow'))
    .then(step);
};
step();

/**
 * 也可以用async/await调用
 *
 */
const taskRunner = async function () {
  await task(3000, 'red');
  await task(2000, 'green');
  await task(1000, 'yellow');
  taskRunner();
};
taskRunner();

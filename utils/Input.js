// ESMoudle 导入
// import readline from 'readline';

// CommandJS 导入
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// // 监听键入回车事件
// rl.on('line', (str) => {
//   // str即为输入的内容
//   if (str === 'close') {
//       // 关闭逐行读取流 会触发关闭事件
//       rl.close()
//   }
//   console.log(str);
// })

// // 监听关闭事件
// rl.on('close', () => {
//   console.log('触发了关闭事件');
// })

/**
 * 读入一行
 */
function readLine() {
  return new Promise((resolve) => {
    rl.on('line', (str) => {
      resolve(str);
    });
  });
}

/**
 * 退出逐行读取
 */
function close() {
  rl.close();
}

// ESMoudle 导出
// export { readLine, close }

// CommandJS 导出
module.exports = { readLine, close };


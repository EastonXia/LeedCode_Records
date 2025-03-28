/**
 * 渲染百万条结构简单的大数据时 怎么使用分片思想优化渲染
 *
 */

let ul = document.getElementById('container');
// 插入十万条数据
let total = 100000;
// 一次插入 20 条
let once = 20;
//总页数
let page = total / once;
//每条记录的索引
let index = 0;

const loop = function (curTotal, curIndex) {
  if (curTotal <= 0) return;

  const count = Math.min(curTotal, once);

  // 分片渲染的关键，利用requestAnimationFrame
  requestAnimationFrame(function () {
    for (let i = 0; i < count; i++) {
      const li = document.createElement('li');
      li.innerText = curIndex + i + " : " + ~~(Math.random() * total);;
      ul.appendChild(li);
    }
    
    loop(curTotal - count, curIndex + count);
  });
};

loop(total, index);

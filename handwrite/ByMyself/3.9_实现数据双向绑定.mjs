/**
 * 实现双向数据绑定
 *
 */

const obj = {};

const input = document.getElementById('input');
// const span = document.getElementById('span');

Object.defineProperty(obj, 'text', {
  configurable: true,
  enumerable: true,
  get: () => {
    console.log('获得数据');
  },
  set: (newVal) => {
    console.log('数据更新');
    input.value = newVal;
    // span.innerHTML = newVal;
  },
});

input.addEventListener('keyup', function (e) {
  obj.text = e.target.value;
});

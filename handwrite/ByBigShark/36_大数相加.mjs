/**
 * 实现一个add方法完成两个大数相加
 *
 * let a = "9007199254740991";
 * let b = "1234567899999999999";
 * function add(a ,b){...}
 *
 */

const add = function (a, b) {
  const maxLen = Math.max(a.length, b.length);

  a = a.padStart(maxLen, '0');
  b = b.padStart(maxLen, '0');

  let t = 0;
  let f = 0;
  let result = '';

  for (let i = maxLen - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f;
    f = Math.floor(t / 10);
    result = (t % 10) + result;
  }

  if (f !== 0) result = f + result;

  return result;
};

/**
 * 实现数组去重
 *
 */

const uniqueArr = function (arr) {
  return [...new Set(arr)];
};

const uniqueArr2 = function (arr) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (res.indexOf(arr[i]) === -1) {
      res.push(arr[i]);
    }
  } 
}

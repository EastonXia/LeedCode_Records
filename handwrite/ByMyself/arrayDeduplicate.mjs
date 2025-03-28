/**
 * 实现数组去重
 *
 */

// ES6 set
export function myDedupliacte(arr) {
  return Array.from(new Set(...arr));
}

// Array.filter() + Array.indexOf()
export function myDedupliacte1(arr) {
  return arr.filter((item, index, arr) => {
    //当前元素，在原始数组中的第一个索引===当前索引值，否则返回当前元素
    //不是那么就证明是重复项，就舍弃
    return arr.indexOf(item) === index;
  });
}

// for...of + object
export function myDedupliacte2(arr) {
  const result = [];
  const obj = {};

  for (let item of arr) {
    if (!obj[item]) {
      result.push(item);
      obj[item] = true;
    }
  }

  return result;
}

export { myDedupliacte, myDedupliacte1, myDedupliacte2 };

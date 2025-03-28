/**
 * 类数组拥有 length 属性 可以使用下标来访问元素 但是不能使用数组的方法 如何把类数组转化为数组?
 *
 */

const newArray1 = Array.from(arrayLike);

const newArray2 = [...arrayLike];

const newArray3 = Array.apply(null, arrayLike);

const newArray4 = Array.prototype.slice.call(arrayLike);

const newArray5 = Array.prototype.concat.apply([], arrayLike);

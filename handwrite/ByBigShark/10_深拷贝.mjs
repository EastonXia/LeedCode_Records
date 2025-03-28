/**
 * 实现深拷贝（考虑到复制 Symbol 类型）
 *
 */

const isObject = (obj) => typeof obj === 'object' && obj !== null;

const deepClone = function (obj, map = new WeakMap()) {
  if (!isObject(obj)) return obj; // 基础类型
  if (map.has(obj)) return map.get(obj); // 解决循环引用

  const target = Array.isArray(obj) ? [] : {};
  map.set(obj, target); // 解决循环引用

  // 使用Reflect 可以考虑到Symbol类型
  // Reflect.ownKeys(obj).forEach((key) => {
  //   if (isObject(obj[key])) {
  //     target[key] = deepClone(obj[key], map);
  //   } else {
  //     target[key] = obj[key];
  //   }
  // });

  // 考虑Date、正则、DOM、Symbol
  Reflect.ownKeys(obj).forEach((key) => {
    const value = obj[key];
    if (value instanceof Date) {
      target[key] = new Date(value.getTime());
    } else if (value instanceof RegExp) {
      target[key] = new RegExp(value);
    } else if (isObject(value) && value?.nodeType === 1) { // dom这个有待考虑
      const dom = document.getElementsByTagName(value.nodeName)[0];
      target[key] = dom.cloneNode(true);
    } else if (isObject(value)) {
      target[key] = deepClone(value, map);
    } else {
      target = value;
    }
  });

  return target;
};

/**
 * 解决循环引用问题
 *
 */

function deepClone(target, map = new WeakMap()) {
  // 用于解决循环引用，用WeakMap是为了进行深拷贝后留下来的map数据能让浏览器自动垃圾回收掉
  if (map.get(target)) {
    return target;
  }

  // 初步判断是否为引用类型
  if (typeof target === 'object' && target !== null) {
    // 记录下已拷贝过的内容
    map.set(target, true);

    // 判断是对象还是数组
    const cloneTarget = Array.isArray(target) ? [] : {};

    for (let prop in target) {
      // 还要判断属性是否在自身，在原型上的是不能拷贝的
      if (target.hasOwnPorperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map);
      }
    }

    return cloneTarget;
  } else {
    return target;
  }
}

export { deepClone as deepClone2 };

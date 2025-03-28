/**
 * 初步实现简单的深拷贝
 * 
 * 但会存在三个问题
 *  - 无法解决循环引用的问题
 *  - 无法拷贝特殊的对象，诸如 RegExp, Date, Set, Map等。
 *  - 无法拷贝函数。
 *
 */

function deepClone(target) {
  // 初步判断是否为引用类型
  if (typeof target === 'object' && target !== null) {
    // 判断是对象还是数组
    const cloneTarget = Array.isArray(target) ? [] : {};

    for (let prop in target) {
      // 还要判断属性是否在自身，在原型上的是不能拷贝的
      if (target.hasOwnPorperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop]);
      }
    }

    return cloneTarget;
  } else {
    return target;
  }
}

export { deepClone as deepClone1 };

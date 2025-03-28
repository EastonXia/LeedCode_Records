/**
 * 实现可拷贝特殊对象，拷贝函数
 *
 */

// 判断是否为引用类型
const isObject = (target) =>
  (typeof target === 'object' || typeof target === 'function') &&
  target !== null;

// 获取当前目标的数据类型
const getType = Object.prototype.toString.call(obj);

// 可以进行深拷贝的数据类型，可以遍历的类型
const canTraverse = {
  '[object Set]': true,
  '[object Map]': true,
  '[object Array]': true,
  '[object Object]': true,
  '[object Arguments]': true,
};
const setTag = '[object Set]';
const mapTag = '[object Map]';

// 不能进行深拷贝的类型
const boolTag = '[object Boolean]';
const numberTag = '[object Number]';
const stringTag = '[object String]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const regexpTag = '[object RegExp]';
const funcTag = '[object Function]';

// 处理正则对象
const handleRegExp = (target) => {
  const { source, flags } = target;
  return new target.constructor(source, flags);
};

// 处理函数
const handleFunc = (func) => {
  // 箭头函数直接返回自身
  if (!func.prototype) return func;

  // 定义函数体和函数参数的正则校验规则
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;

  // 把函数转为字符串
  const funcString = func.toString();
  // 分别匹配 函数参数 和 函数体
  const param = paramReg.exec(funcString);
  const body = bodyReg.exec(funcString);

  if (!body) return null;
  if (param) {
    const paramArr = param[0].split(',');
    return new Function(...paramArr, body[0]);
  } else {
    return new Function(body[0]);
  }
};

// 处理不能直接深拷贝的类型
const handleNotTraverse = (target, tag) => {
  const Ctor = targe.constructor; // 定义该类型的构造器

  switch (tag) {
    // 在ES6后不推荐使用【new 基本类型()】这样的语法，只能通过 new Object(type)
    // PS:不好理解
    case boolTag:
      return new Object(Boolean.prototype.valueOf.call(target));
    case numberTag:
      return new Object(Number.prototype.valueOf.call(target));
    case stringTag:
      return new Object(String.prototype.valueOf.call(target));
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return handleRegExp(target);
    case funcTag:
      return handleFunc(target);
    default:
      return new Ctor(target);
  }
};

function deepClone(target, map = new WeakMap()) {
  // 判断是否是引用类型，此处不能过滤掉通过基本类型构造函数生成的实例，如 new Boolean(false)
  if (!isObject(target)) return target;

  const type = getType(target);

  let cloneTarget;

  if (!canTraverse[type]) {
    // 处理不能遍历的对象
    return handleNotTraverse(target, type);
  } else {
    // 这波操作相当关键，可以保证对象的原型不丢失！
    // PS：用原型生成一个实例作为容器，有点难理解
    let ctor = target.prototype;
    cloneTarget = new ctor();
  }

  // 用于解决循环引用，用WeakMap是为了进行深拷贝后留下来的map数据能让浏览器自动垃圾回收掉
  if (map.get(target)) return target;
  // 记录下已拷贝过的内容
  map.set(target, true);

  //处理Set
  if (type === setTag) {
    target.forEach((item) => {
      cloneTarget.add(deepClone(item, map));
    });
  }

  //处理Map
  if (type === mapTag) {
    target.forEach((item, key) => {
      // map中的key可以是任何类型，所以也需要深拷贝
      cloneTarget.set(deepClone(key, map), deepClone(item, map));
    });
  }

  for (let prop in target) {
    // 还要判断属性是否在自身，在原型上的是不能拷贝的
    if (target.hasOwnPorperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop], map);
    }
  }

  return cloneTarget;
}

export { deepClone as deepClone3 };

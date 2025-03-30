/**
 * 实现 instanceOf 方法
 *
 */

function myInstanceof(obj, constructor) {
  // 检查构造函数是否为函数
  if (typeof constructor !== "function") {
    throw new TypeError("constructor of instanceof is not a function");
  }

  // 检查 obj 是否为对象或函数
  if(obj === null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false; 
  }

  // 获取构造函数的原型对象
  let proto = Object.getPrototypeOf(obj);

  // 检查构造函数的原型链是否包含给定的构造函数的原型
  while(proto !== null) {
    console.log(proto, constructor.prototype);
    if(proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }

  return false;
}


class A {}
class B extends A {}
class C extends B {}

let c = new C();
console.log(myInstanceof(c, A));
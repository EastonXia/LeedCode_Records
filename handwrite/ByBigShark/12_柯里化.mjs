/**
 * 实现函数柯里化
 *  
 * add(1)(2)(3,4)(5,6,7)(8).valueOf() = 36
 */

const curry = (...args1) => {
  const args = [...args1];

  const addFn = (...args2) => {
    args.push(...args2);
    return addFn;
  }

  addFn.valueOf = () => {
    return args.reduce((pre, cur) => pre + cur, 0);
  }

  return addFn;
}

console.log(curry(1)(2)(3,4)(5,6,7)(8).valueOf())
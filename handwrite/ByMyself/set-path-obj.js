/**
 * 实现一个 set 方法，支持根据路径设置对象的属性值
 */

// 循环遍历
function set1(obj, path, value) {
  let temp = obj;
  path.forEach((key, index) => {
    if(index === path.length - 1) {
      temp[key] = value;
    } else {
      temp = temp[key];
    }
  })
  return temp;
}

// 递归
function set2(obj, path, value) {
    const currentKey = path.shift();
    if(path.length === 0) {
        obj[currentKey] = value;
        return;
    }
    set2(obj[currentKey], path, value); // 递归设置下一个 objec
}



const obj = {
  a: {
    b: { c: 1 },
    f: 2
  },
  d: {
    e: 3
  }
};

console.log(obj.a.b.c); // 1
set1(obj,['a', 'b', 'c'], 100); // 设置 obj.a.b.c = 100
console.log(obj.a.b.c); // 100

console.log(obj.d.e); // 3
set2(obj,['d', 'e'], 200); // 设置 obj.d.e = 200
console.log(obj.d.e); // 200
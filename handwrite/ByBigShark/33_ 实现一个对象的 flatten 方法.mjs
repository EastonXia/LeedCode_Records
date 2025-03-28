/**
   const obj = {
    a: {
          b: 1,
          c: 2,
          d: {e: 5}
      },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
  }
  
  flatten(obj) 结果返回如下
  // {
  //  'a.b': 1,
  //  'a.c': 2,
  //  'a.d.e': 5,
  //  'b[0]': 1,
  //  'b[1]': 3,
  //  'b[2].a': 2,
  //  'b[2].b': 3
  //   c: 3
  // }
 
 */

const isObject = (val) => typeof val === 'object' && val !== null;

const flatten = function (obj) {
  if (!isObject(obj)) return obj;

  const result = {};

  const dfs = (cur, prefix) => {
    if (isObject(cur)) {
      if (Array.isArray(cur)) {
        cur.forEach((ele, index) => {
          dfs(ele,`${prefix}[${index}]`)
        });
      } else {
        Object.keys(cur).forEach((key) => {
          dfs(obj[key], `${prefix}.${key}`);
        });
      }
    } else {
      result[prefix] = cur;
    }
  };

  dfs(obj, '');

  return result;
};

/**
 * 实现模板字符串解析功能
 *  
 * let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
 * let data = {
 *   name: '姓名',
 *   age: 18
 * }
 * render(template, data); // 我是姓名，年龄18，性别undefined
 * 
 */

const render = function (template, data) {
  const computed = template.replace(/\{\{(\w+)\}\}/g, function (match, key) {
    console.log(match, key);
    return data[key];
  });

  return computed;
};

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18,
  sex: '男'
};

console.log(render(template, data)); // 我是姓名，年龄18，性别undefined

/**
 * 字符串反转
 * 
 */

let str1 = 'abcde';
str1.split('').reverse().join('');

let str2 = 'hello';
Array.from(str2),reduce((pre, cur) => {
    return `${cur}${pre}`;
}, '');
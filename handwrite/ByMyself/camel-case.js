/**
 * 实现 js 下划线转驼峰
 * 
 */

function camelCase(str) {
  return str.replace(/_([a-z])/g, function(match, letter1) {
    console.log(match, letter1)
    return letter1.toUpperCase();
  })
}

console.log(camelCase("some_string"));  // "someString"

function camelCase2(str) {
  return str.replace(/([_-])([a-z])/g, function(match, letter1, letter2) {
    console.log(match, letter1, letter2)
    return letter2.toUpperCase();
  })
}

console.log(camelCase2("some-string_with-underscores"));
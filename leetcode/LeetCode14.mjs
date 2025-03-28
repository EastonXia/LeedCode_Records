/**
  LeetCode14---最长公共前缀 

  编写一个函数来查找字符串数组中的最长公共前缀。
  如果不存在公共前缀，返回空字符串 ""。

  示例 1：
  输入：strs = ["flower","flow","flight"]
  输出："fl"

  示例 2：
  输入：strs = ["dog","racecar","car"]
  输出：""
  解释：输入不存在公共前缀。
   
  提示：
    0 <= strs.length <= 200
    0 <= strs[i].length <= 200
    strs[i] 仅由小写英文字母组成
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
// 横向扫描, 前缀字符串长度可能逐渐减少
var longestCommonPrefix = function (strs) {
  if (strs == null || strs.length === 0) return '';

  // 取第一个元素作为初始前缀
  var prefix = strs[0];

  // 横向遍历比较
  for (var i = 1; i < strs.length; i++) {
    prefix = getCommonPrefix(prefix, strs[i]);
  }
  return prefix;
};

var getCommonPrefix = function (str1, str2) {
  // 确定循环长度
  var length = Math.min(str1.length, str2.length);
  // 只要不相等就退出循环
  for (var i = 0; i < length; i++) {
    if (str1[i] !== str2[i]) {
      break;
    }
  }
  // 也可以用string.substring()
  return str1.slice(0, i);
};

// 纵向扫描，前缀字符串长度逐渐变大
var longestCommonPrefix2 = function (strs) {
  if (strs == null || strs.length === 0) return '';

  // 以str[0]的每一个字符作为比较依据
  for (var i = 0; i < strs[0].length; i++) {
    var prefixChar = strs[0][i];

    // 开始纵向比较
    for (var j = 1; j < strs.length; j++) {
      // 两个条件：
      // 1、字符串长短不同，要做考虑溢出可能
      // 2、依据字符与当前字符不相同
      // 只要有任意一行字符串不达到条件就返回结果
      if (i === strs[j].length || prefixChar !== strs[j][i]) {
        return strs[0].slice(0, i);
      }
    }
  }
  return strs[0];
};

function main() {
  console.log(longestCommonPrefix(['flower', 'flow', 'flight']));
  console.log(longestCommonPrefix(['dog', 'racecar', 'car']));
  console.log(longestCommonPrefix2(['flower', 'flow', 'flight']));
  console.log(longestCommonPrefix2(['dog', 'racecar', 'car']));
}

main();

/**
  LeetCode05---最长回文子串
 
  给你一个字符串 s，找到 s 中最长的回文子串。

  示例 1：
  输入：s = "babad"
  输出："bab"
  解释："aba" 同样是符合题意的答案。

  示例 2：
  输入：s = "cbbd"
  输出："bb"

  示例 3：
  输入：s = "a"
  输出："a"

  示例 4：
  输入：s = "ac"
  输出："a"
   
  提示：
    1 <= s.length <= 1000
    s 仅由数字和英文字母（大写和/或小写）组成

*/

// 中心扩展函数，计算子串长度
var centerExpand = function (str, left, right) {
  while (left >= 0 && right < str.length && str[left] === str[right]) {
    left--;
    right++;
  }
  // 当前的左右下标已经在子串之外，故计算不是 right - left + 1
  return right - left - 1;
};

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  // 处理边界情况
  if (s.length === 1) return s;

  // 初始化开始、结束下标，以及最大长度
  var start = 0;
  var end = 0;
  var max = 0;

  for (var i = 0; i < s.length; i++) {
    // 计算奇数长度、偶数长度对称，取两者最大值
    var len1 = centerExpand(s, i, i);
    var len2 = centerExpand(s, i, i + 1);
    var maxLen = Math.max(len1, len2);

    // 刷新最大长度以及对应的下标
    if (maxLen > max) {
      max = maxLen;
      start = i - ((maxLen - 1) >> 1); // 位运算可以省去向下取整步骤，并且速度更快
      end = i + (maxLen >> 1);
      // start = i - Math.floor((maxLen - 1) / 2);
      // end = i + Math.floor(maxLen / 2);
    }
  }

  return s.substring(start, end + 1);
};

function main() {
  console.log(longestPalindrome('babad'));
  console.log(longestPalindrome('cbbd'));
  console.log(longestPalindrome('a'));
  console.log(longestPalindrome('ac'));
  console.log(longestPalindrome('bb'));
}

main();

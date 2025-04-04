/**
  LeetCode03---无重复字符的最长子串 

  给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

  示例 1:
  输入: s = "abcabcbb"
  输出: 3 
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

  示例 2:
  输入: s = "bbbbb"
  输出: 1
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

  示例 3:
  输入: s = "pwwkew"
  输出: 3
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
        请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

  示例 4:
  输入: s = ""
  输出: 0

  提示：
    0 <= s.length <= 5 * 10^4
    s 由英文字母、数字、符号和空格组成

*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  // 滑动窗口、字符串长度、左右指针、最大值初始化
  var newSet = new Set([s.charAt(0)]);
  var len = s.length;
  var left = 0;
  var right = 1;
  var max = 1;

  while (left < len) {
    // 获取左右指针对应的字符，注意当指针超出范围值返回的值是空字符串
    var leftChar = s[left];
    var rightChar = s[right]; // 防止返回空字符串
    if (newSet.has(rightChar)) {
      // 如果有重复，移动左指针
      newSet.delete(leftChar);
      left++;
    } else {
      // 如果没重复，移动右指针
      newSet.add(rightChar);
      right < len && right++;
    }

    // 计算最大值
    max = Math.max(max, right - left);
  }

  return max;
};

function main() {
  console.log(lengthOfLongestSubstring('abcabcbb'));
  console.log(lengthOfLongestSubstring('bbbbb'));
  console.log(lengthOfLongestSubstring('pwwkew'));
  console.log(lengthOfLongestSubstring(''));
}

main();

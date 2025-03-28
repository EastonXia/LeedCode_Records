/**
  LeetCode395---至少有 K 个重复字符的最长子串
  
  给你一个字符串 s 和一个整数 k ，请你找出 s 中的最长子串， 要求该子串中的每一字符出现次数都不少于 k 。返回这一子串的长度。

  示例 1：
  输入：s = "aaabb", k = 3
  输出：3
  解释：最长子串为 "aaa" ，其中 'a' 重复了 3 次。

  示例 2：
  输入：s = "ababbc", k = 2
  输出：5
  解释：最长子串为 "ababb" ，其中 'a' 重复了 2 次， 'b' 重复了 3 次。

  提示：
    1 <= s.length <= 10^4
    s 仅由小写英文字母组成
    1 <= k <= 10^5

*/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 * 
 * 分治思想，递归
 * 
 * 递归的终止条件：如果字符串 s 的长度少于 k，那么一定不存在满足题意的子字符串，返回 0；
 * 
 * 如果一个字符 c 在 s 中出现的次数少于 k 次，那么 s 中所有的包含 c 的子字符串都不能满足题意。
 * 应该在 s 的所有不包含 c 的子字符串中继续寻找结果：把 s 按照 c 分割，得到很多子字符串 t。
 * 下一步要求 t 作为源字符串的时候，它的最长的满足题意的子字符串长度（到现在为止，我们把大问题分割为了小问题(s → t)）
 * 
 * 如果 ss 中的每个字符出现的次数都大于 k 次，那么 s 就是我们要求的字符串，直接返回该字符串的长度。
 * 
 */
var longestSubstring = function (s, k) {
  if (s.length < k) return 0;

  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    map.set(s[i], (map.get(s[i]) || 0) + 1);
  }

  // 此处只会遍历到第一个小于k的元素，剩下的其他小于k的元素交给分治后的数组完成
  for (const [key, val] of map.entries()) {
    if (val < k) {
      let res = 0;
      const strArr = s.split(key);
      for (let i = 0; i < strArr.length; i++) {
        res = Math.max(res, longestSubstring(strArr[i], k))
      }

      return res
    }
  }

  return s.length;
};

function main() {
  console.log(longestSubstring('aaabb', 3));
  console.log(longestSubstring('ababbc', 2));
}

main();

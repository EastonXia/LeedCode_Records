/**
  LeetCode242---有效的字母异位词
  
  给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

  注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

  示例 1:
  输入: s = "anagram", t = "nagaram"
  输出: true

  示例 2:
  输入: s = "rat", t = "car"
  输出: false

  提示:
    1 <= s.length, t.length <= 5 * 104
    s 和 t 仅包含小写字母

  进阶: 如果输入字符串包含 unicode 字符怎么办？你能否调整你的解法来应对这种情况？

*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 
 * 哈希表
 * 
 */
var isAnagram = function (s, t) {
  if (s.length !== t.length) return false;

  const map = new Map();

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const val = map.get(char);
    if (!val) {
      map.set(char, 1);
    } else {
      map.set(char, val + 1);
    }
  }

  for (let j = 0; j < t.length; j++) {
    const char = t[j];
    const val = map.get(char);
    if (!val) {
      return false;
    } else {
      map.set(char, val - 1);
    }
  }

  return true;
};

function main() {
  console.log(isAnagram('anagram', 'nagaram'));
  console.log(isAnagram('rat', 'car'));
}

main();

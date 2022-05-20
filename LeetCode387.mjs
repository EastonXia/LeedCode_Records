/**
  LeetCode387---字符串中的第一个唯一字符
  
  给定一个字符串 s ，找到 它的第一个不重复的字符，并返回它的索引 。如果不存在，则返回 -1 。

  示例 1：
  输入: s = "leetcode"
  输出: 0

  示例 2:
  输入: s = "loveleetcode"
  输出: 2

  示例 3:
  输入: s = "aabb"
  输出: -1
   
  提示:
    1 <= s.length <= 10^5
    s 只包含小写字母

*/

/**
 * @param {string} s
 * @return {number}
 *
 * 哈希表
 *
 * 两次遍历，在第一次遍历时，我们使用哈希映射统计出字符串中每个字符出现的次数。
 * 在第二次遍历时，我们只要遍历到了一个只出现一次的字符，那么就返回它的索引，否则在遍历结束后返回 −1。
 *
 * 也可以适当修改一下方法，使得第二次遍历的对象从字符串变为哈希映射
 * 对于哈希映射中的每一个键值对，键表示一个字符，值表示它的首次出现的索引（如果该字符只出现一次）或者 −1（如果该字符出现多次）。
 * 当我们第一次遍历字符串时，设当前遍历到的字符为 c，如果 c 不在哈希映射中，我们就将 c 与它的索引作为一个键值对加入哈希映射中，
 * 否则我们将 c 在哈希映射中对应的值修改为 −1。
 *
 * 在第一次遍历结束后，我们只需要再遍历一次哈希映射中的所有值，找出其中不为 −1 的最小值，即为第一个不重复字符的索引。
 * 如果哈希映射中的所有值均为 −1，我们就返回 −1。
 *
 */
var firstUniqChar = function (s) {
  const position = new Map();
  const n = s.length;
  for (let [i, ch] of Array.from(s).entries()) {
    if (position.has(ch)) {
      position.set(ch, -1);
    } else {
      position.set(ch, i);
    }
  }

  let first = n;
  for (let pos of position.values()) {
    if (pos !== -1 && pos < first) {
      first = pos;
    }
  }

  if (first === n) {
    first = -1;
  }
  
  return first;
};

function main() {
  console.log(firstUniqChar('leetcode'));
  console.log(firstUniqChar('loveleetcode'));
  console.log(firstUniqChar('aabb'));
}

main();

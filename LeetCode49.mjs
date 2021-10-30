/**
  LeetCode49---字母异位词分组

  给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
  字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母都恰好只用一次。

  示例 1:
  输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
  输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

  示例 2:
  输入: strs = [""]
  输出: [[""]]

  示例 3:
  输入: strs = ["a"]
  输出: [["a"]]

  提示：
    1 <= strs.length <= 10^4
    0 <= strs[i].length <= 100
    strs[i] 仅包含小写字母
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 *
 * 哈希表
 */
var groupAnagrams = function (strs) {
  var map = new Map();
  var res = [];

  for (var i = 0; i < strs.length; i++) {
    var ele = strs[i];

    // 关键点，转化为数组然后排序，然后再转回字符串，这样同一组字母异位词都转成相同的字符串
    var eleArr = Array.from(ele);
    eleArr.sort();
    var mapKey = eleArr.join('');
    // var mapKey = eleArr.toString(); // 转字符串另一种写法

    // 转化的另一种写法
    // var mapkey = ele.split('').sort().join('')

    // 哈希表的值是一个数组，数组内包含同一组的字母异位词
    var mapValue = map.get(mapKey) ?? [];
    mapValue.push(strs[i]);

    map.set(mapKey, mapValue);
  }

  // 哈希表的值转为数组
  res = Array.from(map.values());
  
  return res;
};

function main() {
  console.log(groupAnagrams(['eat', 'tea', 'tan', 'ate', 'nat', 'bat']));
  console.log(groupAnagrams(['']));
  console.log(groupAnagrams(['a']));
}

main();

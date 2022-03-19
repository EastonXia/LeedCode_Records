/**
  LeetCode136---只出现一次的数字
  
  给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

  说明：
  你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

  示例 1:
  输入: [2,2,1]
  输出: 1

  示例 2:
  输入: [4,1,2,1,2]
  输出: 4

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 利用哈希表
 */
var singleNumber = function (nums) {
  var map = new Map();
  for (var i = 0; i < nums.length; i++) {
    var count = map.get(nums[i]);
    if (count) {
      map.set(nums[i], ++count);
    } else {
      map.set(nums[i], 1);
    }
  }

  for (const [key, value] of map.entries()) {
    if (value === 1) {
      return key;
    }
  }

  return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 异或运算绝杀 a^b^a = a^a^b = b
 */
var singleNumber2 = function (nums) {
  var res = nums[0];
  if(nums.length < 2) return res;
  
  for(var i = 1; i < nums.length; i ++){
    res = res ^ nums[i];  
  }

  return res;
};

function main() {
  console.log(singleNumber([2, 2, 1]));
  console.log(singleNumber([4, 1, 2, 1, 2]));
  console.log(singleNumber2([2, 2, 1]));
  console.log(singleNumber2([4, 1, 2, 1, 2]));
}

main();

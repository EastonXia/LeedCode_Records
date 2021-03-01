import { readLine, close } from './utils/Input.js';

/**
  LeetCode01---两数之和

  给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回它们的数组下标。
  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。
  你可以按任意顺序返回答案。

  示例 1：
  输入：nums = [2,7,11,15], target = 9
  输出：[0,1]
  解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

  示例 2：
  输入：nums = [3,2,4], target = 6
  输出：[1,2]

  示例 3：
  输入：nums = [3,3], target = 6
  输出：[0,1]

  提示：
    2 <= nums.length <= 10^3
    -10^9 <= nums[i] <= 10^9
    -10^9 <= target <= 10^9
    只会存在一个有效答案 

**/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  // 初始化，建立哈希表
  var newMap = new Map([[nums[0], 0]]);

  for (var i = 1; i < nums.length; i++ ) {
    var other = target - nums[i];
    // 如果在哈希表中找到匹配 target - x的，直接返回下标
    if(newMap.get(other) !== undefined) {
      return [newMap.get(other), i];
    }
    // 否则添加到哈希表中
    newMap.set(nums[i], i);
  }

};

function main() {
  console.log(twoSum([2, 7, 11, 15], 9));
  console.log(twoSum([3, 2, 4], 6));
  console.log(twoSum([3, 3], 6));
}


/**
 * 运行的main函数
 **/
// async function main() {
//   // 逐行读取控制台输入
//   let i = await readLine();
//   while (+i !== 0) {
//     console.log(`你输入的是${i}`);
//     i = await readLine();
//   }
//   close();
// }

main();

/**
  LeetCode169---多数元素

  给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数 大于 ⌊ n/2 ⌋ 的元素。
  你可以假设数组是非空的，并且给定的数组总是存在多数元素。

  示例 1：
  输入：[3,2,3]
  输出：3

  示例 2：
  输入：[2,2,1,1,1,2,2]
  输出：2

  进阶：
    尝试设计时间复杂度为 O(n)、空间复杂度为 O(1) 的算法解决此问题。

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 哈希表
 * O(n),T(n)
 *
 */
var majorityElement = function (nums) {
  var map = new Map();

  for (var i = 0; i < nums.length; i++) {
    var num = nums[i];
    var count = map.get(num);
    if (count) {
      map.set(num, count + 1);
    } else {
      map.set(num, 1);
    }
  }

  for (var [key, value] of map.entries()) {
    if (value > nums.length / 2) {
      return key;
    }
  }

  return -1;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 排序法
 * O(nlogn), T(logn)
 *
 */
var majorityElement2 = function (nums) {
  nums.sort();
  return nums[Math.floor(nums.length / 2)];
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 摩尔投票法
 * O(n),T(1)
 *
 * 候选人(cand_num)初始化为nums[0]，票数count初始化为1。
 * 当遇到与cand_num相同的数，则票数count = count + 1，否则票数count = count - 1。
 * 当票数count为0时，更换候选人，并将票数count重置为1。
 * 遍历完数组后，cand_num即为最终答案。
 *
 * 为何这行得通呢？
 * 投票法是遇到相同的则票数 + 1，遇到不同的则票数 - 1。
 * 且“多数元素”的个数> ⌊ n/2 ⌋，其余元素的个数总和<= ⌊ n/2 ⌋。
 * 因此“多数元素”的个数 - 其余元素的个数总和 的结果 肯定 >= 1。
 * 这就相当于每个“多数元素”和其他元素 两两相互抵消，抵消到最后肯定还剩余至少1个“多数元素”。
 *
 */
var majorityElement3 = function (nums) {
  var candNum = nums[0]; // 定义候选人
  var count = 1; // 候选人计数

  for (var i = 1; i < nums.length; i++) {
    if (nums[i] === candNum) {
      count += 1;
    } else {
      count -= 1;
    }

    // 候选人计数等于0， 则换候选人，计数重置为1
    if (count === 0) {
      candNum = nums[i];
      count = 1;
    }
  }

  return candNum;
};

function main() {
  console.log(majorityElement([3, 2, 3]));
  console.log(majorityElement([2, 2, 1, 1, 1, 2, 2]));
  console.log(majorityElement2([3, 2, 3]));
  console.log(majorityElement2([2, 2, 1, 1, 1, 2, 2]));
  console.log(majorityElement3([3, 2, 3]));
  console.log(majorityElement3([2, 2, 1, 1, 1, 2, 2]));
}

main();

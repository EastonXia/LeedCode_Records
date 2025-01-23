/**
  LeetCode238---除自身以外数组的乘积
  
  给你一个整数数组 nums，返回 数组 answer ，其中 answer[i] 等于 nums 中除 nums[i] 之外其余各元素的乘积 。

  题目数据 保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内。

  请不要使用除法，且在 O(n) 时间复杂度内完成此题。

  示例 1:
  输入: nums = [1,2,3,4]
  输出: [24,12,8,6]

  示例 2:
  输入: nums = [-1,1,0,-3,3]
  输出: [0,0,9,0,0]

  提示：
    2 <= nums.length <= 10^5
    -30 <= nums[i] <= 30
    保证 数组 nums之中任意元素的全部前缀元素和后缀的乘积都在  32 位 整数范围内

  进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组不被视为额外空间。）

*/

/**
 * @param {number[]} nums
 * @return {number[]}
 *
 * 用两个数组，一个表示左侧所有数字的乘积，一个表示右侧所有数字的乘积
 *
 */
var productExceptSelf = function (nums) {
  const len = nums.length;
  const left = new Array(len); // 左侧数字乘积
  const right = new Array(len); // 右侧数字乘积
  const result = new Array(len); // 最终结果

  // 左侧数字处理
  left[0] = 1; // 0 的左侧没有数字，所以乘积为1
  for (let i = 1; i < len; i++) {
    left[i] = left[i - 1] * nums[i - 1];
  }

  // 右侧数字处理
  right[len - 1] = 1; // 最后一个数字的右侧没有数字，所以乘积为1
  for (let j = len - 2; j >= 0; j--) {
    right[j] = right[j + 1] * nums[j + 1];
  }

  // 最终结果
  for (let k = 0; k < len; k++) {
    result[k] = left[k] * right[k];
  }

  return result;
};

/**
 * @param {*} nums
 * @returns
 *
 * 其实可以不需要三个数组的，一个数组就行
 * 一个数组表示左侧的乘积，然后用一个变量表示当前数的右侧乘积
 * 依次刷新左侧数组的元素，最后得到得就是结果
 *
 */
var productExceptSelf2 = function (nums) {
  const len = nums.length;
  const answer = new Array(len); // 最终结果数组，一开始也是左侧数组

  // 左侧数字处理
  answer[0] = 1;
  for (let i = 1; i < len; i++) {
    answer[i] = answer[i - 1] * nums[i - 1];
  }

  let right = 1; // 右侧结果累计，有点类似滚动数组
  for (let j = len - 1; j >= 0; j--) {
    answer[j] = answer[j] * right;
    right = right * nums[j];
  }

  return answer;
};

function main() {
  console.log(productExceptSelf([1, 2, 3, 4]));
  console.log(productExceptSelf([-1, 1, 0, -3, 3]));
}

main();

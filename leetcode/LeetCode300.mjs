/**
  LeetCode300---最长递增子序列
  
  给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
  子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

  示例 1：
  输入：nums = [10,9,2,5,3,7,101,18]
  输出：4
  解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
  示例 2：
  输入：nums = [0,1,0,3,2,3]
  输出：4

  示例 3：
  输入：nums = [7,7,7,7,7,7,7]
  输出：1

  提示：
    1 <= nums.length <= 2500
    -10^4 <= nums[i] <= 10^4
   
  进阶：
   你能将算法的时间复杂度降低到 O(n log(n)) 吗?

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 动态规划
 *
 * dp[i]表示nums[i]结尾的最长子序列长度
 * dp[i] = max(dp[i], dp[j] + 1) for j in [0, i)
 * 只有当nums[j] < nums[i]时，才有比较的意义
 *
 */
var lengthOfLIS = function (nums) {
  const len = nums.length;
  const dp = new Array(len).fill(1);

  let result = 1;
  for (let i = 0; i < len; i++) {
    for (j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
      result = Math.max(result, dp[i]);
    }
  }

  return result;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 动态规划 + 二分
 *
 * 技巧性比较强
 * 新建一个数组cell，用来保存最长上升子序列
 *
 * 对原序列进行遍历，将每位元素二分插入 cell 中。
 *    如果 cell 中元素都比它小，将它插到最后
 *    否则，用它覆盖掉比它大的元素中最小的那个。
 *
 * 总之，思想就是让 cell 中存储比较小的元素。这样，cell 未必是真实的最长上升子序列，但长度是对的。
 *
 */
var lengthOfLIS = function (nums) {
  const len = nums.length;
  const cell = new Array(len).fill(0);

  let result = 0; // 表示结果的长度
  for (let num of nums) {
    let left = 0;
    let right = result; // 赋值给right指针，该指针初始化时在元素范围外的，要注意。

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      if (cell[mid] < num) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    cell[left] = num; // left会等于最后一轮的 mid + 1。
    if (result === right) result++;
  }

  return result;
};

function main() {
  console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]));
  console.log(lengthOfLIS([0, 1, 0, 3, 2, 3]));
  console.log(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]));
}

main();

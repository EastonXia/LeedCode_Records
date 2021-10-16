/**
  LeetCode33---搜索旋转排序数组

  整数数组 nums 按升序排列，数组中的值 互不相同 。
  在传递给函数之前，nums 在预先未知的某个下标 k（0 <= k < nums.length）上进行了 旋转，使数组变为 [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]（下标 从 0 开始 计数）。
  例如， [0,1,2,4,5,6,7] 在下标 3 处经旋转后可能变为 [4,5,6,7,0,1,2] 。
  给你 旋转后 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标，否则返回 -1 。

  示例 1：
  输入：nums = [4,5,6,7,0,1,2], target = 0
  输出：4

  示例 2：
  输入：nums = [4,5,6,7,0,1,2], target = 3
  输出：-1

  示例 3：
  输入：nums = [1], target = 0
  输出：-1
   
  提示：
    1 <= nums.length <= 5000
    -10^4 <= nums[i] <= 10^4
    nums 中的每个值都 独一无二
    题目数据保证 nums 在预先未知的某个下标上进行了旋转
    -10^4 <= target <= 10^4
   
  进阶：你可以设计一个时间复杂度为 O(log n) 的解决方案吗？

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * 二分法，边界情况需要花点时间去想
 * 
 */
var search = function (nums, target) {
  var left = 0;
  var right = nums.length - 1;
  var mid = 0;

  while (left <= right) { // 为什么有等于，因为最差情况要二分到只剩下一个元素。然后计算出mid从而返回下标。
    mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    if (nums[left] <= nums[mid]) { // left到mid是递增序列 如：[3, 4, 5, 6, 7]
      // 递增序列判断方便，num[left]必小于num[mid]
      // 所以判断target是否在递增序列进行二分
      // 因为nums[mid]在上面已经判断了，如果等于直接返回，所以只需考虑left的边界情况
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else { // left到mid非递增序列 如：[4, 5, 6, 7, 0, 1, 2]
      // 因为left到mid非递增序列，所以mid到right为递增序列
      // 同上在mid到right判断target进行二分
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};

function main() {
  console.log(search([4, 5, 6, 7, 0, 1, 2], 0));
  console.log(search([4, 5, 6, 7, 0, 1, 2], 3));
  console.log(search([1], 0));
  console.log(search([4, 5, 6, 7, 0, 1, 2], 6));
  console.log(search([1, 2, 3, 4, 5, 6], 4));
  console.log(search([4, 5, 6, 7, 8, 1, 2, 3], 8));
}

main();

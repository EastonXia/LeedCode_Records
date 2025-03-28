/**
 * 实现二分查找
 *
 * 确定一个数在一个有序数组中的位置
 *
 */

// 这里用了递归写法
const search = function (nums, target, start, end) {
  let targetIndex = -1;

  const mid = Math.floor((start + end) / 2);

  if (target === nums[mid]) return mid;

  if (start >= end) return targetIndex;

  if (target < nums[mid]) {
    return search(nums, target, start, mid - 1);
  } else if (target > nums[mid]) {
    return search(nums, target, mid + 1, end);
  }
};

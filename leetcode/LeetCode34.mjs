/**
  LeetCode34---在排序数组中查找元素的第一个和最后一个位置

  给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
  如果数组中不存在目标值 target，返回 [-1, -1]。

  进阶：
  你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
   
  示例 1：
  输入：nums = [5,7,7,8,8,10], target = 8
  输出：[3,4]

  示例 2：
  输入：nums = [5,7,7,8,8,10], target = 6
  输出：[-1,-1]

  示例 3：
  输入：nums = [], target = 0
  输出：[-1,-1]
   
  提示：
    0 <= nums.length <= 10^5
    -10^9 <= nums[i] <= 10^9
    nums 是一个非递减数组
    -10^9 <= target <= 10^9

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 * 二分法
 * 在一个范围内，查找一个数字，要求找到这个元素的开始位置和结束位置，这个范围内的数字都是单调递增的，即具有单调性质，因此可以使用二分来做。
 *
 * 模板一：
 * 当我们将区间[l, r]划分成[l, mid]和[mid + 1, r]时，其更新操作是r = mid或者l = mid + 1，计算mid时不需要加1，即mid = (l + r)/2。
 *
 * 模板二：
 * 当我们将区间[l, r]划分成[l, mid - 1]和[mid, r]时，其更新操作是r = mid - 1或者l = mid，此时为了防止死循环（二分剩下两个元素的时候），计算mid时需要加1，即mid = ( l + r + 1 ) /2。
 *
 */
var searchRange = function (nums, target) {
  var left = 0; // 二分法左指针
  var right = nums.length - 1; // 二分法右指针

  var start = -1; // 题目要求的开始位置
  var end = -1; // 题目要求的结束位置

  // 本质上取left < right 和 left <= right是没有任何区别的，只是习惯问题，如果取left <= right，只需要修改对应的更新区间即可。

  // 应用模板一
  while (left < right) {
    var mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  // 如果 nums[r] != target，说明数组中不存在目标值 target，返回 [-1, -1]。
  if (nums[right] !== target) return [start, end];

  // 二分的while循环的结束条件是l >= r，所以在循环结束时l有可能会大于r，此时就可能导致越界，因此，基本上二分问题优先取r都不会翻车。
  start = right;

  // 重置左右指针
  left = -1;
  right = nums.length - 1;

  // 应用模板二, 无论用哪个模板，仔细考虑剩下两个元素、一个元素的场景，做出相应的逻辑处理
  while (left < right) {
    var mid = Math.floor((left + right + 1) / 2);
    if (nums[mid] <= target) {
      left = mid;
    } else {
      right = mid  - 1;
    }
  }
  end = right;

  return [start, end];
};

function main() {
  console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
  console.log(searchRange([5, 7, 7, 8, 8, 10], 6));
  console.log(searchRange([], 0));
}

main();

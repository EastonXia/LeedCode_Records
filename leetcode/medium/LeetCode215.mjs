/**
  LeetCode215---数组中的第K个最大元素
  给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
  请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

  示例 1:
  输入: [3,2,1,5,6,4] 和 k = 2
  输出: 5

  示例 2:
  输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
  输出: 4
   
  提示：
    1 <= k <= nums.length <= 10^4
    -10^4 <= nums[i] <= 10^4
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 * 减而治之
 *
 * 在「快速排序」的时候，会学到 partition（切分），通过 partition 操作使得：
 * 对于某个下标 j，nums[j] 已经排定，即 nums[j] 经过 partition（切分）操作以后会放置在它「最终应该放置的地方」。而且：
 *  nums[left] 到 nums[j - 1] 中的所有元素都不大于 nums[j]；
 *  nums[j + 1] 到 nums[right] 中的所有元素都不小于 nums[j]。
 */
var findKthLargest = function (nums, k) {
  const len = nums.length;
  let left = 0;
  let right = len - 1;

  const target = len - k; // 经过partition后，nums[target] 右边的元素都会比nums[target] 大。

  // 不断缩小范围，直到index === target为止
  while (true) {
    const index = partition(nums, left, right);
    if (index === target) {
      return nums[index];
    } else if (index < target) {
      left = index + 1;
    } else if (index > target) {
      right = index - 1;
    }
  }
};

/**
 * @param {*} nums
 * @param {*} left
 * @param {*} right
 */
var partition = function (nums, left, right) {
  const pivot = nums[left];
  let j = left;

  // 遍历完成后，将满足 nums[left + 1..j] < pivot，并且 nums(j..i) >= pivot，nums[left] = pivot
  for (let i = left + 1; i <= right; i++) {
    // 如果nums[i] 大于 pivot 的将跳过，此时i继续增加，j不变
    if (nums[i] < pivot) {
      j += 1;
      [nums[j], nums[i]] = [nums[i], nums[j]] // 交换
    }
  }

  // 交换以后 nums[left..j - 1] < pivot, nums[j] = pivot, nums[j + 1..right] >= pivot
  [nums[left], nums[j]] = [nums[j], nums[left]]; // 交换

  return j;
};

function main() {
  console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));
  console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4));
}

main();

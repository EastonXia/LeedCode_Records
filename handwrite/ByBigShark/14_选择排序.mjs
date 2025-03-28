/**
 * 实现选择排序
 *
 */

const selectSort = function (nums) {
  const len = nums.length;

  let minIndex;

  for (let i = 0; i < len; i++) {
    minIndex = i;

    for (let j = i; j < len; j++) {
      if (nums[j] < nums[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [nums[i], nums[minIndex]] = [nums[minIndex], nums[i]];
    }
  }

  return nums;
};

/**
 * 实现插入排序
 *
 */

const insertSort = function (nums) {
  const len = nums.length;

  for (let i = 1; i < len; i++) {
    let j = i;
    const target = nums[j]; // 目标数字，用作插入比较，以及最后的插入。

    while (j > 0 && nums[j - 1] > target) {
      nums[j] = nums[j - 1];
      j -= 1;
    }
    
    nums[j] = target;
  }

  return nums;
};

console.log(insertSort([3, 6, 2, 4, 1]));

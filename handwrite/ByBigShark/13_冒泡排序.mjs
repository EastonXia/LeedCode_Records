/**
 * 实现冒泡排序
 *
 */

const bubbleSort = function (nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; 
      }
    }
  }

  return nums;
};

// 优化
const bubbleSort2 = function (nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    let flag = true;   // 这个flag的含义是：如果`某次循环`中没有交换过元素，那么意味着排序已经完成

    for (let j = 0; j < len - 1; j++) {
      if (nums[j] > nums[j + 1]) {
        flag = false;
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]]; 
      }
    }

    if(flag) break;
  }

  return nums;
};
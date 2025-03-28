/**
 * 实现归并排序
 *
 */

const mergeSort = function (nums) {
  const len = nums.length;

  if (len < 2) return nums;

  const mid = Math.floor(len / 2);
  const left = mergeSort(nums.slice(0, mid));
  const right = mergeSort(nums.slice(mid));

  return merge(left, right);
};

// 两数组的元素逐个比较，谁小就先进数组
const merge = function (left, right) {
  const result = [];

  let i = 0; // left数组的指针
  let j = 0; // right数组的指针

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i]);
      i += 1;
    } else {
      result.push(result[j]);
      j += 1;
    }
  }

  if (i < left.length) {
    result.push(...left.slice(i));
  }
  if (j < right.length) {
    result.push(...right.slice(j));
  }

  return result;
};

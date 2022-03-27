/**
  LeetCode189---轮转数组

  给你一个数组，将数组中的元素向右轮转 k 个位置，其中 k 是非负数。

  示例 1:
  输入: nums = [1,2,3,4,5,6,7], k = 3
  输出: [5,6,7,1,2,3,4]
  解释:
  向右轮转 1 步: [7,1,2,3,4,5,6]
  向右轮转 2 步: [6,7,1,2,3,4,5]
  向右轮转 3 步: [5,6,7,1,2,3,4]

  示例 2:
  输入：nums = [-1,-100,3,99], k = 2
  输出：[3,99,-1,-100]
  解释: 
  向右轮转 1 步: [99,-1,-100,3]
  向右轮转 2 步: [3,99,-1,-100]
  
  提示：
    1 <= nums.length <= 10^5
    -2^31 <= nums[i] <= 2^31 - 1
    0 <= k <= 10^5
  
  进阶：
    尽可能想出更多的解决方案，至少有 三种 不同的方法可以解决这个问题。
    你可以使用空间复杂度为 O(1) 的 原地 算法解决这个问题吗？

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 *
 * 不用常量级空间的话，有很多方法的随便写
 * 下面安排一下常量空间方法
 *
 * 数组翻转:
 *  首先对整个数组实行翻转，这样子原数组中需要翻转的子数组，就会跑到数组最前面。
 *  这时候，从 k 处分隔数组，左右两数组，各自进行翻转即可。
 *
 */
var rotate = function (nums, k) {
  k %= nums.length;

  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
};

/**
 * @param {*} arr
 * @param {*} start
 * @param {*} end
 *
 * 由于Array.prototype.reverse()不能指定数组位置进行反转，故重写reverse
 */
var reverse = function (arr, start, end) {
  while (start < end) {
    var temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start += 1;
    end -= 1;
  }
};

function main() {
  console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
  console.log(rotate([-1, -100, 3, 99], 2));
}

main();

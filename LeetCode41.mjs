/**
  LeetCode41---缺失的第一个正数 

  给你一个未排序的整数数组 nums ，请你找出其中没有出现的最小的正整数。
  请你实现时间复杂度为 O(n) 并且只使用常数级别额外空间的解决方案。

  示例 1：
  输入：nums = [1,2,0]
  输出：3

  示例 2：
  输入：nums = [3,4,-1,1]
  输出：2
  
  示例 3：
  输入：nums = [7,8,9,11,12]
  输出：1

  提示：
    1 <= nums.length <= 5 * 10^5
    -2^31 <= nums[i] <= 2^31 - 1

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 方法一：哈希表
 *
 * 利用哈希表把数组中的数值都记录下来
 * 然后从数字1开始遍历，如果哈希表中的包含当前数值，则继续遍历，直到找不到当前数值为止
 *
 */
var firstMissingPositive = function (nums) {
  const len = nums.length;

  const set = new Set();
  for (let num of nums) {
    set.add(num);
  }

  for (let i = 1; i <= len; i++) {
    if (!set.has(i)) {
      return i;
    }
  }

  return len + 1;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 方法二：原地哈希
 * 可以做到空间复杂度O(1)
 *
 * 把数组元素num的值，与值对应 下标位置 - 1 的num交换
 * 最后得到 [1,2,3,...] 这种结果，如果发现了某的下标index对应的元素的值不是index + 1，那么index + 1 就是我们要的结果
 *
 */
var firstMissingPositive2 = function (nums) {
  const len = nums.length;

  for (let i = 0; i < len; i++) {
    // 满足三个条件：num值大于0，小于数组长度，出现在理想位置的，就不用交换
    // 交换一次后，nums[i]得到新的值，可能还可以继续交换，所以需要用while。
    while (nums[i] > 0 && nums[i] <= len && nums[i] !== nums[nums[i] - 1]) {
      const temp = nums[nums[i] - 1];
      nums[nums[i] - 1] = nums[i];
      nums[i] = temp;
    }
  }

  for (let i = 0; i < len; i++) {
    if (nums[i] !== i + 1) {
      return i + 1;
    }
  }

  return len + 1;
};

function main() {
  // console.log(firstMissingPositive([1, 2, 0]));
  console.log(firstMissingPositive2([3, 4, -1, 1]));
  // console.log(firstMissingPositive([7, 8, 9, 11, 12]));
}

main();

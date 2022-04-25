/**
  LeetCode268---丢失的数字
  
  给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

  示例 1：
  输入：nums = [3,0,1]
  输出：2
  解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。

  示例 2：
  输入：nums = [0,1]
  输出：2
  解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。

  示例 3：
  输入：nums = [9,6,4,2,3,5,7,0,1]
  输出：8
  解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。

  示例 4：
  输入：nums = [0]
  输出：1
  解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。

  提示：
    n == nums.length
    1 <= n <= 104
    0 <= nums[i] <= n
    nums 中的所有数字都 独一无二
   

  进阶：你能否实现线性时间复杂度、仅使用额外常数空间的算法解决此问题?

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 此题简单点可以用排序或者数组哈希去做，没什么难度，有点难度的在下面
 *
 * 原地哈希
 * 我们可以将 nums 本身作为哈希表进行使用
 * 将 nums[i] 放到其应该出现的位置上
 * 然后遍历nums，找出答案
 *
 */
var missingNumber = function (nums) {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    const val = nums[i];

    // val是不能等于n的，不然元素交换会溢出
    if (val !== i && val < n) {
      const temp = nums[i];
      nums[i] = nums[val];
      nums[val] = temp;
      i -= 1; // 这里要做一个减1操作，因为不知道交换后的nums[i]，其位置的正确性。
    }
  }

  // 遍历nums找出答案
  for (let j = 0; j < n; j++) {
    if (nums[j] !== j) return j;
  }

  return n;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 作差法
 * 我们知道[0, n]的结果可以通过等差数列的公式算出
 * 题目中缺少了其中的一个数字
 * 通过作差就可以得到缺少数字的值
 *
 */
var missingNumber = function (nums) {
  const n = nums.length;
  
  const sum1 = Math.floor((n * (n + 1)) / 2);

  let sum2 = 0;
  for (let i = 0; i < n; i++) {
    sum2 += nums[i];
  }

  return sum1 - sum2;
};

function main() {
  // console.log(missingNumber([3, 0, 1]));
  // console.log(missingNumber([0, 1]));
  console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]));
  console.log(missingNumber([0]));
}

main();

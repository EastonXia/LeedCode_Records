/**
  LeetCode287---寻找重复数
  
  给定一个包含 n + 1 个整数的数组 nums ，其数字都在 [1, n] 范围内（包括 1 和 n），可知至少存在一个重复的整数。
  假设 nums 只有 一个重复的整数 ，返回 这个重复的数 。
  你设计的解决方案必须 不修改 数组 nums 且只用常量级 O(1) 的额外空间。

  示例 1：
  输入：nums = [1,3,4,2,2]
  输出：2

  示例 2：
  输入：nums = [3,1,3,4,2]
  输出：3

  提示：
    1 <= n <= 10^5
    nums.length == n + 1
    1 <= nums[i] <= n
    nums 中 只有一个整数 出现 两次或多次 ，其余整数均只出现 一次
   
  进阶：
    如何证明 nums 中至少存在一个重复的数字?
    你可以设计一个线性级时间复杂度 O(n) 的解决方案吗？

*/

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 快慢指针
 *
 * 基于题目数组的特殊性，可以把数组看作一个链表
 * point = nums[point]; // 等同于 next = next->next;
 *
 * 看成一个链表后，该链表就会存在一个环，通过Floyd判圈法就可以找出环的入口
 *
 */
var findDuplicate = function (nums) {
  // 判断模拟链表中是否存在环
  let slow = 0;
  let fast = 0;
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }

  // 存在环后，找出环的入口
  let finder = 0;
  while (true) {
    finder = nums[finder];
    slow = nums[slow];
    if (finder === slow) break;
  }

  return finder;
};

/**
 * @param {number[]} nums
 * @return {number}
 *
 * 二分查找
 *
 * 因为题目要找的是一个整数，并且这个整数有明确的范围[1, 2,.., n]，所以可以使用「二分查找」。
 *
 * 二分查找的思路是先猜一个数（有效范围 [left..right] 里位于中间的数 mid），然后统计原始数组中 小于等于 mid 的元素的个数 cnt：
 *    如果 cnt 严格大于 mid。根据抽屉原理，重复元素就在区间 [left..mid] 里；
 *    否则，重复元素就在区间 [mid + 1..right] 里。
 * 
 * 因为题目的特殊性，这道题基本没利用到数组，玩的纯纯就是数字
 *
 */
var findDuplicate2 = function (nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2); // 虽然是mid，但其意义是数组中的随机元素

    // 统计小于随机元素的个数
    let count = 0;
    for (let num of nums) {
      if (num <= mid) {
        count += 1;
      }
    }

    if (count > mid) {
      right = mid; // 重复元素位于区间 [left..mid]
    } else {
      left = mid + 1;  // if 分析正确了以后，else 搜索的区间就是 if 的反面区间 [mid + 1..right]
    }
  }

  return left;
};

function main() {
  console.log(findDuplicate([1, 3, 4, 2, 2]));
  console.log(findDuplicate([3, 1, 3, 4, 2]));
}

main();

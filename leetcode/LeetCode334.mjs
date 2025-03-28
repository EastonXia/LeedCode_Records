/**
  LeetCode334---递增的三元子序列
  
  给你一个整数数组 nums ，判断这个数组中是否存在长度为 3 的递增子序列。

  如果存在这样的三元组下标 (i, j, k) 且满足 i < j < k ，使得 nums[i] < nums[j] < nums[k] ，返回 true ；否则，返回 false 。

  示例 1：
  输入：nums = [1,2,3,4,5]
  输出：true
  解释：任何 i < j < k 的三元组都满足题意

  示例 2：
  输入：nums = [5,4,3,2,1]
  输出：false
  解释：不存在满足题意的三元组

  示例 3：
  输入：nums = [2,1,5,0,4,6]
  输出：true
  解释：三元组 (3, 4, 5) 满足题意，因为 nums[3] == 0 < nums[4] == 4 < nums[5] == 6
   
  提示：
    1 <= nums.length <= 5 * 10^5
    -2^31 <= nums[i] <= 2^31 - 1

*/

/**
 * @param {number[]} nums
 * @return {boolean}
 *
 * 双向遍历
 *
 * 定义一个当前元素nums[i]的左边，比nums[i]小的最小值元素，leftMin数组。
 * 定义一个当前元素nums[i]的右边，比nums[i]大的最大值元素，rightMax数组。
 *
 * 利用两次循环得出leftMin[]和rightMax[]
 *
 * 遍历一遍原数组找出符合 leftMin[i - 1] < nums[i] < rightMax[i + 1]
 *
 */
var increasingTriplet = function (nums) {
  const len = nums.length;
  if (len < 3) return false;

  // 处理leftMin
  const leftMin = new Array(len);
  leftMin[0] = nums[0];
  for (let i = 1; i < len; i++) {
    leftMin[i] = Math.min(leftMin[i - 1], nums[i]);
  }

  // 处理rightMax
  const rightMax = new Array(len);
  rightMax[len - 1] = nums[len - 1];
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], nums[i]);
  }

  // 最后比较，注意遍历范围
  for (let i = 1; i < len - 1; i++) {
    if (nums[i] > leftMin[i - 1] && nums[i] < rightMax[i + 1]) {
      return true;
    }
  }

  return false;
};

/**
 * @param {number[]} nums
 * @return {boolean}
 *
 * 贪心
 *
 * 新建两个变量 small 和 mid ，分别用来保存题目要我们求的长度为 3 的递增子序列的最小值和中间值。
 *
 * 接着，我们遍历数组，每遇到一个数字，我们将它和 small 和 mid 相比，若小于等于 small ，则替换 small；
 * 否则，若小于等于 mid，则替换 mid；
 * 否则，若大于 mid，则说明我们找到了长度为 3 的递增数组！
 *
 * 我们更新了 small ，这个 small 在 mid 后面，没有严格遵守递增顺序，
 * 但它隐含着的真相是，有一个比 small 大比 mid 小的最小值出现在 mid 之前。
 * 因此，当后续出现比 mid 大的值的时候，我们一样可以通过当前 small 和 mid 推断的确存在着长度为 3 的递增序列。
 *
 */
var increasingTriplet2 = function (nums) {
  const len = nums.length;
  if (len < 3) return false;

  let small = nums[0];
  let mid = Number.MAX_VALUE;

  for (let i = 1; i < len; i++) {
    if (nums[i] > mid) {
      return true;
    } else if (nums[i] > small) {
      mid = nums[i];
    } else {
      small = nums[i];
    }
  }

  return false;
};

function main() {
  console.log(increasingTriplet([1, 2, 3, 4, 5]));
  console.log(increasingTriplet([5, 4, 3, 2, 1]));
  console.log(increasingTriplet([2, 1, 5, 0, 4, 6]));
}

main();

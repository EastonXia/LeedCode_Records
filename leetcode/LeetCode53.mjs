/**
  LeetCode53---最大子序和

  给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

  示例 1：
  输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
  输出：6
  解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
  
  示例 2：
  输入：nums = [1]
  输出：1

  示例 3：
  输入：nums = [0]
  输出：0

  示例 4：
  输入：nums = [-1]
  输出：-1

  示例 5：
  输入：nums = [-100000]
  输出：-100000
 
  提示：
    1 <= nums.length <= 105
    -104 <= nums[i] <= 104
 
*/

/**
 * @param {number[]} nums
 * @return {number}
 * 动态规划
 * 题目中的限制点，必须是连续的子数组，利用此特点解题
 * 设f(i)为以i结尾的最大和的连续子数组，它与f(i - 1)的关系为
 * f(i) = max(f(i - 1) + nums[i], nums[i])
 * 解释为nums[i]是要加入f(n - 1)还是自己另起作为新连续子数组的开头，通过比较两者的大小决定
 * 到最后，我们可以得到一个数组list，list[i] = f(i)，从list中找出最大值
 */
var maxSubArray = function (nums) {
  var pre = 0; // 由于f(i)至于f(i - 1)有联系，而且前面的f(1...i - 2)题目中用不上，所以用一个变量代替数组，类似滚动数组思想
  var ans = nums[0]; // f(1...nums.length -1)的最大值

  for (var i = 0; i < nums.length; i++) {
    pre = Math.max(pre + nums[i], nums[i]); // nums[i]是要加入f(n - 1)还是自己另起作为新连续子数组的开头
    ans = Math.max(ans, pre); // 最大值比较
  }
  return ans;
};

function main() {
  console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
  console.log(maxSubArray([1]));
  console.log(maxSubArray([0]));
  console.log(maxSubArray([-100000]));
}

main();

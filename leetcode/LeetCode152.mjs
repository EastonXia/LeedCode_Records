/**
  LeetCode152---乘积最大子数组

  给你一个整数数组 nums ，请你找出数组中乘积最大的非空连续子数组（该子数组中至少包含一个数字），并返回该子数组所对应的乘积。
  测试用例的答案是一个 32-位 整数。
  子数组 是数组的连续子序列。

  示例 1:
  输入: nums = [2,3,-2,4]
  输出: 6
  解释: 子数组 [2,3] 有最大乘积 6。
  示例 2:
  输入: nums = [-2,0,-1]
  输出: 0
  解释: 结果不能为 2, 因为 [-2,-1] 不是子数组。
   
  提示:
    1 <= nums.length <= 2 * 10^4
    -10 <= nums[i] <= 10
    nums 的任何前缀或后缀的乘积都 保证 是一个 32-位 整数
*/

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * 动态规划
 * 
 * 考虑当前位置如果是一个负数的话，那么我们希望以它前一个位置结尾的某个段的积也是个负数，这样就可以负负得正，并且我们希望这个积尽可能「负得更多」，即尽可能小。
 * 如果当前位置是一个正数的话，我们更希望以它前一个位置结尾的某个段的积也是个正数，并且希望它尽可能地大。
 * 所以除了要维护一个最大值得dp数组外，还要维护一个最小值的dp数组
 * 
 */
var maxProduct = function (nums) {
  var len = nums.length;
  var dpMax = new Array(len);
  var dpMin = new Array(len);

  var ans = nums[0];
  dpMax[0] = nums[0];
  dpMin[0] = nums[0];

  for (var i = 1; i < len; i++) {
    // 可以考虑把 nums[i] 加入第i-1个元素结尾的乘积最大或最小的子数组的乘积中
    // 二者加上nums[i]，三者取大，就是第i个元素结尾的乘积最大子数组的乘积
    dpMax[i] = Math.max(
      dpMax[i - 1] * nums[i],
      Math.max(dpMin[i - 1] * nums[i], nums[i])
    );

    // dpMin同理
    dpMin[i] = Math.min(
      dpMin[i - 1] * nums[i],
      Math.min(dpMax[i - 1] * nums[i], nums[i])
    );

    // 最后答案去dpMax作比较
    ans = Math.max(ans, dpMax[i]);
  }

  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * 滚动数组优化空间，此处每次只需用到上一个的状态，故只需定义一个变量就行
 * 
 */
var maxProduct2 = function (nums) {
  var len = nums.length;

  var ans = nums[0];
  var dpMax = nums[0];
  var dpMin = nums[0];

  for (var i = 1; i < len; i++) {
    // 保持上一个变量的状态，这里要临时赋值
    var smax = dpMax;
    var smin = dpMin;

    dpMax = Math.max(
      smax * nums[i],
      Math.max(smin * nums[i], nums[i])
    );
    dpMin = Math.min(
      smin * nums[i],
      Math.min(smax * nums[i], nums[i])
    );

    ans = Math.max(ans, dpMax);
  }

  return ans;
};

function main() {
  console.log(maxProduct([2, 3, -2, 4]));
  console.log(maxProduct([-2, 0, -1]));
}

main();

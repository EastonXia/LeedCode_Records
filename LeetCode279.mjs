/**
  LeetCode279---完全平方数
  
  给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

  完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。

  示例 1：
  输入：n = 12
  输出：3 
  解释：12 = 4 + 4 + 4

  示例 2：
  输入：n = 13
  输出：2
  解释：13 = 4 + 9
   
  提示：
    1 <= n <= 10^4

*/

/**
 * @param {number} n
 * @return {number}
 *
 * 动态规划
 * 
 * dp[i]表示当前数字完全平方数的最小数量
 * dp[i]可以表示为 1 + dp[k], 1表示一个平方数，该平方数是j，dp[k] = dp[i - j * j]
 * 因为已经确定了至少有一个平方数了，所以我们需要找出使 dp[k] 最小的平方数 j，从而使 dp[i] 最小
 * 
 * 其实并不存在 dp[0] 的，为了计算方便我们初始化需要添加
 *
 */
var numSquares = function (n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n + 1; i++) {
    dp[i] = i;
    for (let j = 1; i - j * j >= 0; j++) {
      dp[i] = Math.min(dp[i], 1 + dp[i - j * j]);
    }
  }

  return dp[n];
};

function main() {
  console.log(numSquares(12))
  console.log(numSquares(13))
}

main();

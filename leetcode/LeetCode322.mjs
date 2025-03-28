/**
  LeetCode322---零钱兑换
  
  给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
  计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
  你可以认为每种硬币的数量是无限的。

  示例 1：
  输入：coins = [1, 2, 5], amount = 11
  输出：3 
  解释：11 = 5 + 5 + 1

  示例 2：
  输入：coins = [2], amount = 3
  输出：-1

  示例 3：
  输入：coins = [1], amount = 0
  输出：0

  提示：
    1 <= coins.length <= 12
    1 <= coins[i] <= 2^31 - 1
    0 <= amount <= 10^4

*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 *
 * 动态规划
 *
 * dp[i]表示当前正数amount所需要的最少硬币数
 * dp[i] = min(dp[i - k] + 1)   0 < k <= i
 * 其中 k 可以经过 coins[j] 过滤，只考虑数组coins中有的元素
 *
 */
var coinChange = function (coins, amount) {
  const len = coins.length;
  // 这里初始化设为amount + 1，因为后面是做最小值比较，amount + 1 已经是超出最差的情况了
  const dp = new Array(amount + 1).fill(amount + 1);

  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let j = 0; j < len; j++) {
      // 保证 i - coins[j] >= 0
      if (coins[j] <= i) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1);
      }
    }
  }

  return dp[amount] > amount ? -1 : dp[amount];
};

function main() {
  console.log(coinChange([1, 2, 5], 11));
  console.log(coinChange([2], 3));
  console.log(coinChange([1], 0));
}

main();

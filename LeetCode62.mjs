/**
  LeetCode62---不同路径
  
  一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
  机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。
  问总共有多少条不同的路径？

  示例 1：
  输入：m = 3, n = 7
  输出：28

  示例 2：
  输入：m = 3, n = 2
  输出：3
  解释：
  从左上角开始，总共有 3 条路径可以到达右下角。
  1. 向右 -> 向下 -> 向下
  2. 向下 -> 向下 -> 向右
  3. 向下 -> 向右 -> 向下

  示例 3：
  输入：m = 7, n = 3
  输出：28

  示例 4：
  输入：m = 3, n = 3
  输出：6
   
  提示：
    1 <= m, n <= 100
    题目数据保证答案小于等于 2 * 109

*/

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 * 
 * 动态规划
 * 
 * 二位数组动态规划 dp(i,j) = dp(i-1, j) + dp(i, j-1) (1 <= i <= m, 1 <= j <= n)
 */
var uniquePaths = function (m, n) {
  var res = new Array(m).fill(0).map(() => new Array(n).fill(0)); // 创建dp二维数组

  // 初始化第一行
  for (var i = 0; i < n; i++) {
    res[0][i] = 1;
  }

  // 初始化第一列
  for (var i = 0; i < m; i++) {
    res[i][0] = 1;
  }

  // 开始动态规划
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      res[i][j] = res[i - 1][j] + res[i][j - 1];
    }
  }

  return res[m - 1][n - 1]; // 返回右下角元素即为答案
};

function main() {
  console.log(uniquePaths(3, 7));
  console.log(uniquePaths(3, 2));
  console.log(uniquePaths(7, 3));
  console.log(uniquePaths(3, 3));
}

main();
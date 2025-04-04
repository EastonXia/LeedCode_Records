/**
  LeetCode48---旋转图像

  给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
  你必须在 原地 旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要 使用另一个矩阵来旋转图像。

  示例 1：
  输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
  输出：[[7,4,1],[8,5,2],[9,6,3]]
  
  示例 2：
  输入：matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
  输出：[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
   
  提示：
    n == matrix.length == matrix[i].length
    1 <= n <= 20
    -1000 <= matrix[i][j] <= 1000

*/

/**
 * @param {number[][]} matrix
 * @return {void}
 *
 * 理清楚交换前后的位置关系，就能够顺利解出此题
 * 对于矩阵中的元素 matrix[row][col]，在旋转后，它的新位置为 matrix[col][n−row−1]。
 * 由于我们要在原数组上操作，所以还要对新位置进行交换
 * 最后得出的公式为：
 *   temp = matrix[row][col]
 *   matrix[row][col] = matrix[n−col−1][row]
 *   matrix[n−col−1][row] = matrix[n−row−1][n−col−1]
 *   matrix[n−row−1][n−col−1] = matrix[col][n−row−1]
 *   matrix[col][n−row−1] = temp
 *
 */
var rotate = function (matrix) {
  const n = matrix.length;
  for (let i = 0; i < Math.floor(n / 2); ++i) {
    // 保证n为奇数时也能全部遍历完，所以要 n + 1
    for (let j = 0; j < Math.floor((n + 1) / 2); ++j) { 
      const temp = matrix[i][j];
      matrix[i][j] = matrix[n - j - 1][i];
      matrix[n - j - 1][i] = matrix[n - i - 1][n - j - 1];
      matrix[n - i - 1][n - j - 1] = matrix[j][n - i - 1];
      matrix[j][n - i - 1] = temp;
    }
  }
};

function main() {
  console.log(
    rotate([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  );
  console.log(
    permute([
      [5, 1, 9, 11],
      [2, 4, 8, 10],
      [13, 3, 6, 7],
      [15, 14, 12, 16],
    ])
  );
}

main();

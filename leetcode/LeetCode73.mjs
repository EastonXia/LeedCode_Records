/**
  LeetCode73---矩阵置零
  
  给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

  进阶：
  一个直观的解决方案是使用 O(mn) 的额外空间，但这并不是一个好的解决方案。
  一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
  你能想出一个仅使用常量空间的解决方案吗？
   
  示例 1：
  输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
  输出：[[1,0,1],[0,0,0],[1,0,1]]

  示例 2：
  输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
  输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]
   
  提示：
    m == matrix.length
    n == matrix[0].length
    1 <= m, n <= 200
    -2^31 <= matrix[i][j] <= 2^31 - 1
*/

/**
 * @param {number[][]} matrix
 * @return {void}
 *
 * 使用标记数组 O(m + n)
 * 用两个标记数组分别记录每一行和每一列是否有零出现
 * 如果某个元素为 0，那么就将该元素所在的行和列所对应标记数组的位置置为 true
 */
var setZeroes = function (matrix) {
  var m = matrix.length;
  var n = matrix[0].length;

  // 定义标记数组
  var row = new Array(m).fill(false);
  var col = new Array(n).fill(false);

  // 做标记
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === 0) {
        row[i] = col[j] = true;
      }
    }
  }

  // 根据标记重新更新数组
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (row[i] || col[j]) {
        matrix[i][j] = 0;
      }
    }
  }
};

/**
 * @param {number[][]} matrix
 * @return {void}
 *
 * 使用两个标记变量
 * 用矩阵的第一行和第一列代替方法一中的两个标记数组，以达到 O(1) 的额外空间。
 * 需要额外使用两个标记变量分别记录第一行和第一列是否原本包含 0。
 */
var setZeroes2 = function (matrix) {
  var m = matrix.length;
  var n = matrix[0].length;

  var rowSign = false; // 第一行是否出现过0的标记
  var colSign = false; // 第一列是否出现过0的标记

  // 遍历第一行、第一列找是否出现过0
  for (var i = 0; i < n; i++) {
    if (matrix[0][i] === 0) {
      rowSign = true;
    }
  }
  for (var i = 0; i < m; i++) {
    if (matrix[i][0] === 0) {
      colSign = true;
    }
  }

  // 遍历剩余行、列，如果出现0，则记录在第一行、第一列
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      if (matrix[i][j] === 0) {
        matrix[0][j] = 0;
        matrix[i][0] = 0;
      }
    }
  }

  // 根据第一行、第一列的标记更新数组(除第一行、第一列)
  for (var i = 1; i < m; i++) {
    for (var j = 1; j < n; j++) {
      if (!matrix[i][0] || !matrix[0][j]) {
        matrix[i][j] = 0;
      }
    }
  }

  // 更新第一行
  if (rowSign) {
    for (var i = 0; i < n; i++) {
      matrix[0][i] = 0;
    }
  }

  // 更新第一列
  if (colSign) {
    for (var i = 0; i < m; i++) {
      matrix[i][0] = 0;
    }
  }
};

/**
 * @param {number[][]} matrix
 * @return {void}
 *
 * 使用一个标记变量
 * 只使用一个标记变量记录第一列是否原本存在 0。这样，第一列的第一个元素即可以标记第一行是否出现 0。
 * 但为了防止每一列的第一个元素被提前更新，我们需要从最后一行开始，倒序地处理矩阵元素。
 */
var setZeroes3 = function (matrix) {};

function main() {
  console.log(
    setZeroes([
      [1, 1, 1],
      [1, 0, 1],
      [1, 1, 1],
    ])
  );
  console.log(
    setZeroes([
      [0, 1, 2, 0],
      [3, 4, 5, 2],
      [1, 3, 1, 5],
    ])
  );
}

main();

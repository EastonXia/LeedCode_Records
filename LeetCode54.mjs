/**
  LeetCode54---螺旋矩阵
  
  给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。

  示例 1：
  输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
  输出：[1,2,3,6,9,8,7,4,5]

  示例 2：
  输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  输出：[1,2,3,4,8,12,11,10,9,5,6,7]
  
  提示：
    m == matrix.length
    n == matrix[i].length
    1 <= m, n <= 10
    -100 <= matrix[i][j] <= 100
 
*/

/**
 * @param {number[][]} matrix
 * @return {number[]}
 *
 * 按层模拟
 * 可以将矩阵看成若干层，首先输出最外层的元素，其次输出次外层的元素，直到输出最内层的元素。
 * 假设当前层的左上角位于 (top, left)，右下角位于 (bottom, right)，按照如下顺序遍历当前层的元素。
 *
 * [[1, 1, 1, 1, 1, 1, 1],
 *  [1, 2, 2, 2, 2, 2, 1], 上：(top, left)......(top, right)
 *  [1, 2, 3, 3, 3, 2, 1], 右：(top + 1, right)......(bottom, right)
 *  [1, 2, 2, 2, 2, 2, 1], 下：(bottom, right - 1)......(bottom, left + 1)
 *  [1, 1, 1, 1, 1, 1, 1]] 左：(bottom, left)......(top + 1, left)
 *
 * 遍历完当前层的元素之后，将 left 和 top 分别增加 1，将 right 和 bottom 分别减少 1，进入下一层继续遍历，直到遍历完所有元素为止。
 *
 */
var spiralOrder = function (matrix) {
  if (!matrix.length || !matrix[0].length) {
    return [];
  }

  var row = matrix.length - 1; // 获取行数
  var col = matrix[0].length - 1; // 获取列数
  var res = []; // 最终结果
  var [top, left, bottom, right] = [0, 0, row, col]; // 解构写法

  while (top <= bottom && left <= right) {
    // 上部分遍历
    for (var i = left; i <= right; i++) {
      res.push(matrix[top][i]);
    }
    // 右部分遍历
    for (var i = top + 1; i <= bottom; i++) {
      res.push(matrix[i][right]);
    }
    
    // 如果这一层只有1行或1列，那么第一、二个循环已经将其打印了，这里就不需要打印了
    if (left < right && top < bottom) {
      // 下部分遍历
      for (var i = right - 1; i > left; i--) {
        res.push(matrix[bottom][i]);
      }
      // 左部分遍历
      for (var i = bottom; i > top; i--) {
        res.push(matrix[i][left]);
      }
    }

    [left, right, top, bottom] = [left + 1, right - 1, top + 1, bottom - 1]; // 解构写法
  }
  return res;
};

function main() {
  console.log(
    spiralOrder([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ])
  );
  console.log(
    spiralOrder([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ])
  );
}

main();

/**
  LeetCode695---岛屿的最大面积
  
  给你一个大小为 m x n 的二进制矩阵 grid 。
  岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。
  岛屿的面积是岛上值为 1 的单元格的数目。
  计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。

  示例 1：
  输入：grid = [
    [0,0,1,0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,1,1,0,1,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,1,0,1,0,0],
    [0,1,0,0,1,1,0,0,1,1,1,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,0,0,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,1,1,0,0,0,0]
  ]
  输出：6
  解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。

  示例 2：
  输入：grid = [[0,0,0,0,0,0,0,0]]
  输出：0
  
  提示：

  m == grid.length
  n == grid[i].length
  1 <= m, n <= 50
  grid[i][j] 为 0 或 1

*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let res = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === 1) {
        // let count = dfs(grid, i, j);
        let count = bfs(grid, i, j);
        // console.log(count);
        res = Math.max(res, count);
      }
    }
  }

  return res;
};

var dfs = function (grid, row, col) {
  if (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[0].length ||
    grid[row][col] === 0
  ) {
    return 0;
  }

  grid[row][col] = 0;
  let up = dfs(grid, row - 1, col);
  let right = dfs(grid, row, col + 1);
  let down = dfs(grid, row + 1, col);
  let left = dfs(grid, row, col - 1);

  return up + right + down + left + 1;
};

var bfs = function (grid, row, col) {
  const quene = [];
  quene.push([row, col]);
  let count = 0;

  while (quene.length > 0) {
    const [rowIndex, colIndex] = quene.pop();
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex >= grid.length ||
      colIndex >= grid[0].length ||
      grid[rowIndex][colIndex] === 0
    ) {
      continue;
    }

    grid[rowIndex][colIndex] = 0;
    count += 1;
    quene.push([rowIndex - 1, colIndex]);
    quene.push([rowIndex, colIndex + 1]);
    quene.push([rowIndex + 1, colIndex]);
    quene.push([rowIndex, colIndex - 1]);
  }

  return count;
};

console.log(maxAreaOfIsland([
  [0,0,1,0,0,0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,0,0,0,0,0,0,0],
  [0,1,0,0,1,1,0,0,1,0,1,0,0],
  [0,1,0,0,1,1,0,0,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,1,1,0,0,0,0]
]))
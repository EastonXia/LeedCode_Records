/**
  LeetCode200---岛屿数量

  给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
  岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
  此外，你可以假设该网格的四条边均被水包围。

  示例 1：
  输入：grid = [
    ["1","1","1","1","0"],
    ["1","1","0","1","0"],
    ["1","1","0","0","0"],
    ["0","0","0","0","0"]
  ]
  输出：1

  示例 2：
  输入：grid = [
    ["1","1","0","0","0"],
    ["1","1","0","0","0"],
    ["0","0","1","0","0"],
    ["0","0","0","1","1"]
  ]
  输出：3

  提示：
    m == grid.length
    n == grid[i].length
    1 <= m, n <= 300
    grid[i][j] 的值为 '0' 或 '1'

*/

/**
 * @param {character[][]} grid
 * @return {number}
 *
 * 主循环：
 * 遍历整个矩阵，当遇到 grid[i][j] == '1' 时，从此点开始做深度优先搜索 dfs，岛屿数 count + 1 且在深度优先搜索中删除此岛屿。
 *
 */
var numIslands = function (grid) {
  var count = 0;
  for (var i = 0; i < grid.length; i++) {
    for (var j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1') {
        dfs(grid, i, j);
        bfs(grid, i, j);
        count += 1;
      }
    }
  }

  return count;
};

/**
 * @param {*} grid
 * @param {*} row
 * @param {*} col
 *
 * DFS
 *
 * 设目前指针指向一个岛屿中的某一点 (i, j)，寻找包括此点的岛屿边界。
 * 从 (i, j) 向此点的上下左右 (i+1,j),(i-1,j),(i,j+1),(i,j-1) 做深度搜索。
 *
 * 终止条件：
 * (i, j) 越过矩阵边界;
 * grid[i][j] == 0，代表此分支已越过岛屿边界。
 * 搜索岛屿的同时，执行 grid[i][j] = '0'，即将岛屿所有节点删除，以免之后重复搜索相同岛屿。
 */
var dfs = function (grid, row, col) {
  if (
    row < 0 ||
    col < 0 ||
    row >= grid.length ||
    col >= grid[0].length ||
    grid[row][col] === '0'
  ) {
    return;
  }

  grid[row][col] = '0';
  dfs(grid, row - 1, col);
  dfs(grid, row, col + 1);
  dfs(grid, row + 1, col);
  dfs(grid, row, col - 1);
};

/**
 * @param {*} grid
 * @param {*} row
 * @param {*} col
 *
 * 借用一个队列 queue，判断队列首部节点 (i, j) 是否未越界且为 1：
 * 若是则置零（删除岛屿节点），并将此节点上下左右节点 (i+1,j),(i-1,j),(i,j+1),(i,j-1) 加入队列；
 * 若不是则跳过此节点；
 * 循环 pop 队列首节点，直到整个队列为空，此时已经遍历完此岛屿
 *
 */
var bfs = function (grid, row, col) {
  const quene = [];
  quene.push([row, col]);

  while (quene.length > 0) {
    const [rowIndex, colIndex] = quene.pop();
    if (
      rowIndex < 0 ||
      colIndex < 0 ||
      rowIndex >= grid.length ||
      colIndex >= grid[0].length ||
      grid[rowIndex][colIndex] === '0'
    ) {
      continue;
    }

    grid[rowIndex][colIndex] = '0';
    quene.push([rowIndex - 1, colIndex]);
    quene.push([rowIndex, colIndex + 1]);
    quene.push([rowIndex + 1, colIndex]);
    quene.push([rowIndex, colIndex - 1]);
  }
};

function main() {
  console.log(
    numIslands([
      ['1', '1', '1', '1', '0'],
      ['1', '1', '0', '1', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '0', '0', '0'],
    ])
  );
  console.log(
    numIslands([
      ['1', '1', '0', '0', '0'],
      ['1', '1', '0', '0', '0'],
      ['0', '0', '1', '0', '0'],
      ['0', '0', '0', '1', '1'],
    ])
  );
}

main();

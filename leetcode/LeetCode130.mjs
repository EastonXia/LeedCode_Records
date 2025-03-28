/**
  LeetCode130---被围绕的区域
  
  给你一个 m x n 的矩阵 board ，由若干字符 'X' 和 'O' ，找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 
  示例 1：
  输入：board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]
  输出：[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]
  解释：被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。
       任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
  
  示例 2：
  输入：board = [["X"]]
  输出：[["X"]]

  提示：
    m == board.length
    n == board[i].length
    1 <= m, n <= 200
    board[i][j] 为 'X' 或 'O'

*/

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 *
 * 注意到题目解释中提到：任何边界上的 O 都不会被填充为 X。 我们可以想到，所有的不被包围的 O 都直接或间接与边界上的 O 相连。
 *
 * 为了记录直接或简介在边界的状态，我们把这种情况下的 O 换成 # 作为占位符
 * 待搜索结束之后，遇到 O 替换为 X（和边界不连通的 O）；遇到 #，替换回 O
 */
var solve = function (board) {
  var rowLength = board.length;
  var colLength = board[0].length;

  for (var i = 0; i < rowLength; i++) {
    for (var j = 0; j < colLength; j++) {
      // 判断目前元素是否在边缘
      var isEdge =
        i === 0 || i === rowLength - 1 || j === 0 || j === colLength - 1;

      // 如果在边缘，并且元素为"O",则开始进行搜索
      if (isEdge && board[i][j] === 'O') {
        // dfs(board, i, j);
        bfs(board, i, j);
      }
    }
  }

  // 对于已标记为"#"的还原为"O"，未标记的直接修改成"X"
  for (var i = 0; i < rowLength; i++) {
    for (var j = 0; j < colLength; j++) {
      if (board[i][j] === 'O') {
        board[i][j] = 'X';
      } else if (board[i][j] === '#') {
        board[i][j] = 'O';
      }
    }
  }
};

var dfs = function (board, row, col) {
  if (
    row < 0 ||
    row > board.length - 1 ||
    col < 0 ||
    col > board[0].length - 1 ||
    board[row][col] === 'X' ||
    board[row][col] === '#' // 已经是"#"的表示已搜索过，不需再重新搜索了
  ) {
    return;
  }

  board[row][col] = '#';
  dfs(board, row - 1, col); // 上
  dfs(board, row + 1, col); // 下
  dfs(board, row, col - 1); // 左
  dfs(board, row, col + 1); // 右
};

var bfs = function (board, row, col) {
  var quene = [];
  quene.push([row, col]);
  board[row][col] = '#';

  while (quene.length > 0) {
    var cur = quene.shift();
    var x = cur[0]; // 行
    var y = cur[1]; // 列

    // 上
    if (x - 1 >= 0 && board[x - 1][y] === 'O') {
      quene.push([x - 1, y]);
      board[x - 1][y] = '#';
    }
    // 下
    if (x + 1 < board.length && board[x + 1][y] === 'O') {
      quene.push([x + 1, y]);
      board[x + 1][y] = '#';
    }
    // 左
    if (y - 1 >= 0 && board[x][y - 1] === 'O') {
      quene.push([x, y - 1]);
      board[x][y - 1] = '#';
    }
    // 右
    if (y + 1 < board[0].length && board[x][y + 1] === 'O') {
      quene.push([x, y + 1]);
      board[x][y + 1] = '#';
    }
  }
};

function main() {
  // console.log(
  //   solve([
  //     ['X', 'X', 'X', 'X'],
  //     ['X', 'O', 'O', 'X'],
  //     ['X', 'X', 'O', 'X'],
  //     ['X', 'O', 'X', 'X'],
  //   ])
  // );
  // console.log(solve([['X']]));
  // console.log(solve([['O']]));
  console.log(
    solve([
      ['O', 'O'],
      ['O', 'O'],
    ])
  );
}

main();

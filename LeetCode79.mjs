/**
  LeetCode79---单词搜索
  
  给定一个 m x n 二维字符网格 board 和一个字符串单词 word 。如果 word 存在于网格中，返回 true ；否则，返回 false 。
  单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

  示例 1：
  输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
  输出：true

  示例 2：
  输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"
  输出：true

  示例 3：
  输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"
  输出：false

  提示：
    m == board.length
    n == board[i].length
    1 <= m, n <= 6
    1 <= word.length <= 15
    board 和 word 仅由大小写英文字母组成

  进阶：你可以使用搜索剪枝的技术来优化解决方案，使其在 board 更大的情况下可以更快解决问题？

*/

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 *
 * 回溯法 (搜索类型)
 * 
 * 怎么样写回溯算法(从上而下，※代表难点，根据题目而变化)
    ①画出递归树，找到状态变量(回溯函数的参数)，这一步非常重要※
    ②根据题意，确立结束条件
    ③找准选择列表(与函数参数相关),与第一步紧密关联※
    ④判断是否需要剪枝
    ⑤作出选择，递归调用，进入下一层
    ⑥撤销选择
 *
 *  一般需要定义的变量
 *  固定变量 --- 题目输入的变量、方向数组、结果数组等
 *  状态变量 --- 路径数组、标记数组、当前的位置、递归深度等
 *     
 */
var exist = function (board, word) {
  var rowlen = board.length;
  var collen = board[0].length;

  // 方向数组(偏移量数组)在二维平面里很常见
  var direction = [
    [0, 1],  // 右
    [0, -1], // 左
    [1, 0],  // 下
    [-1, 0], // 上
  ];

  // 标记数组，对于不能重复选择的题目就需要用到标记数组了
  var visited = new Array(rowlen)
    .fill(0)
    .map(() => new Array(collen).fill(false));

  
  // 开始循环，为什么不写在dfs里面呢，因为这里表示搜索的起点，不随着递归进入到下一层，所以不能写在dfs里面
  for (var i = 0; i < rowlen; i++) {
    for (var j = 0; j < collen; j++) {
      if (dfs(board, word, direction, visited, i, j, 0)) {
        return true;
      }
    }
  }

  return false;
};

/**
 * @param board      // 输入的数据
 * @param word       // 输入的数据
 * @param direction  // 方向数组
 * @param visited    // 标记数据
 * @param x          // 行
 * @param y          // 列
 * @param start      // 单词的哪一个字母
 * @returns 
 * 
 * dfs入参定义
 * 固定变量 --- 此处是 board、word、direction
 * 状态变量 --- 此处是 visited、x、y、start
 * 
 * 一般都会是循环与递归结合，此题的循环在exist函数，不在dfs中
 */
var dfs = function (board, word, direction, visited, x, y, start) {
  // 这里判断结束条件
  if (start === word.length - 1) {
    return board[x][y] === word[start];
  }

  if (board[x][y] === word[start]) { // 剪枝
    visited[x][y] = true; // 当前层数做出选择
    for (const [dx, dy] of direction) { // 下一层四个方向提前选择方向
      var newX = x + dx;
      var newY = y + dy;
      if (inArea(board, newX, newY) && !visited[newX][newY]) { // 排除不符合条件的方向(剪枝)
        if (dfs(board, word, direction, visited, newX, newY, start + 1)) { // 进入下一层
          return true;
        }
      }
    }

    // 递归结束后撤销选择，回到上一层，进行状态重置，x、y、start会自动变回上一层的值，不需要任何操作
    // 标记数组也要到回到这一层的状态，因此visited[x][y] = false
    visited[x][y] = false;
  }

  return false;
};

/**
 * @param board 
 * @param x 
 * @param y 
 * @returns 
 */
var inArea = function (board, x, y) {
  var rowlen = board.length;
  var collen = board[0].length;

  return x >= 0 && x < rowlen && y >= 0 && y < collen;
};

function main() {
  console.log(
    exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCCED'
    )
  );
  console.log(
    exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'SEE'
    )
  );
  console.log(
    exist(
      [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E'],
      ],
      'ABCB'
    )
  );
}

main();

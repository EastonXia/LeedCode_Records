/**
  LeetCode36---有效的数独

  请你判断一个 9x9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。

  数字 1-9 在每一行只能出现一次。
  数字 1-9 在每一列只能出现一次。
  数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）
  数独部分空格内已填入了数字，空白格用 '.' 表示。

  注意：
  一个有效的数独（部分已被填充）不一定是可解的。
  只需要根据以上规则，验证已经填入的数字是否有效即可。

  示例 1：
  输入：board = 
  [["5","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]]
  输出：true
  
  示例 2：
  输入：board = 
  [["8","3",".",".","7",".",".",".","."]
  ,["6",".",".","1","9","5",".",".","."]
  ,[".","9","8",".",".",".",".","6","."]
  ,["8",".",".",".","6",".",".",".","3"]
  ,["4",".",".","8",".","3",".",".","1"]
  ,["7",".",".",".","2",".",".",".","6"]
  ,[".","6",".",".",".",".","2","8","."]
  ,[".",".",".","4","1","9",".",".","5"]
  ,[".",".",".",".","8",".",".","7","9"]]
  输出：false
  解释：除了第一行的第一个数字从 5 改为 8 以外，空格内其他数字均与 示例1 相同。 但由于位于左上角的 3x3 宫内有两个 8 存在, 因此这个数独是无效的。
   
  提示：
    board.length == 9
    board[i].length == 9
    board[i][j] 是一位数字或者 '.'

*/

/**
 * @param {character[][]} board
 * @return {boolean}
 * 
 * 多维哈希表
 */
var isValidSudoku = function (board) {
  // 创建多维哈希表就不能用map，set这种了，直接上数组判断重复
  var rowMap = new Array(9).fill(0).map(() => new Array(9).fill(0)); // 行哈希表
  var colMap = new Array(9).fill(0).map(() => new Array(9).fill(0)); // 列哈希表
  var threeMutiThreeMap = new Array(3) // 3x3哈希表
    .fill(0)
    .map(() => new Array(3).fill(0).map(() => new Array(9).fill(0)));


  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      var value = board[i][j]; // 此时值是string类型
      var blockRow = Math.floor(i / 3); 
      var blockCol = Math.floor(j / 3);

      if (value !== '.') {
        value = +value - 1; // 转成number并减1
        // 出现一次就加1
        rowMap[i][value] += 1;
        colMap[j][value] += 1;
        threeMutiThreeMap[blockRow][blockCol][value] += 1;

        // 如果行、列、3x3块出现多次出现则返回false
        if (
          rowMap[i][value] > 1 ||
          colMap[j][value] > 1 ||
          threeMutiThreeMap[blockRow][blockCol][value] > 1
        ) {
          return false;
        }
      }
    }
  }

  return true;
};

function main() {
  console.log(
    isValidSudoku([
      ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ])
  );

  console.log(
    isValidSudoku([
      ['8', '3', '.', '.', '7', '.', '.', '.', '.'],
      ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
      ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
      ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
      ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
      ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
      ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
      ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
      ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
    ])
  );
}

main();

/**
  LeetCode171---Excel 表列序号

  给你一个字符串 columnTitle ，表示 Excel 表格中的列名称。返回 该列名称对应的列序号 。

  例如：
  A -> 1
  B -> 2
  C -> 3
  ...
  Z -> 26
  AA -> 27
  AB -> 28 
  ...
   
  示例 1:
  输入: columnTitle = "A"
  输出: 1

  示例 2:
  输入: columnTitle = "AB"
  输出: 28

  示例 3:
  输入: columnTitle = "ZY"
  输出: 701

  提示：
    1 <= columnTitle.length <= 7
    columnTitle 仅由大写英文组成
    columnTitle 在范围 ["A", "FXSHRXW"] 内

*/

/**
 * @param {string} columnTitle
 * @return {number}
 *
 * 26进制 + ASCII码
 *
 */
var titleToNumber = function (columnTitle) {
  var res = 0;

  for (var i = columnTitle.length - 1, j = 0; i >= 0; i--, j++) {
    var num = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1; // 注意此处要用charCodeAt()获取ASCII进行计算
    res = num * Math.pow(26, j) + res ;
}

  return res
};

function main() {
  console.log(titleToNumber('A'));
  console.log(titleToNumber('AB'));
  console.log(titleToNumber('ZY'));
}

main();

/**
  LeetCode22---括号生成

  数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
  有效括号组合需满足：左括号必须以正确的顺序闭合。

  示例 1：
  输入：n = 3
  输出：["((()))","(()())","(())()","()(())","()()()"]

  示例 2：
  输入：n = 1
  输出：["()"]

  提示：
    1 <= n <= 8 
*/

/**
 * @param {number} n
 * @return {string[]}
 * 
 * 方法一：动态规划
 * 在此题中，动态规划的思想类似于数学归纳法，当知道所有 i<n 的情况时，我们可以通过某种算法算出 i=n 的情况。
   本题最核心的思想是，考虑 i=n 时相比 n-1 组括号增加的那一组括号的位置。

   任何一个括号序列都一定是由 ( 开头，并且第一个 ( 一定有一个唯一与之对应的 )。
   这样一来，每一个括号序列可以用 (a)b 来表示，其中 a 与 b 分别是一个合法的括号序列（可以为空）。并且a + b = n - 1
 */
var generateParenthesis = function (num) {
  if (num === 1) return ['()'];

  // 动态规划数组
  var parenthesisNumList = [[''], ['()']];

  // 四层循环，嫌麻烦也可以用递归
  for (var i = 2; i <= num; i++) {
    var parenthesisElementList = []; // 动态规划数组子数组

    // a，b合法括号序列遍历 0 <= a <= n - 1, 0 <= b <= n - 1 。
    for (var j = 0; j < i; j++) {
      var subListOne = parenthesisNumList[j]; // n = a 时的合法括号序列
      var subListTwo = parenthesisNumList[i - j - 1]; // n = b 时的合法括号序列

      // a，b合法括号序列遍历，并拼接新的左右括号
      for (var m = 0; m < subListOne.length; m++) {
        for (var n = 0; n < subListTwo.length; n++) {
          var parenthesisElement = '(' + subListOne[m] + ')' + subListTwo[n]; // 组合(a)b
          parenthesisElementList.push(parenthesisElement);
        }
      }
    }

    parenthesisNumList.push(parenthesisElementList);
  }

  return parenthesisNumList[num];
};

/**
 * @param {number} n
 * @return {string[]}
 *
 * 方法二：回溯(dfs) + 剪枝
 *
 * 条件（做加法）：
 * 左括号数量小于n，
 * 右括号数量小于左括号数量。
 *
 * 条件（做减法）
 * 左括号数量大于0，
 * 右括号数量大于左括号数量。
 * 
 * 不符合条件的剪枝
 *
 */

var generateParenthesis2 = function (n) {
  if (n === 1) return ['()'];

  var res = []; // 结果集

  dfs(0, 0, res, '', n); // 开始回溯

  return res;
};

/**
 * @param left 左括号数量
 * @param right 右括号数量
 * @param res 结果集
 * @param curStr 当前的合法字符串
 * @param num 输入的数量，左括号与右括号随着递增会最终等于num。
 *
 * 回溯函数（做加法）
 *
 */
var dfs = function (left, right, res, curStr, num) {
  if (left === num && right === num) {
    res.push(curStr); // 递归尽头，把最终结果放进结果集
    return;
  }

  // 不符合条件，剪枝
  if (left < right) {
    return;
  }

  if (left < num) {
    dfs(left + 1, right, res, curStr + '(', num);
  }

  if (right < num) {
    dfs(left, right + 1, res, curStr + ')', num);
  }
};

function main() {
  console.log(generateParenthesis(3));
  console.log(generateParenthesis(1));
  console.log(generateParenthesis2(3));
  console.log(generateParenthesis2(1));
}

main();

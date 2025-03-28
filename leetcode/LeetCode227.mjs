/**
  LeetCode227---基本计算器 II
  
  给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
  整数除法仅保留整数部分。
  你可以假设给定的表达式总是有效的。所有中间结果将在 [-231, 231 - 1] 的范围内。

  注意：不允许使用任何将字符串作为数学表达式计算的内置函数，比如 eval() 。

  示例 1：
  输入：s = "3+2*2"
  输出：7

  示例 2：
  输入：s = " 3/2 "
  输出：1

  示例 3：
  输入：s = " 3+5 / 2 "
  输出：5

  提示：
    1 <= s.length <= 3 * 10^5
    s 由整数和算符 ('+', '-', '*', '/') 组成，中间由一些空格隔开
    s 表示一个 有效表达式
    表达式中的所有整数都是非负整数，且在范围 [0, 2^31 - 1] 内
    题目数据保证答案是一个 32-bit 整数

*/

/**
 * @param {string} s
 * @return {number}
 *
 * 利用栈
 * 
 * 遍历字符串 s，并用变量 preSign 记录每个数字之前的运算符，对于第一个数字，其之前的运算符视为加号。
 * 每次遍历到数字末尾时，根据 preSign 来决定计算方式：
 *    加号：将数字压入栈；
 *    减号：将数字的相反数压入栈；
 *    乘除号：计算数字与栈顶元素，并将栈顶元素替换为计算结果。
 * 若读到一个运算符，或者遍历到字符串末尾，即认为是遍历到了数字末尾。
 * 处理完该数字后，更新 preSign 为当前遍历的字符。
 *
 */
var calculate = function (s) {
  s = s.trim();

  const stack = []; 

  let preSign = '+'; // 保存上一次的符号
  let num = 0; // 表示数字内容
  const n = s.length;

  for (let i = 0; i < n; i++) {
    const letter = s[i];
    // 处理数字的情况
    if (letter !== ' ' && isNumber(letter)) {
      num = num * 10 + +letter;
    }

    // 处理符号的情况，以及到了字符串末尾的情况
    if (!isNumber(letter) || i === n - 1) {
      switch (preSign) {
        case '+':
          stack.push(num);
          break;
        case '-':
          stack.push(-num);
          break;
        case '*':
          stack.push(stack.pop() * num);
          break;
        case '/':
          stack.push(stack.pop() / num | 0); // 这里 与0 操作使得正数向下，负数向上
          break;
        default:
          break;
      }

      preSign = letter;
      num = 0;
    }
  }

  return stack.reduce((pre, cur) => pre + cur); // 栈中的元素相加就是结果
};

const isNumber = (token) => {
  return !('+' === token || '-' === token || '*' === token || '/' === token);
};

function main() {
  console.log(calculate('3+2*2'));
  console.log(calculate(' 3/2 '));
  console.log(calculate(' 3+5 / 2 '));
  console.log(calculate("14-3/2"));
}

main();

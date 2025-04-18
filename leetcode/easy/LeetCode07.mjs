/**
  LeetCode07---整数反转

  给你一个 32 位的有符号整数 x ，返回 x 中每位上的数字反转后的结果。
  如果反转后整数超过 32 位的有符号整数的范围 [−2^31,  2^31 − 1] ，就返回 0。
  假设环境不允许存储 64 位整数（有符号或无符号）。
   
  示例 1：
  输入：x = 123
  输出：321

  示例 2：
  输入：x = -123
  输出：-321

  示例 3： 
  输入：x = 120
  输出：21

  示例 4：
  输入：x = 0
  输出：0
   
  提示：
  -2^31 <= x <= 2^31 - 1

 * @param x 
 */

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (x) {
  if (x === 0) return 0;

  var ans = 0;
  while (x !== 0) {
    // 取模运算
    ans = ans * 10 + (x % 10);

    // 溢出判断
    if (ans > Math.pow(2, 31) - 1 || ans < Math.pow(-2, 31)) return 0;

    // 更新数字
    x = parseInt(x / 10);
  }
  return ans;
};

// 极简解法
// JavaScript 将数字存储为 64 位浮点数，但所有按位运算都以 32 位二进制数执行。 
// 在执行位运算之前，JavaScript 将数字转换为 32 位有符号整数。 
// 执行按位操作后，结果将转换回 64 位 JavaScript 数。
var reverse2 = function (x) {
  var ans = 0;

  while (x !== 0) {
    // 取模运算
    ans = ans * 10 + (x % 10);

    // 溢出判断和更新数字
    // x / 10 去除末位，| 0 强制转换为32位有符号整数。
    // 通过 | 0 取整，无论正负，只移除小数点部分（正数向下取整，负数向上取整）。
    x = (x / 10) | 0
  }

  // result | 0 超过32位的整数转换结果不等于自身，可用作溢出判断。
  return (ans | 0) === ans ? ans : 0;
};

function main() {
  console.log(reverse(321));
  console.log(reverse(-321));
  console.log(reverse(120));
}

main();

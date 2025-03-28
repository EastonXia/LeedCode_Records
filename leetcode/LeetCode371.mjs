/**
 LeetCode371---两整数之和
  
 给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。

  示例 1：
  输入：a = 1, b = 2
  输出：3

  示例 2：
  输入：a = 2, b = 3
  输出：5

  提示：
    -1000 <= a, b <= 1000

*/

/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 * 
 * a + b 的问题拆分为 (a 和 b 的无进位结果) + (a 和 b 的进位结果)
 * 无进位加法使用异或运算计算得出
 * 进位结果使用与运算和移位运算计算得出
 * 循环此过程，直到进位为 0
 * 
 */
var getSum = function (a, b) {
  while (b != 0) {
    const carry = (a & b) << 1; // 进位结果
    a = a ^ b; // 无进位结果
    b = carry;
  }
  return a;
};

function main() {
  console.log(getSum(1, 2));
  console.log(getSum(2, 3));
}

main();

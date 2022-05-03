/**
  LeetCode326---3 的幂
  
  给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。
  整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3x

  示例 1：
  输入：n = 27
  输出：true

  示例 2：
  输入：n = 0
  输出：false

  示例 3：
  输入：n = 9
  输出：true

  示例 4：
  输入：n = 45
  输出：false

  提示：
   -2^31 <= n <= 2^31 - 1
   
  进阶：你能不使用循环或者递归来完成本题吗？

*/

/**
 * @param {number} n
 * @return {boolean}
 *
 * 试除法
 *
 * 我们不断地将 n 除以 3，直到 n=1。如果此过程中 n 无法被 3 整除，就说明 n 不是 3 的幂。
 *
 */
var isPowerOfThree = function (n) {
  if (n <= 0) return false;

  while (n % 3 === 0) {
    n /= 3;
  }

  return n === 1;
};

/**
 * @param {number} n
 * @return {boolean}
 * 
 * 在题目给定的 32 位有符号整数的范围内，最大的 3 的幂为 3^19=1162261467。我们只需要判断 n 是否是 3^19的约数即可。
 * 
 */
 var isPowerOfThree = function(n) {
  return n > 0 && 1162261467 % n === 0;
};

function main() {
  console.log(isPowerOfThree(27));
  console.log(isPowerOfThree(0));
  console.log(isPowerOfThree(9));
  console.log(isPowerOfThree(45));
}

main();

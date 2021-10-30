/**
  LeetCode50---Pow(x, n)

  实现 pow(x, n) ，即计算 x 的 n 次幂函数（即，xn）。
 
  示例 1：
  输入：x = 2.00000, n = 10
  输出：1024.00000

  示例 2：
  输入：x = 2.10000, n = 3
  输出：9.26100

  示例 3：
  输入：x = 2.00000, n = -2
  输出：0.25000
  解释：2-2 = 1/22 = 1/4 = 0.25

  提示：
    -100.0 < x < 100.0
    -2^31 <= n <= 2^31-1
    -10^4 <= x^n <= 10^4

*/

/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 *
 * 分治角度
 * x^n = (x^2)^(n//2)  ，n为偶数，‘//’表示向下取整除法
 *     = (x^2)^(n//2)x ，n为奇数
 * 
 * 根据推导，可通过循环 x = x^2操作，每次把幂从 n 降至 n//2 ，直至将幂降为 0 
 * 设 res=1，则初始状态 x^n = x^n * res。
 * 在循环二分时，每当 n 为奇数时，将多出的一项 x 乘入 res ，
 * 则最终可化至 x^n = y^0 * res (y = x^i, 1<= i <= n, i为偶数 )，返回 res 即可。
 * 
 */
var myPow = function (x, n) {
  if (x === 0) return 0;

  var res = 1;

  // 当 n < 0 时：把问题转化至 n ≥ 0 的范围内，即执行 x = 1/x ，n = - n 。
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  while (n > 0) {
    // 当n为奇数时
    if ((n & 1) === 1) { // 等价 n % 2 === 1
      res *= x;
    }

    x *= x; // 执行 x = x^2操作
    n = Math.floor(n / 2) 
    // n >>= 1; // 等价 n //= 2，但此处如果用位运算会出问题，当n = 2^31时,执行n >>= 1后，n变成 -2^30
  }

  return res;
};

function main() {
  console.log(myPow(2.0, 10));
  console.log(myPow(2.1, 3));
  console.log(myPow(2.0, -2));
  console.log(myPow(2.0, -2147483648));
}

main();

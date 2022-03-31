/**
  LeetCode204---计数质数

  给定整数 n ，返回 所有小于非负整数 n 的质数的数量 。

  示例 1：
  输入：n = 10
  输出：4
  解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

  示例 2：
  输入：n = 0
  输出：0

  示例 3：
  输入：n = 1
  输出：0
   
  提示：
    0 <= n <= 5 * 10^6

*/

/**
 * @param {number} n
 * @return {number}
 *
 * 埃氏筛
 * 
 * 如果 x 是质数，那么大于 x 的 x 的倍数 2x,3x,… 一定不是质数，因此我们可以从这里入手。
 * 设 isPrime[i] 表示数 i 是不是质数，如果是质数则为 1，否则为 0。
 * 从小到大遍历每个数，如果这个数为质数，则将其所有的倍数都标记为合数（除了该质数本身），即 0，这样在运行结束的时候我们即能知道质数的个数
 * 这里还可以继续优化，对于一个质数 x，如果按上文说的我们从 2x 开始标记其实是冗余的，应该直接从 x*x 开始标记
 * 因为 2x,3x,… 这些数一定在 x 之前就被其他数的倍数标记过了，例如 2 的所有倍数，3 的所有倍数等。
 * 
 */
var countPrimes = function (n) {
  var isPrime = new Array(n).fill(1);
  var ans = 0;

  // 从2开始，因为0和1都不是质数/合数
  for (let i = 2; i < n; ++i) {
    if (isPrime[i]) {
      ans += 1;

      // 从 x*x 开始标记
      for (let j = i * i; j < n; j += i) { 
        isPrime[j] = 0;
      }
    }
  }
  return ans;
};

function main() {
  console.log(countPrimes(10));
  console.log(countPrimes(0));
  console.log(countPrimes(1));
}

main();

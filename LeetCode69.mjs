/**
  LeetCode69---Sqrt(x)
  
  给你一个非负整数 x ，计算并返回 x 的 算术平方根 。
  由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。
  注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

  示例 1：
  输入：x = 4
  输出：2

  示例 2：
  输入：x = 8
  输出：2
  解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。
   
  提示：
    0 <= x <= 2^31 - 1
*/

/**
 * @param {number} x
 * @return {number}
 * 
 * 二分法
 * 
 * 二分思路：
 * 1、确定好left、right的起始值
 * 2、循环条件left < right还是 left <= right，如果是 <=，left是有可能大于right的，就不能以left作为结果了
 * 3、mid 的逻辑，一般是mid = left + (right - left) / 2，可以防止溢出，但有时候也会 +1 / -1
 * 4、区间划分，确定判断逻辑，[left, mid](mid, right] / [left, mid)[mid, right]。
 * 5、left、right的重新赋值，left = mid + 1 或 mid，right = mid - 1 或 mid。
 */
var mySqrt = function (x) {
  if (x === 0 || x === 1) return x; // 特殊情况

  // 由于 (x / 2) ^ 2 <= x, 解得x <= 4, 所以设下限为1，上限为x / 2就可以了
  var left = 1;
  var right = Math.floor(x / 2);

  var res = 1;

  while (left <= right) {
    var mid = left + Math.floor((right - left + 1) / 2); // 此写法可以防止溢出，加一操作时考虑只剩两个数防止死循环的情况

    if (mid <= x / mid) { // 代替 mid*mid <= x, 防止溢出
      res = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return res;
};

function main() {
  console.log(mySqrt(4));
  console.log(mySqrt(8));
}

main();

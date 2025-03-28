/**
  LeetCode202---快乐数

  编写一个算法来判断一个数 n 是不是快乐数。

 「快乐数」 定义为：

  对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和。
  然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。
  如果这个过程 结果为 1，那么这个数就是快乐数。
  如果 n 是 快乐数 就返回 true ；不是，则返回 false 。
   
  示例 1：
  输入：n = 19
  输出：true
  解释：
  12 + 92 = 82
  82 + 22 = 68
  62 + 82 = 100
  12 + 02 + 02 = 1

  示例 2：
  输入：n = 2
  输出：false

  提示：
    1 <= n <= 2^31 - 1

*/

/**
 * @param {number} n
 * @return {boolean}
 *
 * 最终结果只有两种：
 *  1、要么等于1
 *  2、要么进入循环
 *
 * 这就有点类似与判断链表是否有环了
 * 通过龟兔赛跑算法判断
 *
 */
var isHappy = function (n) {
  var slow = n;
  var fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }

  return fast === 1;
};

/**
 * @param {*} num 
 * @returns 
 * 
 * 获取下一个过程的结果
 * 
 */
var getNext = function (num) {
  var res = 0;
  while (num > 0) {
    var remainder = num % 10;
    num = Math.floor(num / 10);
    res += remainder * remainder;
  }

  return res;
};

function main() {
  console.log(isHappy(19));
  console.log(isHappy(2));
}

main();

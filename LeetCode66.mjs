/**
  LeetCode66---加一
  
  给定一个由 整数 组成的 非空 数组所表示的非负整数，在该数的基础上加一。
  最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
  你可以假设除了整数 0 之外，这个整数不会以零开头。

  示例 1：
  输入：digits = [1,2,3]
  输出：[1,2,4]
  解释：输入数组表示数字 1234

  示例 2：
  输入：digits = [4,3,2,1]
  输出：[4,3,2,2]
  解释：输入数组表示数字 4321。

  示例 3：
  输入：digits = [0]
  输出：[1]

  提示：
    1 <= digits.length <= 100
    0 <= digits[i] <= 9

*/

/**
 * @param {number[]} digits
 * @return {number[]}
 * 
 * 考虑如下的三种情况：
 * 如果 digits 的末尾没有 9，例如 [1,2,3]，那么我们直接将末尾的数加一，得到 [1,2,4] 并返回；
 * 如果 digits 的末尾有若干个 9，例如 [1,2,3,9,9]，那么我们只需要找出从末尾开始的第一个不为 9 的元素，即 3，将该元素加一，得到 [1,2,4,9,9]。随后将末尾的 9 全部置零，得到 [1,2,4,0,0] 并返回。
 * 如果 digits 的所有元素都是 9，例如 [9,9,9,9,9]，那么答案为 [1,0,0,0,0,0]。我们只需要构造一个长度比 digits 多 1 的新数组，将首元素置为 1，其余元素置为 0 即可。
 */
var plusOne = function (digits) {
  var len = digits.length;

  for (var i = len - 1; i >= 0; i--) {
    if (digits[i] !== 9) {
      digits[i] += 1;
      return digits;
    } else {
      digits[i] = 0;
    }
  }

  // digits 中所有的元素均为 9
  var res = new Array(len).fill(0);
  res.unshift(1);
  return res;
  
};

function main() {
  console.log(plusOne([1, 2, 3]));
  console.log(plusOne([4, 3, 2, 1]));
  console.log(plusOne([0]));
}

main();

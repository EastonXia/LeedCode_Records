/**
  LeetCode415---字符串相加 

  给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和并同样以字符串形式返回。
  你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

  示例 1：
  输入：num1 = "11", num2 = "123"
  输出："134"

  示例 2：
  输入：num1 = "456", num2 = "77"
  输出："533"

  示例 3：
  输入：num1 = "0", num2 = "0"
  输出："0"

  提示：
    1 <= num1.length, num2.length <= 10^4
    num1 和num2 都只包含数字 0-9
    num1 和num2 都不包含任何前导零

*/

/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 *
 * 其实就是经典的大数相加
 *
 */
var addStrings = function (num1, num2) {
  //取两个数字的最大长度
  let maxLength = Math.max(num1.length, num2.length);

  //用0去补齐长度
  num1 = num1.padStart(maxLength, 0); //"0009007199254740991"
  num2 = num2.padStart(maxLength, 0); //"1234567899999999999"

  //定义加法过程中需要用到的变量
  let t = 0;
  let f = 0; //"进位"
  let sum = '';
  for (let i = maxLength - 1; i >= 0; i--) {
    t = parseInt(num1[i]) + parseInt(num2[i]) + f;
    f = Math.floor(t / 10);
    sum = (t % 10) + sum;
  }
  if (f !== 0) {
    sum = '' + f + sum;
  }
  return sum;
};

function main() {
  console.log(addStrings('11', '123'));
  console.log(addStrings('456', '77'));
  console.log(addStrings('0', '0'));
}

main();

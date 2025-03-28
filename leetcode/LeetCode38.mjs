/**
  LeetCode38---外观数列

  给定一个正整数 n ，输出外观数列的第 n 项。

  「外观数列」是一个整数序列，从数字 1 开始，序列中的每一项都是对前一项的描述。

  你可以将其视作是由递归公式定义的数字字符串序列：
  countAndSay(1) = "1"
  countAndSay(n) 是对 countAndSay(n-1) 的描述，然后转换成另一个数字字符串。

  前五项如下：
  1.     1
  2.     11
  3.     21
  4.     1211
  5.     111221
  第一项是数字 1 
  描述前一项，这个数是 1 即 “ 一 个 1 ”，记作 "11"
  描述前一项，这个数是 11 即 “ 二 个 1 ” ，记作 "21"
  描述前一项，这个数是 21 即 “ 一 个 2 + 一 个 1 ” ，记作 "1211"
  描述前一项，这个数是 1211 即 “ 一 个 1 + 一 个 2 + 二 个 1 ” ，记作 "111221"
  要 描述 一个数字字符串，首先要将字符串分割为 最小 数量的组，每个组都由连续的最多 相同字符 组成。然后对于每个组，先描述字符的数量，然后描述字符，形成一个描述组。要将描述转换为数字字符串，先将每组中的字符数量用数字替换，再将所有描述组连接起来。

  示例 1：
  输入：n = 1
  输出："1"
  解释：这是一个基本样例。

  示例 2：
  输入：n = 4
  输出："1211"
  解释：
  countAndSay(1) = "1"
  countAndSay(2) = 读 "1" = 一 个 1 = "11"
  countAndSay(3) = 读 "11" = 二 个 1 = "21"
  countAndSay(4) = 读 "21" = 一 个 2 + 一 个 1 = "12" + "11" = "1211"
   
  提示：
    1 <= n <= 30
*/

/**
 * @param {number} n
 * @return {string}
 *
 * 本题可以用递归去做，也可以转成循环去做
 */
var countAndSay = function (n) {
  if (n === 1) return '1';

  var res = '1'; // 返回结果

  for (var i = 2; i <= n; i++) {
    var start = 0; // 开始位置
    var end = 0; // 结束位置
    var subStr = ''; // 当前项的结果

    while (end <= res.length) {
      // 如果start的元素与end的元素相等，则end向右移动
      // 否则计算出当前数出现的次数，以及当前项，进行字符串拼接
      if (res[start] !== res[end]) {
        subStr = subStr + (end - start) + res[start]; // number类型会进行转换为string
        // subStr = subStr + `${(end - start)}` + `${res[start]}`; // 稳定起见用es6
        start = end;
      }
      end++;
    }

    res = subStr; // 替换新的字符串
  }
  return res;
};

function main() {
  console.log(countAndSay(1));
  console.log(countAndSay(2));
}

main();

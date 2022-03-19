/**
  LeetCode125---验证回文串
  
  给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
  说明：本题中，我们将空字符串定义为有效的回文串。

  示例 1:
  输入: "A man, a plan, a canal: Panama"
  输出: true
  解释："amanaplanacanalpanama" 是回文串

  示例 2:
  输入: "race a car"
  输出: false
  解释："raceacar" 不是回文串
   
  提示：
    1 <= s.length <= 2 * 105
    字符串 s 由 ASCII 字符组成

*/

/**
 * @param {string} s
 * @return {boolean}
 *
 * 正则匹配 + reverse法
 *
 */
var isPalindrome = function (s) {
  var valid = s.toLowerCase().match(/[a-z0-9]+/g); // 数据预处理，valid为进行正则匹配后筛选出来的数组

  if (!valid) {
    return true;
  }

  var str = valid.join(''); // 数据预处理(正则匹配)后得到的字符串
  var comp = str.split('').reverse().join(''); // 将字符串翻转

  return comp === str;
};

/**
 * @param {string} s
 * @return {boolean}
 *
 * 特殊字符处理函数 + 双指针
 *
 */
var isPalindrome2 = function (s) {
  var str = s.toLowerCase(); // 统一大小写

  // 定义好一头一尾的双指针
  var start = 0;
  var end = str.length - 1;

  while (start < end) {
    // start/end不符合下面的isValid就推动左/右指针 并结束本轮迭代
    if (!isValid(str[start])) {
      start++;
      continue;
    }
    if (!isValid(str[end])) {
      end--;
      continue;
    }
    if (str[start] !== str[end]) {
      return false;
    }
    start++;
    end--;
  }
  return true;
};
// 判断是否为字母/数字
var isValid = function (str) {
  return (str >= 'a' && str <= 'z') || (str >= '0' && str <= '9');
};

function main() {
  console.log(isPalindrome('A man, a plan, a canal: Panama'));
  console.log(isPalindrome('race a car'));
}

main();

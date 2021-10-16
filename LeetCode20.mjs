/**
  LeetCode20---有效的括号

  给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
  有效字符串需满足：
  左括号必须用相同类型的右括号闭合。
  左括号必须以正确的顺序闭合。
   
  示例 1：
  输入：s = "()"
  输出：true

  示例 2：
  输入：s = "()[]{}"
  输出：true

  示例 3：
  输入：s = "(]"
  输出：false

  示例 4：
  输入：s = "([)]"
  输出：false

  示例 5：
  输入：s = "{[]}"
  输出：true
   
  提示：
    1 <= s.length <= 104
    s 仅由括号 '()[]{}' 组成
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  var stack = []; // 数组可以模拟栈
  var length = s.length;

  if (length % 2) return false; // 长度单数直接返回false

  // es6字符串中是有Iterator的，所以可以用for of。
  for (let item of s) {
    // 利用switch
    switch (item) {
      case '{':
      case '[':
      case '(':
        stack.push(item);
        break;
      case '}':
        if (stack.pop() !== '{') return false;
        break;
      case ']':
        if (stack.pop() !== '[') return false;
        break;
      case ')':
        if (stack.pop() !== '(') return false;
        break;
    }
  }

  return !stack.length; // 栈没清空也是false
};

var isValid2 = function (s) {
  var length = s.length;
  if (length % 2) return false;

  // 字符串的括号固定，所以可以创建映射表，key-value顺序无所谓，后面的判断逻辑写对就行
  var map = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  var stack = []; // 定义栈

  for (let i of s) {
    if (map.get(i)) { 
      if (stack[stack.length - 1] !== map.get(i)) return false;
      else stack.pop();
    } else {
      stack.push(i);
    }
  }

  return !stack.length; // 栈没清空也是false
};

function main() {
  console.log(isValid2('()'));
  console.log(isValid('()[]{}'));
  console.log(isValid('(]'));
  console.log(isValid('([)]'));
  console.log(isValid('{[]}'));
}

main();

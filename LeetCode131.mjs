/**
  LeetCode131---分割回文串
  
  给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是 回文串 。返回 s 所有可能的分割方案。
  回文串 是正着读和反着读都一样的字符串。
   
  示例 1：
  输入：s = "aab"
  输出：[["a","a","b"],["aa","b"]]

  示例 2：
  输入：s = "a"
  输出：[["a"]]

  提示：
    1 <= s.length <= 16
    s 仅由小写英文字母组成
*/

/**
 * @param {string} s
 * @return {string[][]}
 * 回溯算法
 * 
 * 每一个结点表示剩余没有扫描到的字符串，产生分支是截取了剩余字符串的前缀；
   产生前缀字符串的时候，判断前缀字符串是否是回文。
     如果前缀字符串是回文，则可以产生分支和结点；
     如果前缀字符串不是回文，则不产生分支和结点，这一步是剪枝操作。
   在叶子结点是空字符串的时候结算，此时 从根结点到叶子结点的路径，就是结果集里的一个结果，使用深度优先遍历，记录下所有可能的结果。
   使用一个路径变量 path 搜索，path 全局使用一个（注意结算的时候，要生成一个拷贝），因此在递归执行方法结束以后需要回溯，即将递归之前添加进来的元素拿出去；
   path 的操作只在列表的末端，因此合适的数据结构是栈。
 *
 */
var partition = function (s) {
  var len = s.length;
  if (len === 0) return [];

  var charArray = s.split('');
  var path = []; // 路径数组, 模拟栈
  var res = []; // 结果数组
  dfs(charArray, 0, len, path, res); // 开始回溯

  return res;
};

/**
 * @param charArray
 * @param index     起始字符的索引
 * @param len       字符串 s 的长度，可以设置为全局变量
 * @param path      记录从根结点到叶子结点的路径
 * @param res       记录所有的结果
 *
 */
var dfs = function (charArray, index, len, path, res) {
  if (index === len) {
    res.push([...path]);
    return;
  }

  for (var i = index; i < len; i++) {
    // 因为截取字符串是消耗性能的，因此，采用传子串下标的方式判断一个子串是否是回文子串
    // 只要发现截取的字符串不是回文的，就剪枝
    if (!checkPalindrome(charArray, index, i)) {
      continue;
    }

    path.push(charArray.slice(index, i + 1).join(''));
    dfs(charArray, i + 1, len, path, res);
    path.pop();
  }
};

/**
 * @param charArray
 * @param left      子串的左边界，可以取到
 * @param right     子串的右边界，可以取到
 *
 * 判断是否为回文串，这一步的时间复杂度是 O(N)，利用左右下标对应的元素是否相同，无论长度是奇数还是偶数都可行
 */
var checkPalindrome = function (charArray, left, right) {
  while (left < right) {
    if (charArray[left] !== charArray[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
};

// -------------------------------------------------------------------------------------------------------

/**
 * @param {string} s
 * @return {string[][]}
 *
 * 回溯算法优化（使用动态规划得到所有子串是否是回文）
 *
 */
var partition2 = function (s) {
  var len = s.length;
  if (len === 0) return [];

  var charArray = s.split('');
  var path = []; // 路径数组, 模拟栈
  var res = []; // 结果数组

  // 预处理
  // 状态：dp[i][j] 表示 s[i][j] 是否是回文
  var dp = new Array(len).fill(false).map(() => new Array(len).fill(false));
  // 状态转移方程：在 s[i] === s[j] 的时候，dp[i][j] 参考 dp[i + 1][j - 1]
  // 其实我们并不需要用到整一个动态规划表，只需用以[0, 0]到[len, len]连线为分界的上半区
  // 所以循环条件我们可以让left <= right
  for (var right = 0; right < len; right++) {
    // 注意：left <= right 取等号表示 1 个字符的时候也需要判断
    for (var left = 0; left <= right; left++) {
      // 在左右两字符相等的情况下，如果right - left <= 2，那么该字串是必为回文串的
      if (
        charArray[left] == charArray[right] &&
        (right - left <= 2 || dp[left + 1][right - 1])
      ) {
        dp[left][right] = true;
      }
    }
  }

  dfs2(charArray, 0, len, dp, path, res); // 开始回溯

  return res;
};

/**
 * @param charArray
 * @param index     起始字符的索引
 * @param len       字符串 s 的长度，可以设置为全局变量
 * @param dp
 * @param path      记录从根结点到叶子结点的路径
 * @param res       记录所有的结果
 *
 */
var dfs2 = function (charArray, index, len, dp, path, res) {
  if (index === len) {
    res.push([...path]);
    return;
  }

  for (var i = index; i < len; i++) {
    if (!dp[index][i]) {
      continue;
    }

    path.push(charArray.slice(index, i + 1).join(''));
    dfs2(charArray, i + 1, len, dp, path, res);
    path.pop();
  }
};

function main() {
  console.log(partition('aab'));
  console.log(partition('a'));
  console.log(partition2('aab'));
  console.log(partition2('a'));
}

main();

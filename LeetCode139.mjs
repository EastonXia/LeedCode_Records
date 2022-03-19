/**
  LeetCode139---单词拆分
  
  给你一个字符串 s 和一个字符串列表 wordDict 作为字典。请你判断是否可以利用字典中出现的单词拼接出 s 。
  注意：不要求字典中出现的单词全部都使用，并且字典中的单词可以重复使用。
   
  示例 1：
  输入: s = "leetcode", wordDict = ["leet", "code"]
  输出: true
  解释: 返回 true 因为 "leetcode" 可以由 "leet" 和 "code" 拼接成。

  示例 2：
  输入: s = "applepenapple", wordDict = ["apple", "pen"]
  输出: true
  解释: 返回 true 因为 "applepenapple" 可以由 "apple" "pen" "apple" 拼接成。
       注意，你可以重复使用字典中的单词。

  示例 3：
  输入: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
  输出: false
   
  提示：
    1 <= s.length <= 300
    1 <= wordDict.length <= 1000
    1 <= wordDict[i].length <= 20
    s 和 wordDict[i] 仅有小写英文字母组成
    wordDict 中的所有字符串 互不相同

*/

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 *
 * 动态规划
 *
 *  初始化 dp = [False, ⋯, False]，长度为 n + 1。n 为字符串长度。
 *  dp[i] 表示 s 的前 i 位是否可以用 wordDict 中的单词表示。
 *  初始化 dp[0] = True，s的前 0 位(没有前 0 位的说法，为了计算方便，用空字符表示)，空字符可以被表示。
 *  遍历字符串的所有子串，遍历开始索引 i，遍历区间 [0, n)：
 *    遍历结束索引 j，遍历区间 [i + 1, n + 1)：
 *      若 dp[i] = True， 且 s[i, ⋯, j) 在 wordlist 中，则dp[j] = True。
 *      解释：dp[i] = True 说明 s 的前 i 位可以用 wordDict 表示，则 s[i, ⋯, j) 出现在 wordDict 中，说明 s 的前 j 位可以表示。
 *  返回 dp[n]
 */
var wordBreak = function (s, wordDict) {
  var wordSet = new Set(wordDict);
  var len = s.length;
  var dp = new Array(len + 1).fill(false); // 考虑到要前面补一个dp[0]，所以dp数组的长度要+1
  dp[0] = true; // 初始化

  for (var i = 0; i < len; i++) {
    // i对应的是字符串的开始下标
    for (var j = i + 1; j < len + 1; j++) {
      // j对应的是字符串的结束下标，考虑到slice的性质，终止条件需要 +1，刚好对应了dp数组的下标
      var suffix = s.slice(i, j);
      if (dp[i] && wordSet.has(suffix)) {
        dp[j] = true;
      }
    }
  }

  return dp[len];
};

/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 *
 *  回溯+记忆化
 *
 *  "leetcode"能否 break，可以拆分为：
 *    "l"是否是单词表的单词、剩余子串能否 break。
 *    "le"是否是单词表的单词、剩余子串能否 break。
 *    "lee"...以此类推
 *
 *  用 DFS 回溯，考察所有的拆分可能，指针从左往右扫描：
 *    如果指针的左侧部分是单词，则对剩余子串递归考察。
 *    如果指针的左侧部分不是单词，不用看了，回溯，考察别的分支。
 *
 *  加入memory数组记录下已出现的情况，数组索引为指针位置，值为计算的结果。
 *  下次遇到相同的子问题，直接返回命中的缓存值，就不用调重复的递归
 *
 */
var wordBreak2 = function (s, wordDict) {
  var len = s.length;
  var wordSet = new Set(wordDict);
  var memory = new Array(len).fill(undefined);

  return canBreak(s, len, wordSet, memory, 0);
};

/**
 * 
 * @param {*} str     字符串
 * @param {*} len     字符串长度
 * @param {*} wordSet 字典
 * @param {*} memory  记忆数组
 * @param {*} index   指针开始位置
 * @returns 
 */
var canBreak = function (str, len, wordSet, memory, index) {
  // 此函数执行的前提是前缀匹配成功，所以到了最后一步说明前面都匹配上了
  // 指针越界，str一步步成功划分为单词，才走到越界这步，现在没有剩余子串
  if (index === len) {
    return true;
  }

  // 如果被记录就直接用记录的结果
  if (memory[index] !== undefined) { 
    return memory[index];
  }

  for (var i = index + 1; i <= len; i++) {
    var prefix = slice(index, i);
    // 前缀部分是单词，且剩余子串能break，返回true
    // 如果前缀部分不是单词，就不会执行canBreak(i)。进入下一轮迭代，再切出一个前缀串，再试
    if (wordSet.has(prefix) && canBreak(str, len, wordSet, memory, i)) {
      memory[index] = true; // 当前递归的结果存一下
      return true;
    } 
  }

  memory[index] = false; // 当前递归的结果存一下
  return false;
};

function main() {
  console.log(wordBreak('leetcode', ['leet', 'code']));
  console.log(wordBreak('applepenapple', ['apple', 'pen']));
  console.log(wordBreak('catsandog', ['cats', 'dog', 'sand', 'and', 'cat']));
}

main();

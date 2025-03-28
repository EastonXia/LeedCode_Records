/**
  LeetCode208---实现 Trie (前缀树)

  Trie（发音类似 "try"）或者说 前缀树 是一种树形数据结构，用于高效地存储和检索字符串数据集中的键。这一数据结构有相当多的应用情景，例如自动补完和拼写检查。

  请你实现 Trie 类：
    Trie() 初始化前缀树对象。
    void insert(String word) 向前缀树中插入字符串 word 。
    boolean search(String word) 如果字符串 word 在前缀树中，返回 true（即，在检索之前已经插入）；否则，返回 false 。
    boolean startsWith(String prefix) 如果之前已经插入的字符串 word 的前缀之一为 prefix ，返回 true ；否则，返回 false 。

  示例：
  输入
  ["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
  [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
  输出
  [null, null, true, false, true, null, true]

  解释
  Trie trie = new Trie();
  trie.insert("apple");
  trie.search("apple");   // 返回 True
  trie.search("app");     // 返回 False
  trie.startsWith("app"); // 返回 True
  trie.insert("app");
  trie.search("app");     // 返回 True
   

  提示：
    1 <= word.length, prefix.length <= 2000
    word 和 prefix 仅由小写英文字母组成
    insert、search 和 startsWith 调用次数 总计 不超过 3 * 10^4 次

*/

var Trie = function () {
  this.children = {};
};

/**
 * @param {string} word
 * @return {void}
 * 
 * 从字段树的根节点开始，如果子节点存在，继续处理下一个字符，
 * 如果子节点不存在，则创建一个子节点到children的相应位置，沿着指针继续向后移动，处理下一个字符
 * 
 */
Trie.prototype.insert = function (word) {
  let node = this.children;

  for (let letter of word) {
    if (!node[letter]) {
      node[letter] = {};
    }
    node = node[letter];
  }

  node.isEnd = true; // isEnd表示该节点是否是字符串的结尾。
};

/**
 * @param {string} prefix
 * @return {boolean}
 * 
 * 从根节点开始，子节点存在，则沿着指针继续搜索下一个子节点，直到最后一个，
 * 如果搜索到了前缀所有字符，说明字典树包含该前缀。
 * 子节点不存在就说明字典树中不包含该前缀，返回false
 * 
 */
Trie.prototype.startsWith = function (prefix) {
  const node = this.searchPrefix(prefix);

  return !!node;
};

/**
 * @param {string} word
 * @return {boolean}
 * 
 * 和查找前缀一样，只不过最后返回的节点的isEnd是true，也就是说字符串正好是字典树的一个分支
 * 
 */
 Trie.prototype.search = function (word) {
  const node = this.searchPrefix(word);

  return node !== undefined && node.isEnd !== undefined;
};

/**
 * @param {*} word 
 * @returns 
 * 
 * 字典树搜索单词是否存在
 * 作为其他startsWith()、search()的工具函数
 * 
 */
Trie.prototype.searchPrefix = function (word) {
  let node = this.children;

  for (let letter of word) {
    if (!node[letter]) return false;
    node = node[letter];
  }

  return node;
};

function main() {
  var obj = new Trie();
  obj.insert(word);
  var param_2 = obj.search(word);
  var param_3 = obj.startsWith(prefix);
}

main();

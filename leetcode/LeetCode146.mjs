/**
  LeetCode146---LRU 缓存

  请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
  实现 LRUCache 类：
  LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
  int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
  void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
  函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

  示例：
  输入
  ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
  [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
  输出
  [null, null, null, 1, null, -1, null, -1, 3, 4]

  解释
  LRUCache lRUCache = new LRUCache(2);
  lRUCache.put(1, 1); // 缓存是 {1=1}
  lRUCache.put(2, 2); // 缓存是 {1=1, 2=2}
  lRUCache.get(1);    // 返回 1
  lRUCache.put(3, 3); // 该操作会使得关键字 2 作废，缓存是 {1=1, 3=3}
  lRUCache.get(2);    // 返回 -1 (未找到)
  lRUCache.put(4, 4); // 该操作会使得关键字 1 作废，缓存是 {4=4, 3=3}
  lRUCache.get(1);    // 返回 -1 (未找到)
  lRUCache.get(3);    // 返回 3
  lRUCache.get(4);    // 返回 4
 
提示：
  1 <= capacity <= 3000
  0 <= key <= 10000
  0 <= value <= 10^5
  最多调用 2 * 10^5 次 get 和 put 

 */

// 双向链表
function DListNode(key, value) {
  this.key = key;
  this.value = value;
  this.prev = null;
  this.next = null;
}

/**
 * @param {number} capacity
 *
 * LRU 缓存机制可以通过哈希表辅以双向链表实现，我们用一个哈希表和一个双向链表维护所有在缓存中的键值对。
 * 双向链表按照被使用的顺序存储了这些键值对，靠近头部的键值对是最近使用的，而靠近尾部的键值对是最久未使用的。
 * 哈希表即为普通的哈希映射（HashMap），通过缓存数据的键映射到其在双向链表中的位置。
 *
 */
var LRUCache = function (capacity) {
  this.size = 0;
  this.capacity = capacity;
  this.cache = new Map();

  // 使用伪头部和伪尾部节点
  this.head = new DListNode();
  this.tail = new DListNode();
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 *
 * 对于 get 操作，首先判断 key 是否存在：
 * 如果 key 不存在，则返回 -1；
 * 如果 key 存在，则 key 对应的节点是最近被使用的节点。通过哈希表定位到该节点在双向链表中的位置，并将其移动到双向链表的头部，最后返回该节点的值。
 *
 */
LRUCache.prototype.get = function (key) {
  var node = this.cache.get(key);

  if (node === undefined) {
    return -1;
  }

  // 如果 key 存在，先通过哈希表定位，再移到头部
  this.moveToHead(node);

  return node.value;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 *
 * 对于 put 操作，首先判断 key 是否存在：
 * 如果 key 不存在，使用 key 和 value 创建一个新的节点，在双向链表的头部添加该节点，并将 key 和该节点添加进哈希表中。然后判断双向链表的节点数是否超出容量，如果超出容量，则删除双向链表的尾部节点，并删除哈希表中对应的项；
 * 如果 key 存在，则与 get 操作类似，先通过哈希表定位，再将对应的节点的值更新为 value，并将该节点移到双向链表的头部。
 *
 */
LRUCache.prototype.put = function (key, value) {
  var node = this.cache.get(key);
  
  if (node === undefined) {
    var newNode = new DListNode(key, value);  // 如果 key 不存在，创建一个新的节点
    this.cache.set(key, newNode);  // 添加进哈希表
    this.addToHead(newNode); // 添加至双向链表的头部
    this.size += 1;

    if (this.size > this.capacity) {
      var tailNode = this.removeTail(); // 如果超出容量，删除双向链表的尾部节点
      this.cache.delete(tailNode.key); // 删除哈希表中对应的项
      this.size -= 1;
    }
  } else {
     // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
    node.value = value;
    this.moveToHead(node);
  }
};

/**
 * @param {*} node
 * 
 * 添加节点到头部
 *  
 */
LRUCache.prototype.addToHead = function (node) {
  node.prev = this.head;
  node.next = this.head.next;
  this.head.next.prev = node;
  this.head.next = node;
};

/**
 * @param {*} node
 * 
 * 删除节点
 *  
 */
LRUCache.prototype.removeNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

/**
 * @param {*} node
 * 
 * 移动节点到头部
 *  
 */
LRUCache.prototype.moveToHead = function (node) {
  this.removeNode(node);
  this.addToHead(node);
};

/**
 * @returns 尾部节点
 * 
 * 删除尾部节点并返回尾部节点
 * 
 */
LRUCache.prototype.removeTail = function () {
  var res = this.tail.prev;
  this.removeNode(res);
  return res;
};

function main() {
  var obj = new LRUCache(capacity);
  var param_1 = obj.get(key);
  obj.put(key, value);
}

main();

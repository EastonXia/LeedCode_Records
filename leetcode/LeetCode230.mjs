/**
  LeetCode230---二叉搜索树中第K小的元素
  
  给定一个二叉搜索树的根节点 root ，和一个整数 k ，请你设计一个算法查找其中第 k 个最小元素（从 1 开始计数）。

  示例 1：
  输入：root = [3,1,4,null,2], k = 1
  输出：1

  示例 2：
  输入：root = [5,3,6,2,4,null,null,1], k = 3
  输出：3

  提示：
    树中的节点数为 n 。
    1 <= k <= n <= 10^4
    0 <= Node.val <= 10^4

  进阶：如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化算法？

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 *
 * 中序遍历
 *
 * 二叉搜索树，中序遍历出来的结果肯定是由小到大的
 *
 * 找到答案后停止，不需要遍历整个树
 * 但是如果查找频繁，需要对树遍历多次
 *
 */
var kthSmallest = function (root, k) {
  const stk = []; // 模拟系统栈

  while (root || stk.length) {
    // 左子节点搜索入栈，直到root.left === null
    while (root) {
      stk.push(root);
      root = root.left;
    }

    // 左子树为空了，弹出自身，加入到结果中
    root = stk.pop();
    k -= 1;
    if (k === 0) {
      break;
    }

    // 然后往右子树搜索
    root = root.right;
  }

  return root.val;
};

/**
 * @param {*} root
 * @param {*} k
 * @returns
 *
 * 我们之所以用中序遍历是因为不知道结点个数
 * 因此，我们可以记录下以每个结点为根结点的子树的结点数
 *
 * 令 node 等于根结点，开始搜索。
 * 对当前结点 node 进行如下操作：
 *   如果 node 的左子树的结点数 left 小于 k−1，则第 k 小的元素一定在 node 的右子树中，令 node 等于其的右子结点，k 等于 k − left − 1，并继续搜索；
 *   如果 node 的左子树的结点数 left 等于 k−1，则第 k 小的元素即为 node ，结束搜索并返回 node 即可；
 *   如果 node 的左子树的结点数 left 大于 k−1，则第 k 小的元素一定在 node 的左子树中，令 node 等于其左子结点，并继续搜索。
 *
 */
var kthSmallest2 = function (root, k) {
  const bst = new MyBst(root);
  return bst.kthSmallest(k);
};

// 当多个函数有关联并且都需要用到公共的变量的时候，定义一个类会更好处理
class MyBst {
  constructor(root) {
    this.root = root;
    this.nodeNum = new Map();
    this.countNodeNum(root);
  }

  // 返回二叉搜索树中第k小的元素
  kthSmallest(k) {
    let node = this.root;
    while (node != null) {
      const left = this.getNodeNum(node.left);
      if (left < k - 1) {
        node = node.right;
        k -= left + 1;
      } else if (left === k - 1) {
        break;
      } else {
        node = node.left;
      }
    }
    return node.val;
  }

  // 统计以node为根结点的子树的结点数
  countNodeNum(node) {
    if (node == null) {
      return 0;
    }
    this.nodeNum.set(
      node,
      1 + this.countNodeNum(node.left) + this.countNodeNum(node.right)
    );
    return this.nodeNum.get(node);
  }

  // 获取以node为根结点的子树的结点数
  getNodeNum(node) {
    return this.nodeNum.get(node) || 0;
  }
}

function main() {}

main();

/**
  LeetCode199---二叉树的右视图

  给定一个二叉树的 根节点 root，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。

  示例 1:
  输入: [1,2,3,null,5,null,4]
  输出: [1,3,4]

  示例 2:
  输入: [1,null,3]
  输出: [1,3]
  
  示例 3:
  输入: []
  输出: []
   

  提示:
    二叉树的节点个数的范围是 [0,100]
    -100 <= Node.val <= 100 

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 * BFS，层序遍历
 *
 */
var rightSideView = function (root) {
  if (root === null) return [];

  const res = [];
  const queue = [root];

  while (queue.length > 0) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();

      if (node.left !== null) queue.push(node.left);
      if (node.right !== null) queue.push(node.right);

      if (i === size - 1) {
        res.push(node.val);
      }
    }
  }

  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 * dfs，按照中右左的顺序递归
 *
 */
var rightSideView = function (root) {
  if (root === null) return [];

  const res = [];

  const dfs = (node, depth) => {
    if (node === null) return;
    // 先访问 当前节点，再递归地访问 右子树 和 左子树。
    // 如果当前节点所在深度还没有出现在res里，说明在该深度下当前节点是第一个被访问的节点，因此将当前节点加入res中。
    if (depth > res.length) {
      res.push(node.val);
    }

    depth++;
    dfs(node.right, depth);
    dfs(node.left, depth);
  };

  dfs(root, 1);

  return res;
};

function main() {}

main();

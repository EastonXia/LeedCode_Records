/**
  LeetCode110---二叉树的直径
  
  给定一个二叉树，判断它是否是高度平衡的二叉树。
  本题中，一棵高度平衡二叉树定义为：
  一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1 。

  示例 1：
  输入：root = [3,9,20,null,null,15,7]
  输出：true

  示例 2：
  输入：root = [1,2,2,3,3,null,null,4,4]
  输出：false

  示例 3：
  输入：root = []
  输出：true

  提示：
    树中的节点数在范围 [0, 5000] 内
    -10^4 <= Node.val <= 10^4

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function (root) {
  const recur = (node) => {
    if (node === null) return 0; // 表示高度为0；

    const left = recur(node.left);
    const right = recur(node.right);
    
    // 不是平衡二叉树，就直接返回一个小于0的数.
    // 不能返回等于0的数，因为此处表示的含义为当前子树不是平衡二叉树，而0已经表示为当前字数高度为0，会有冲突。
    if (left === -1 || right === -1) return -1; 

    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  };

  return recur(root) !== -1;
};

function main() {
  var tree1 = new TreeNode(1);
  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(3);
  tree1.left.left = new TreeNode(15);
  tree1.left.right = new TreeNode(7);

  console.log(isBalanced(tree1));
}

main();

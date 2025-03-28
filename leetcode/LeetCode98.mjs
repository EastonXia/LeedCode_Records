/**
  LeetCode98---验证二叉搜索树
  
  给你一个二叉树的根节点 root ，判断其是否是一个有效的二叉搜索树。

  有效 二叉搜索树定义如下：
    节点的左子树只包含 小于 当前节点的数。
    节点的右子树只包含 大于 当前节点的数。
    所有左子树和右子树自身必须也是二叉搜索树。

  示例 1：
  输入：root = [2,1,3]
  输出：true

  示例 2：
  输入：root = [5,1,4,null,null,3,6]
  输出：false
  解释：根节点的值是 5 ，但是右子节点的值是 4 。
   
  提示：
    树中节点数目范围在[1, 10^4] 内
    -2^31 <= Node.val <= 2^31 - 1
*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 *
 * 二叉搜索树的性质得知，如果该树用中序遍历得出来的结果一定是升序的
 * 这启示我们在中序遍历的时候实时检查当前节点的值是否大于前一个中序遍历到的节点的值即可
 *
 * 递归中序遍历
 */
var isValidBST = function (root) {
  var pre = Number.MIN_SAFE_INTEGER;

  var inorder = function (root) {
    if (!root) return true;

    if (!inorder(root.left)) {
      return false;
    }

    // 与中序遍历不同的地方
    if (root.val <= pre) {
      return false;
    }
    pre = root.val;

    return inorder(root.right);
  };

  return inorder(root);
};

/**
 * @param {TreeNode} root
 * @return {boolean}
 *
 * 迭代中序遍历
 */
var isValidBST2 = function (root) {
  var pre = Number.MIN_SAFE_INTEGER;
  var stack = [];

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop();

    // 与中序遍历不同的地方
    if (root.val <= pre) {
      return false;
    }
    pre = root.val;

    root = root.right;
  }

  return true;
};

function main() {
  var tree1 = new TreeNode(2);
  tree1.left = new TreeNode(1);
  tree1.right = new TreeNode(3);

  var tree2 = new TreeNode(5);
  tree2.left = new TreeNode(1);
  tree2.right = new TreeNode(4);
  tree2.right.left = new TreeNode(3);
  tree2.right.right = new TreeNode(6);

  // console.log(isValidBST(tree1));
  console.log(isValidBST(tree2));
}

main();

/**
  LeetCode145---二叉树的后序遍历
  
  给定一个二叉树的根节点 root ，返回它的 后序 遍历。

  示例 1：
  输入：root = [1,null,2,3]
  输出：[1,2,3]

  示例 2：
  输入：root = []
  输出：[]

  示例 3：
  输入：root = [1]
  输出：[1]

  示例 4：
  输入：root = [1,2]
  输出：[1,2]

  示例 5：
  输入：root = [1,null,2]
  输出：[1,2]

  提示：
    树中节点数目在范围 [0, 100] 内
    -100 <= Node.val <= 100
   
  进阶: 递归算法很简单，你可以通过迭代算法完成吗？

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
 * 递归(非常简单，一般面试不会考递归的)
 */
var postorderTraversal = function (root) {
  var res = [];

  var preorder = function (root) {
    if (!root) return;
    preorder(root.left);
    preorder(root.right);
    res.push(root.val);
  };

  preorder(root);

  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 * 迭代(通常面试都是考这个，必须掌握了)
 * 与递归区别在于隐式地维护了一个栈，而我们在迭代的时候需要显式地将这个栈模拟出来，其他都相同
 * 使用迭代的方法：后序遍历是左右中，逆序之后是中右左。先序遍历是中左右。
 * 只需要把先序遍历中先走左分支的部分改为右分支即可。结果再reverse。
 *
 */
var postorderTraversal2 = function (root) {
  var res = [];
  var stk = []; // 模拟系统栈

  // 前序遍历修改，中右左
  while (root || stk.length) {
    // 右子节点搜索入栈，并把当前的添加到结果中，直到root.right === null
    while (root) {
      res.push(root.val);
      stk.push(root);
      root = root.right;
    }

    // 右子树为空了，弹出自身
    root = stk.pop();

    // 然后往左子树搜索
    root = root.left;
  }

  // 反转
  return res.reverse();
};

function main() {
  var tree1 = new TreeNode(1);
  tree1.right = new TreeNode(2);
  tree1.right.left = new TreeNode(3);

  var tree2 = new TreeNode();

  var tree3 = new TreeNode(1);

  var tree4 = new TreeNode(1);
  tree4.left = new TreeNode(2);

  var tree5 = new TreeNode(1);
  tree5.right = new TreeNode(2);

  console.log(postorderTraversal(tree1));
  console.log(postorderTraversal(tree2));
  console.log(postorderTraversal(tree3));
  console.log(postorderTraversal(tree4));
  console.log(postorderTraversal(tree5));
}

main();

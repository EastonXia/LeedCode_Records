/**
  LeetCode94---二叉树的中序遍历
  
  给定一个二叉树的根节点 root ，返回它的 中序 遍历。

  示例 1：
  输入：root = [1,null,2,3]
  输出：[1,3,2]

  示例 2：
  输入：root = []
  输出：[]

  示例 3：
  输入：root = [1]
  输出：[1]

  示例 4：
  输入：root = [1,2]
  输出：[2,1]

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
 var inorderTraversal = function (root) {
  var res = [];

  var inorder = function (root) {
      if (!root) return;
      inorder(root.left);
      res.push(root.val);
      inorder(root.right);
  }
  
  inorder(root);

  return res;
};

/**
 * @param {TreeNode} root
 * @return {number[]}
 * 
 * 迭代(通常面试都是考这个，必须掌握了)
 * 与递归区别在于隐式地维护了一个栈，而我们在迭代的时候需要显式地将这个栈模拟出来，其他都相同
 * 
 */
 var inorderTraversal2 = function (root) {
  var res = [];
  var stk = []; // 模拟系统栈

  while (root || stk.length) {
      // 左子节点搜索入栈，直到root.left === null
      while (root) {
          stk.push(root);
          root = root.left;
      }

      // 左子树为空了，弹出自身，加入到结果中
      root = stk.pop(); 
      res.push(root.val);

      // 然后往右子树搜索
      root = root.right;
  }
  return res;

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

  console.log(inorderTraversal(tree1));
  console.log(inorderTraversal(tree2));
  console.log(inorderTraversal(tree3));
  console.log(inorderTraversal(tree4));
  console.log(inorderTraversal(tree5));
}

main();

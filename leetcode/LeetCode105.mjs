/**
  LeetCode105---从前序与中序遍历序列构造二叉树
  
  给定一棵树的前序遍历 preorder 与中序遍历  inorder。请构造二叉树并返回其根节点。

  示例 1:
  Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
  Output: [3,9,20,null,null,15,7]

  示例 2:
  Input: preorder = [-1], inorder = [-1]
  Output: [-1]
   
  提示:
    1 <= preorder.length <= 3000
    inorder.length == preorder.length
    -3000 <= preorder[i], inorder[i] <= 3000
    preorder 和 inorder 均无重复元素
    inorder 均出现在 preorder
    preorder 保证为二叉树的前序遍历序列
    inorder 保证为二叉树的中序遍历序列

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 *
 */
var buildTree = function (preorder, inorder) {
  var preorderLen = preorder.length;
  var inorderLen = inorder.length;

  var inorderMap = new Map();
  for (var i = 0; i < inorderLen; i++) {
    inorderMap.set(inorder[i], i);
  }

  return buildTreeHelper(
    preorder,
    0,
    preorderLen - 1,
    inorder,
    0,
    inorderLen - 1,
    inorderMap
  );
};

/**
 * @param {number[]} preorder    二叉树前序遍历结果
 * @param {number} preorderLeft  二叉树前序遍历结果的左边界
 * @param {number} preorderRight 二叉树前序遍历结果的右边界
 * @param {number[]} inorder     二叉树中序遍历结果
 * @param {number} inorderLeft   二叉树中序遍历结果的左边界
 * @param {number} inorderRight  二叉树中序遍历结果的右边界
 * @param {number} inorderMap    二叉树中序遍历Map
 * @return {TreeNode}
 *
 */
var buildTreeHelper = function (
  preorder,
  preorderLeft,
  preorderRight,
  inorder,
  inorderLeft,
  inorderRight,
  inorderMap
) {
  // 因为是递归调用的方法，按照国际惯例，先写递归终止条件
  if (preorderLeft > preorderRight || inorderLeft > inorderRight) {
    return null;
  }

  var rootVal = preorder[preorderLeft];
  var rootNode = new TreeNode(rootVal);

  var inorderRootIndex = inorderMap.get(rootVal);
  var leftTreeLen = inorderRootIndex - inorderLeft;

  rootNode.left = buildTreeHelper(
    preorder,
    preorderLeft + 1,
    preorderLeft + leftTreeLen,
    inorder,
    inorderLeft,
    inorderRootIndex - 1,
    inorderMap
  );
  rootNode.right = buildTreeHelper(
    preorder,
    preorderLeft + leftTreeLen + 1,
    preorderRight,
    inorder,
    inorderRootIndex + 1,
    inorderRight,
    inorderMap
  );

  return rootNode;
};

function main() {
  console.log(buildTree([3, 9, 20, 15, 7], [9, 3, 15, 20, 7]));
  console.log(buildTree([-1], [-1]));
}

main();

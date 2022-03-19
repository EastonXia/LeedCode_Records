/**
  LeetCode101---对称二叉树
  
  给定一个二叉树，检查它是否是镜像对称的。

  例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
      1
    / \
    2   2
  / \ / \
  3  4 4  3
   
  但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
      1
    / \
    2   2
    \   \
    3    3
   
  进阶：
    你可以运用递归和迭代两种方法解决这个问题吗？

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 如何判断是否对称: 
 *  它们的两个根结点具有相同的值
 *  每个树的右子树都与另一个树的左子树镜像对称
 *  通过「同步移动」两个指针的方法来遍历这棵树，p 指针和 q 指针一开始都指向这棵树的根，随后 p 右移时，q 左移，p 左移时q 右移。
 *  每次检查当前 p 和 q 节点的值是否相等，如果相等再判断左右子树是否对称。
 */
 var isSymmetric = function (root) {
  return check(root, root)
};

var check = function (pTreeNode, qTreeNode) {
  if (!pTreeNode && !qTreeNode) return true; // 如果两个都为空，其实也也是对称的
  if (!pTreeNode || !qTreeNode) return false; // 如果其中一个为空，那就是不对称

  return pTreeNode.val === qTreeNode.val && check(pTreeNode.left, qTreeNode.right) && check(pTreeNode.right, qTreeNode.left)
}

/**
 * @param {TreeNode} root
 * @return {boolean}
 * 如何判断是否对称: 
 *  它们的两个根结点具有相同的值
 *  每个树的右子树都与另一个树的左子树镜像对称
 *  通过「同步移动」两个指针的方法来遍历这棵树，p 指针和 q 指针一开始都指向这棵树的根，随后 p 右移时，q 左移，p 左移时q 右移。
 *  每次检查当前 p 和 q 节点的值是否相等，如果相等再判断左右子树是否对称。
 */
 var isSymmetric2 = function (root) {
  return check2(root, root)
};

var check2 = (uTreeNode, vTreeNode) => {
  var quene = [];
  quene.push(uTreeNode);
  quene.push(vTreeNode);

  while (quene.length) {
      uTreeNode = quene.shift();
      vTreeNode = quene.shift();

      if (!uTreeNode && !vTreeNode) continue; // 两个结点都是空时，跳过这轮循环
      // 有一个为空，或者值不相等，直接返回false
      if ((!uTreeNode || !vTreeNode) || (uTreeNode.val !== vTreeNode.val)) return false;

      quene.push(uTreeNode.left); 
      quene.push(vTreeNode.right);

      quene.push(uTreeNode.right); 
      quene.push(vTreeNode.left);
  }
  return true;
}


function main() {
  var tree1 = new TreeNode(1);
  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(2);
  tree1.left.left = new TreeNode(3);
  tree1.left.right = new TreeNode(4);
  tree1.right.left = new TreeNode(4);
  tree1.right.right = new TreeNode(3);

  var tree2 = new TreeNode(1);
  tree2.left = new TreeNode(2);
  tree2.right = new TreeNode(2);
  tree2.left.left = new TreeNode(3);
  tree2.right.right = new TreeNode(3);

  console.log(isSymmetric(tree1));
  console.log(isSymmetric(tree2));
}

main();

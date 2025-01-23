/**
  LeetCode543---二叉树的直径
  
  给定一棵二叉树，你需要计算它的直径长度。一棵二叉树的直径长度是任意两个结点路径长度中的最大值。这条路径可能穿过也可能不穿过根结点。

  示例 :
  给定二叉树
            1
          / \
          2   3
        / \     
        4   5    
  返回 3, 它的长度是路径 [4,2,1,3] 或者 [5,2,1,3]。

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let ans = 1;

  const depth = (node) => {
    if (node === null) return 0;
    const left = depth(node.left); // 左侧有多少个节点
    const right = depth(node.right); // 右侧有多少个节点
    ans = Math.max(ans, left + right + 1); // 最大值与，左侧 + 自身 + 右侧节点数比较

    return Math.max(left, right) + 1 // 左侧/右侧 与自身
  };

  depth(root);

  return ans - 1; // 返回结果不包含开始的节点，所以减 1
};

function main() {
  var tree1 = new TreeNode(1);
  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(3);
  tree1.left.left = new TreeNode(15);
  tree1.left.right = new TreeNode(7);

  console.log(diameterOfBinaryTree(tree1));
}

main();

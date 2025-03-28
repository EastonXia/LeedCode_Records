/**
  LeetCode103---二叉树的锯齿形层序遍历
  
  给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

  例如：
  给定二叉树 [3,9,20,null,null,15,7],
      3
    / \
    9  20
      /  \
    15   7
  返回锯齿形层序遍历如下：
  [
    [3],
    [20,9],
    [15,7]
  ]

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var zigzagLevelOrder = function(root) {
  var res = [];
  if (!root) {
      return res;
  }

  var quene = [];
  quene.push(root);
  var isOdd = false; // 判断当前层数是否时奇数层，从0开始算。

  while (quene.length !== 0) {
      var currentLevelSize = quene.length;
      var level = [];
      
      for (var i = 1; i <= currentLevelSize; i++) {
          // 变量 i 无实际意义，只是为了循环 n 次
          var node = quene.shift();
          level.push(node.val);

          if (node.left) quene.push(node.left);
          if (node.right) quene.push(node.right);
      }
      // 如果是奇数层，则反转数组
      if(isOdd) {
          level.reverse();
      } 
      res.push(level);
      
      isOdd = !isOdd
  }

  return res;
};

function main() {
  var tree1 = new TreeNode(3);
  tree1.left = new TreeNode(9);
  tree1.right = new TreeNode(20);
  tree1.right.left = new TreeNode(15);
  tree1.right.right = new TreeNode(7);

  console.log(zigzagLevelOrder(tree1));
  console.log(zigzagLevelOrder(tree2));
}

main();

/**
  LeetCode102---二叉树的层序遍历
  
  给你一个二叉树，请你返回其按 层序遍历 得到的节点值。（即逐层地，从左到右访问所有节点）。
 
  示例：
  二叉树：[3,9,20,null,null,15,7],
      3
    / \
    9  20
      /  \
    15   7
  返回其层序遍历结果：
  [
    [3],
    [9,20],
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
 * 
 * 广度优先遍历
 * 把遍历到的结点放入到一个队列里面，然后从队列的头部把元素取出来
 * 根据当前队列长度，间接确定元素的层数
 * 
 */
 var levelOrder = function (root) {
  var res = [];
  if (!root) {
      return res;
  }

  var quene = [];
  quene.push(root);

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
      res.push(level);
  }

  return res;

};

function main() {
  var tree1 = new TreeNode(3);
  tree1.left = new TreeNode(9);
  tree1.right = new TreeNode(20);
  tree1.right.left = new TreeNode(15);
  tree1.right.right = new TreeNode(7);

  console.log(levelOrder(tree1));
  console.log(levelOrder(tree2));
}

main();

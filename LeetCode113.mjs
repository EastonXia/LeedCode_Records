/**
  LeetCode113---路径总和 II
  
  给你二叉树的根节点 root 和一个整数目标和 targetSum ，找出所有 从根节点到叶子节点 路径总和等于给定目标和的路径。
  叶子节点 是指没有子节点的节点。

  示例 1：
  输入：root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
  输出：[[5,4,11,2],[5,8,4,5]]

  示例 2：
  输入：root = [1,2,3], targetSum = 5
  输出：[]

  示例 3：
  输入：root = [1,2], targetSum = 0
  输出：[]

  提示：
    树中节点总数在范围 [0, 5000] 内
    -1000 <= Node.val <= 1000
    -1000 <= targetSum <= 1000

*/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {number[][]}
 * 
 * 经典回溯
 * 
 */
var pathSum = function (root, targetSum) {
  const result = []; // 结果数组
  const path = []; // 路径数组

  const dfs = (node, targetSum) => {
    if (node === null) return;

    path.push(node.val);
    targetSum -= node.val; // 通过减少targetSum的方式找出路径
    // 符合路径的条件就添加到结果中
    if (node.left === null && node.right === null && targetSum === 0) {
      result.push([...path]);
    }

    dfs(node.left, targetSum);
    dfs(node.right, targetSum);
    path.pop(); // 路径状态恢复
  };

  dfs(root, targetSum);

  return result;
};

function main() {
  var tree1 = new TreeNode(1);
  tree1.left = new TreeNode(2);
  tree1.right = new TreeNode(3);
  tree1.left.left = new TreeNode(15);
  tree1.left.right = new TreeNode(7);

  console.log(pathSum(tree1));
}

main();

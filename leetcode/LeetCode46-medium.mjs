/**
  LeetCode46---全排列

  给定一个不含重复数字的数组 nums ，返回其 所有可能的全排列 。你可以 按任意顺序 返回答案。

  示例 1：
  输入：nums = [1,2,3]
  输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

  示例 2：
  输入：nums = [0,1]
  输出：[[0,1],[1,0]]

  示例 3：
  输入：nums = [1]
  输出：[[1]]

  提示：
    1 <= nums.length <= 6
    -10 <= nums[i] <= 10
    nums 中的所有整数 互不相同

*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 * 回溯法
 * 
 * 以数组 [1, 2, 3] 的全排列为例。
   先写以 1 开头的全排列，它们是：[1, 2, 3], [1, 3, 2]，即 1 + [2, 3] 的全排列（注意：递归结构体现在这里）；
   再写以 2 开头的全排列，它们是：[2, 1, 3], [2, 3, 1]，即 2 + [1, 3] 的全排列；
   最后写以 3 开头的全排列，它们是：[3, 1, 2], [3, 2, 1]，即 3 + [1, 2] 的全排列。
   总结搜索的方法：按顺序枚举每一位可能出现的情况，已经选择的数字在 当前 要选择的数字中不能出现。按照这种策略搜索就能够做到 不重不漏。这样的思路，可以用一个树形结构表示。

*/
function permute (nums) {
  var len = nums.length;
  var res = [];
  if (len === 0) return res;

  // 设计状态变量
  // 首先这棵树除了根结点和叶子结点以外，每一个结点做的事情其实是一样的，
  // 即：在已经选择了一些数的前提下，在剩下的还没有选择的数中，依次选择一个数，这显然是一个 递归 结构；
  // 递归的终止条件是： 一个排列中的数字已经选够了 ，
  // 因此我们需要一个变量来表示当前程序递归到第几层，我们把这个变量叫做 depth，或者命名为 index ，表示当前要确定的是某个全排列中下标为 index 的那个数是多少；
  // 布尔数组 used，初始化的时候都为 false 表示这些数还没有被选择，当我们选定一个数的时候，就将这个数组的相应位置设置为 true ，
  // 这样在考虑下一个位置的时候，就能够以 O(1) 的时间复杂度判断这个数是否被选择过，这是一种「以空间换时间」的思想。

  // 由于回溯问题本身时间复杂度就很高，所以能用空间换时间就尽量使用空间。
  var path = [];
  var used = new Array(len).fill(false);

  dfs(nums, len, 0, path, used, res);

  return res;
};

/**
 * @param {number[]}   nums    题目给的原始数组
 * @param {number}     len     原始数组的长度
 * @param {number}     depth   遍历的深度
 * @param {number[]}   path    深度遍历路径数组
 * @param {boolean[]}  used    判断哪个元素已使用
 * @param {number[][]} res     最终结果
 *
 * 回溯函数
 *
 */
var dfs = function (nums, len, depth, path, used, res) {
  if (depth === len) {
    // 变量 path 所指向的列表 在深度优先遍历的过程中只有一份 ，深度优先遍历完成以后，回到了根结点，成为空列表。
    // 在 js中，参数传递是 值传递，对象类型变量在传参的过程中，复制的是变量的地址。
    // 这些地址被添加到 res 变量，但实际上指向的是同一块内存地址，因此我们会看到 6 个空的列表对象。
    // 解决的方法很简单，在 res.add(path); 这里做一次拷贝即可。
    res.push([...path]);

    // res.push(path); // 如果不回溯，定义新的变量，这里就不需要定义新数组
    return;
  }

  for (var i = 0; i < len; i++) {
    if (!used[i]) {
      // 正常进行回溯
      path.push(nums[i]);
      used[i] = true;
      // 递归
      dfs(nums, len, depth + 1, path, used, res);

      // 进行回溯，状态重置，回到上一层的状态
      used[i] = false;
      path.pop();

      // 如果不想进行回溯操作的话，需要另外定义变量
      // 但是在候选数比较多的时候，在非叶子结点上创建新的状态变量的性能消耗就很严重。
      // var newPath = new Array().concat(path);
      // newPath.push(nums[i]);
      // var newUsed = new Array().concat(used);
      // newUsed[i] = true;
      // dfs(nums, len, depth + 1, newPath, newUsed, res); 
      
    }
  }
};

function main() {
  console.log(permute([1, 2, 3]));
  console.log(permute([0, 1]));
  console.log(permute([1]));
}

main();
  
/**
  LeetCod384---打乱数组
  
  给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。打乱后，数组的所有排列应该是 等可能 的。

  实现 Solution class:
  Solution(int[] nums) 使用整数数组 nums 初始化对象
  int[] reset() 重设数组到它的初始状态并返回
  int[] shuffle() 返回数组随机打乱后的结果
   
  示例 1：
  输入
  ["Solution", "shuffle", "reset", "shuffle"]
  [[[1, 2, 3]], [], [], []]
  输出
  [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]

  解释
  Solution solution = new Solution([1, 2, 3]);
  solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
  solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
  solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
   

  提示：
    1 <= nums.length <= 50
    -10^6 <= nums[i] <= 10^6
    nums 中的所有元素都是 唯一的
    最多可以调用 10^4 次 reset 和 shuffle

*/

/**
 * @param {number[]} nums
 *
 * 洗牌算法(shuffle 算法)
 *
 * 具体的，我们从前往后尝试填充 [0, n - 1] 该填入什么数时，通过随机当前下标与（剩余的）哪个下标进行值交换来实现。
 * 对于下标 x 而言，我们从 [x, n - 1] 中随机出一个位置与 x 进行值交换，当所有位置都进行这样的处理后，我们便得到了一个公平的洗牌方案。
 * 
 */
var Solution = function (nums) {
  this.nums = nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return this.nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const temp = [...this.nums];

  for (let i = 0; i < temp.length; i++) {
    const randomIndex = i + Math.floor(Math.random() * (temp.length - i));

    [temp[i], temp[randomIndex]] = [temp[randomIndex], temp[i]];
  }

  return temp;
};

function main() {
  const solution = new Solution([1, 2, 3]);
  solution.shuffle(); // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]
  solution.reset(); // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]
  solution.shuffle(); // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]
}

main();

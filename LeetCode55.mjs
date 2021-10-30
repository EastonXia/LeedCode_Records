/**
  LeetCode55---跳跃游戏
  
  给定一个非负整数数组 nums ，你最初位于数组的 第一个下标 。
  数组中的每个元素代表你在该位置可以跳跃的最大长度。
  判断你是否能够到达最后一个下标。

  示例 1：
  输入：nums = [2,3,1,1,4]
  输出：true
  解释：可以先跳 1 步，从下标 0 到达下标 1, 然后再从下标 1 跳 3 步到达最后一个下标。

  示例 2：
  输入：nums = [3,2,1,0,4]
  输出：false
  解释：无论怎样，总会到达下标为 3 的位置。但该下标的最大跳跃长度是 0 ， 所以永远不可能到达最后一个下标。

  提示：
    1 <= nums.length <= 3 * 104
    0 <= nums[i] <= 105
*/

/**
 * @param {number[]} nums
 * @return {boolean}
 * 
 * 贪心算法
 * 只要存在一个位置 x，它本身可以到达，并且它跳跃的最大长度为 x + nums[x]，这个值大于等于 y，即 x + nums[x] ≥ y，那么位置 y 也可以到达
 * 这样以来，我们依次遍历数组中的每一个位置，并实时维护最远可以到达的位置。
 * 在遍历的过程中，如果最远可以到达的位置大于等于数组中的最后一个位置，那就说明最后一个位置可达，我们就可以直接返回 True 作为答案。
 * 
 */
var canJump = function (nums) {
  var len = nums.length - 1;
  var jumpMax = 0;

  for (var i = 0; i <= len; i++) {
    // 只有小于jumpMax的时候才可以继续寻找最大位置
    if (i <= jumpMax) {
      jumpMax = Math.max(jumpMax, i + nums[i]); // 更新最远位置
    }
    if (jumpMax >= len) return true;
  }

  // 上面的循环无论如何都会遍历完整个数组，下面的循环会再j大于jumpMax时直接退出，但是过用例的事件却变长了
  // var j = 0;
  // while (j <= jumpMax) {
  //   jumpMax = Math.max(jumpMax, j + nums[j]);
  //   if (jumpMax >= len) return true;
  //   j += 1;
  // }

  return false;
};

function main() {
  console.log(canJump([2, 3, 1, 1, 4]));
  console.log(canJump([3, 2, 1, 0, 4]));
}

main();

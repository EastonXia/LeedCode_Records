/**
  LeetCode128---最长连续序列
  
  给定一个未排序的整数数组 nums ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。
  请你设计并实现时间复杂度为 O(n) 的算法解决此问题。

  示例 1：
  输入：nums = [100,4,200,1,3,2]
  输出：4
  解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

  示例 2：
  输入：nums = [0,3,7,2,5,8,4,6,0,1]
  输出：9

  提示：
    0 <= nums.length <= 105
    -109 <= nums[i] <= 109
*/

/**
 * @param {number[]} nums
 * @return {number}
 * 
 * （1）判断num+1，num+2，num3...是否在数组中。如果直接遍历的方式去查找的，时间复杂度为O(n)，改为哈希表查找，时间复杂度为O(1)。
 * （2）遍历数组中每个元素num。实际上我们无需一次针对每个元素num去判断num+1，num+2，num3...是否在数组中，
 *      当num-1已经在数组中的话，那么num-1肯定会进行相应的+1遍历，然后遍历到num，而且从num-1开始的+1遍历必定比从num开始的+1遍历得到的序列长度更长。
 *      因此，这样我们便可将在一个连续序列中的元素进行删减，让其只在最小的元素才开始+1遍历。
 *      比如，现有元素[1,2,4,3,5]，当2,3,4,5发现均有比自己小1的元素存在，那么它们就不会开始+1遍历，而1是连续序列中最小的元素，没有比自己小1的元素存在，所以会开始+1遍历。这样便可将时间复杂度优化为O(n)。
 *
 */
var longestConsecutive = function (nums) {
  var hashSet = new Set();

  // 数组去重，并添加到哈希集合中
  for (var num of nums) {
    hashSet.add(num);
  }

  var ans = 0;

  for (var ele of hashSet) {
    var cur = ele;

    // 找出没有n - 1 的数，以这个数为起点去找连续最长序列
    if (!hashSet.has(cur - 1)) {
      while (hashSet.has(cur + 1)) {
        cur = cur + 1;
      }
    }

    ans = Math.max(ans, cur - ele + 1); // 更新最大长度
  }

  return ans;
};

function main() {
  console.log(longestConsecutive([100, 4, 200, 1, 3, 2]));
  console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
}

main();

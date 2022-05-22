/**
  LeetCode454---四数相加 II
  
  给你四个整数数组 nums1、nums2、nums3 和 nums4 ，数组长度都是 n ，请你计算有多少个元组 (i, j, k, l) 能满足：
  0 <= i, j, k, l < n
  nums1[i] + nums2[j] + nums3[k] + nums4[l] == 0

  示例 1：
  输入：nums1 = [1,2], nums2 = [-2,-1], nums3 = [-1,2], nums4 = [0,2]
  输出：2
  解释：
  两个元组如下：
  1. (0, 0, 0, 1) -> nums1[0] + nums2[0] + nums3[0] + nums4[1] = 1 + (-2) + (-1) + 2 = 0
  2. (1, 1, 0, 0) -> nums1[1] + nums2[1] + nums3[0] + nums4[0] = 2 + (-1) + (-1) + 0 = 0

  示例 2：
  输入：nums1 = [0], nums2 = [0], nums3 = [0], nums4 = [0]
  输出：1

  提示：
    n == nums1.length
    n == nums2.length
    n == nums3.length
    n == nums4.length
    1 <= n <= 200
    -2^28 <= nums1[i], nums2[i], nums3[i], nums4[i] <= 2^28

*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 *
 * 分组 + 哈希表
 *
 * 一采用分为两组，HashMap 存一组，另一组和 HashMap 进行比对。
 * 这样的话情况就可以分为三种：
 *    HashMap 存一个数组，如 A。然后计算三个数组之和，如 BCD。时间复杂度为：O(n)+O(n^3)，得到 O(n^3).
 *    HashMap 存三个数组之和，如 ABC。然后计算一个数组，如 D。时间复杂度为：O(n^3)+O(n)，得到 O(n^3).
 *    HashMap存两个数组之和，如AB。然后计算两个数组之和，如 CD。时间复杂度为：O(n^2)+O(n^2)，得到 O(n^2).
 *
 * 所以我们可以得出要存两个数组算两个数组。
 * 我们以存 AB 两数组之和为例。首先求出 A 和 B 任意两数之和 sumAB，以 sumAB 为 key，sumAB 出现的次数为 value，存入 hashmap 中。
 * 然后计算 C 和 D 中任意两数之和的相反数 sumCD，在 hashmap 中查找是否存在 key 为 sumCD。
 * 算法时间复杂度为 O(n^2)。
 *
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const map = new Map();

  let result = 0;

  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      const value = nums1[i] + nums2[j];
      map.set(value, (map.get(value) || 0) + 1);
    }
  }

  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      const value = -(nums3[i] + nums4[j]);

      if (map.has(value)) {
        result += map.get(value);
      }
    }
  }

  return result;
};

function main() {
  console.log(fourSumCount([1, 2], [-2, -1], [-1, 2], [0, 2]));
  console.log(fourSumCount([0], [0], [0], [0]));
}

main();

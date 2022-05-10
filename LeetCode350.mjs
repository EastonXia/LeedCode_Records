/**
  LeetCode350---两个数组的交集 II
  
  给你两个整数数组 nums1 和 nums2 ，请你以数组形式返回两数组的交集。返回结果中每个元素出现的次数，应与元素在两个数组中都出现的次数一致（如果出现次数不一致，则考虑取较小值）。可以不考虑输出结果的顺序。

  示例 1：
  输入：nums1 = [1,2,2,1], nums2 = [2,2]
  输出：[2,2]

  示例 2:
  输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
  输出：[4,9]
   
  提示：
    1 <= nums1.length, nums2.length <= 1000
    0 <= nums1[i], nums2[i] <= 1000
   
  进阶：
    如果给定的数组已经排好序呢？你将如何优化你的算法？
    如果 nums1 的大小比 nums2 小，哪种方法更优？
    如果 nums2 的元素存储在磁盘上，内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * 哈希表
 *
 * 首先遍历第一个数组，并在哈希表中记录第一个数组中的每个数字以及对应出现的次数
 * 然后遍历第二个数组，对于第二个数组中的每个数字，如果在哈希表中存在这个数字，则将该数字添加到答案，并减少哈希表中该数字出现的次数。
 *
 * 为了降低空间复杂度，首先遍历较短的数组并在哈希表中记录每个数字以及对应出现的次数
 *
 */
var intersect = function (nums1, nums2) {
  if (nums1.length > nums2.length) return intersect(nums2, nums1);

  const map = new Map();

  for (let num of nums1) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const result = [];

  for (let num of nums2) {
    if (map.get(num) && map.get(num) !== 0) {
      result.push(num);
      map.set(num, map.get(num) - 1);
    }
  }

  return result;
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 * 排序 + 双指针
 *
 * 将两个数组进行排序，随后用双指针顺序查找相同的元素
 *
 */
var intersect = function (nums1, nums2) {
  // 此处需要传入compare函数，否则排序会出问题
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  let left = 0;
  let right = 0;
  const result = [];

  while (left < nums1.length && right < nums2.length) {
    if (nums1[left] < nums2[right]) {
      left += 1;
    } else if (nums1[left] === nums2[right]) {
      result.push(nums1[left]);
      left += 1;
      right += 1;
    } else {
      right += 1;
    }
  }

  return result;
};

function main() {
  // console.log(intersect([1, 2, 2, 1], [2, 2]));
  // console.log(intersect([4, 9, 5], [9, 4, 9, 8, 4]));
  console.log(
    intersect(
      [
        61, 24, 20, 58, 95, 53, 17, 32, 45, 85, 70, 20, 83, 62, 35, 89, 5, 95,
        12, 86, 58, 77, 30, 64, 46, 13, 5, 92, 67, 40, 20, 38, 31, 18, 89, 85,
        7, 30, 67, 34, 62, 35, 47, 98, 3, 41, 53, 26, 66, 40, 54, 44, 57, 46,
        70, 60, 4, 63, 82, 42, 65, 59, 17, 98, 29, 72, 1, 96, 82, 66, 98, 6, 92,
        31, 43, 81, 88, 60, 10, 55, 66, 82, 0, 79, 11, 81,
      ],
      [
        5, 25, 4, 39, 57, 49, 93, 79, 7, 8, 49, 89, 2, 7, 73, 88, 45, 15, 34,
        92, 84, 38, 85, 34, 16, 6, 99, 0, 2, 36, 68, 52, 73, 50, 77, 44, 61, 48,
      ]
    )
  );
}

main();

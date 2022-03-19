/**
  LeetCode88---合并两个有序数组
  
  给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
  请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

  注意：最终，合并后数组不应由函数返回，而是存储在数组 nums1 中。
  为了应对这种情况，nums1 的初始长度为 m + n，其中前 m 个元素表示应合并的元素，后 n 个元素为 0 ，应忽略。nums2 的长度为 n 。
   
  示例 1：
  输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
  输出：[1,2,2,3,5,6]
  解释：需要合并 [1,2,3] 和 [2,5,6] 。
  合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。

  示例 2：
  输入：nums1 = [1], m = 1, nums2 = [], n = 0
  输出：[1]
  解释：需要合并 [1] 和 [] 。
  合并结果是 [1] 。

  示例 3：
  输入：nums1 = [0], m = 0, nums2 = [1], n = 1
  输出：[1]
  解释：需要合并的数组是 [] 和 [1] 。
  合并结果是 [1] 。
  注意，因为 m = 0 ，所以 nums1 中没有元素。nums1 中仅存的 0 仅仅是为了确保合并结果可以顺利存放到 nums1 中。

  提示：
    nums1.length == m + n
    nums2.length == n
    0 <= m, n <= 200
    1 <= m + n <= 200
    -10^9 <= nums1[i], nums2[j] <= 10^9

  进阶：你可以设计实现一个时间复杂度为 O(m + n) 的算法解决此问题吗？

*/

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 *
 *
 * 逆向双指针 O(m + n)，且在原数组上操作
 *
 * 如何避免覆盖nums1中的元素，观察可知，nums1的后半部分是空的，可以直接覆盖而不会影响结果。
 * 因此可以指针设置为从后向前遍历，每次取两者之中的较大者放进nums1的最后面。
 *
 * 需要注意的是要等第二个数组全都插入进去才结束
 *
 */
var merge = function (nums1, m, nums2, n) {
  var p1 = m - 1;
  var p2 = n - 1;
  var i = nums1.length - 1;

  while (p2 >= 0) {
    // 确保第二个数组全都插入，即使第一个数组没有遍历完，最终结果也是有序并正确的
    // 第一个数组的元素大，则第一个数组的元素与第一个数组的尾端元素交换
    while (p1 >= 0 && nums1[p1] > nums2[p2]) {
      // 这个循环写得很妙
      var temp1 = nums1[i];
      nums1[i] = nums1[p1];
      nums1[p1] = temp1;
      i--;
      p1--;
    }

    // 第二个数组的元素大，则第二个数组的元素与第一个数组的尾端元素交换
    var temp2 = nums1[i];
    nums1[i] = nums2[p2];
    nums2[p2] = temp2;
    i--;
    p2--;
  }
};

var merge2 = function (nums1, m, nums2, n) {
  var p1 = m - 1;
  var p2 = n - 1;
  var tail = nums1.length - 1;
  var cur;

  // 正常思维写法，谁先到-1，另一个继续走，因此考虑好越界的情况
  while (p1 >= 0 || p2 >= 0) {
    if (p1 === -1) {
      cur = nums2[p2--];
    } else if (p2 === -1) {
      cur = nums1[p1--];
    } else if (nums1[p1] > nums2[p2]) {
      cur = nums1[p1--];
    } else {
      cur = nums2[p2--];
    }
    nums1[tail--] = cur;
  }
};

var merge3 = function (nums1, m, nums2, n) {
  let len1 = m - 1;
  let len2 = n - 1;
  let len = m + n - 1;

  // 正常思维写法，不会越界
  while (len1 >= 0 && len2 >= 0) {
    // 注意--符号在后面，表示先进行计算再减1，这种缩写缩短了代码
    nums1[len--] = nums1[len1] > nums2[len2] ? nums1[len1--] : nums2[len2--];
  }

  // 因为不会越界，当nums1遍历完后，要保证nums2的元素都到nums1中
  function arrayCopy(dest, destIndex, src, srcIndex, length) {
    dest.splice(destIndex, length, ...src.slice(srcIndex, srcIndex + length));
  }

  // 表示将nums2数组从下标0位置开始，拷贝到nums1数组中，从下标0位置开始，长度为len2+1
  arrayCopy(nums1, 0, nums2, 0, len2 + 1);
};

function main() {
  merge([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3);
  merge([1], 1, [], 0);
  merge([0], 0, [1], 1);
}

main();

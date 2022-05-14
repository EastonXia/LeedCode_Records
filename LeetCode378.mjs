/**
  LeetCode378---有序矩阵中第 K 小的元素
  
  给你一个 n x n 矩阵 matrix ，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
  请注意，它是 排序后 的第 k 小元素，而不是第 k 个 不同 的元素。

  你必须找到一个内存复杂度优于 O(n^2) 的解决方案。

  示例 1：
  输入：matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8
  输出：13
  解释：矩阵中的元素为 [1,5,9,10,11,12,13,13,15]，第 8 小元素是 13

  示例 2：
  输入：matrix = [[-5]], k = 1
  输出：-5

  提示：
    n == matrix.length
    n == matrix[i].length
    1 <= n <= 300
    -10^9 <= matrix[i][j] <= 10^9
    题目数据 保证 matrix 中的所有行和列都按 非递减顺序 排列
    1 <= k <= n^2
   
  进阶：
    你能否用一个恒定的内存(即 O(1) 内存复杂度)来解决这个问题?
    你能在 O(n) 的时间复杂度下解决这个问题吗?这个方法对于面试来说可能太超前了，但是你会发现阅读这篇文章（ this paper ）很有趣。

*/

/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 *
 * 二分查找
 * 
 * 二分查找可以根据索引二分，也可以根据数值二分，有序数组中，索引的大小可以反映值的大小，对索引二分就行
 * 但这里不是有序的一维数组，索引不能体现值谁大谁小，无法通过二分索引逼近目标值
 * 
 * 1、找出二维矩阵中最小的数 left，最大的数 right，那么第 k 小的数必定在 left ~ right 之间
 * 2、mid = (left + right) / 2；在二维矩阵中寻找小于等于 mid 的元素个数 count
 * 3、若这个 count 小于 k，表明第 k 小的数在右半部分且不包含 mid，即 left = mid + 1, right = right，又保证了第 k 小的数在 left ~ right 之间
 * 4、若这个 count 大于 k，表明第 k 小的数在左半部分且可能包含 mid，即 left = left, right = mid，又保证了第 k 小的数在 left ~ right 之间
 * 5、因为每次循环中都保证了第 k 小的数在 left ~ right 之间，当 left === right 时，第 k 小的数即被找出，等于 right
 * 注意：这里的 left mid right 是数值，不是索引位置。
 *
 */
var kthSmallest = function (matrix, k) {
  const len = matrix.length;
  let low = matrix[0][0];
  let high = matrix[len - 1][len - 1];

  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    const count = countInMatrix(matrix, mid);
    if (count < k) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return low;
};

/**
 * @param {*} matrix
 * @param {*} midVal
 * @returns
 *
 * 统计矩阵中，值小于 midval 的个数
 *
 */
const countInMatrix = (matrix, midVal) => {
  const n = matrix.length; // 这题是方阵 n行n列
  let count = 0;
  let row = 0; // 第一行
  let col = n - 1; // 最后一列
  while (row < n && col >= 0) {
    if (midVal >= matrix[row][col]) {
      // 大于等于当前行的最右
      count += col + 1; // 不大于它的数增加col + 1个
      row++; // 比较下一行
    } else {
      // 干不过当前行的最右元素
      col--; // 留在当前行，比较左边一个
    }
  }
  return count;
};

function main() {
  console.log(
    kthSmallest(
      [
        [1, 5, 9],
        [10, 11, 13],
        [12, 13, 15],
      ],
      8
    )
  );
  console.log(kthSmallest([[-5]], 1));
}

main();

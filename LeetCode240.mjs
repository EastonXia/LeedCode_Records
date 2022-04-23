/**
  LeetCode240---搜索二维矩阵 II

  编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：

  每行的元素从左到右升序排列。
  每列的元素从上到下升序排列。
   
  示例 1：
  输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 5
  输出：true

  示例 2：
  输入：matrix = [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]], target = 20
  输出：false

  提示：
    m == matrix.length
    n == matrix[i].length
    1 <= n, m <= 300
    -10^9 <= matrix[i][j] <= 10^9
    每行的所有元素从左到右升序排列
    每列的所有元素从上到下升序排列
    -10^9 <= target <= 10^9

*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 *
 * 一行一行地二分查找
 *
 * 有两种情况可以提前结束：
 *  当前行的第一个元素大于target，直接返回false
 *  当前行的最后一个元素小于target，直接进入下一行
 *
 */
var searchMatrix = function (matrix, target) {
  for (let i = 0; i < matrix.length; i++) {
    // 当前行的第一个元素大于target，直接返回false
    if (target < matrix[i][0]) break;
    //当前行的最后一个元素小于target，直接进入下一行
    if (target > matrix[i][matrix[0].length]) continue;

    const searchRes = binarySearch(matrix[i], target);
    if (searchRes !== -1) return true;
  }

  return false;
};

/**
 * @param {\} nums
 * @param {*} target
 *
 * 二分查找
 *
 */
var binarySearch = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (target === nums[mid]) {
      return mid;
    } else if (target > nums[mid]) {
      left = mid + 1;
    } else if (target < nums[mid]) {
      right = mid - 1;
    }
  }

  return -1;
};

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 *
 * 数组从左到右是升序的，从上到下也是升序的
 * 那么我们就可以以右上角为判断点了
 * 如果target < 判断点，则判断点对应的列都比target大，那就不用管该列了
 * 如果target > 判断点，则判断点对应的行都比target小，那就不用管改行了
 * 如果target = 判断点，返回答案
 *
 */
var searchMatrix2 = function (matrix, target) {
  let row = 0;
  let col = matrix[0].length - 1;

  while (row <= matrix.length - 1 && col >= 0) {
    if (target < matrix[row][col]) {
      col -= 1;
    } else if (target > matrix[row][col]) {
      row += 1;
    } else if (target === matrix[row][col]) {
      return true;
    }
  }

  return false;
};

function main() {
  console.log(
    searchMatrix(
      [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
      ],
      5
    )
  );
  console.log(
    searchMatrix(
      [
        [1, 4, 7, 11, 15],
        [2, 5, 8, 12, 19],
        [3, 6, 9, 16, 22],
        [10, 13, 14, 17, 24],
        [18, 21, 23, 26, 30],
      ],
      20
    )
  );
}

main();

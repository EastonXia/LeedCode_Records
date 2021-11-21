/**
  LeetCode75---颜色分类(荷兰国旗问题)
  
  给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
  此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

  示例 1：
  输入：nums = [2,0,2,1,1,0]
  输出：[0,0,1,1,2,2]

  示例 2：
  输入：nums = [2,0,1]
  输出：[0,1,2]

  示例 3：
  输入：nums = [0]
  输出：[0]

  示例 4：
  输入：nums = [1]
  输出：[1]

  提示：
    n == nums.length
    1 <= n <= 300
    nums[i] 为 0、1 或 2

  进阶：
    你可以不使用代码库中的排序函数来解决这道题吗？
    你能想出一个仅使用常数空间的一趟扫描算法吗？

*/

/**
 * @param {number[]} nums
 * @return {void} 
 * 
 * 双指针法
 */
var sortColors = function (nums) {
  if (nums.length < 2) return nums;

  var zero = 0; // 表示0的指针，指针的左边全0
  var two = nums.length - 1; // 表示2的指针，指针的右边全2
  var i = 0 // 遍历数组的下标


  while (i <= two) {
      // 交换2之后，nums[i]还是有可能时2，i+1之后会把2pass掉，所以要继续交换
      while (i < two && nums[i] === 2) {
          var bar = nums[two];
          nums[two] = nums[i];
          nums[i] = bar;
          two--;
      }

      // 交换0之后, 即使nums[i]还可能是0，但是由于此时i的左侧是全0，i+1也不会出错
      if (nums[i] === 0) {
          var bar = nums[zero];
          nums[zero] = nums[i];
          nums[i] = bar;
          zero++;
      }
      i++;
  }
};

function main() {
  console.log(sortColors([2, 0, 2, 1, 1, 0]));
  console.log(sortColors([2, 0, 1]));
  console.log(sortColors([0]));
  console.log(sortColors([1]));
}

main();

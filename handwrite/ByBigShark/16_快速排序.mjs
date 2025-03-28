/**
 * 实现快速排序
 *
 */

const quickSort = function (nums) {
  const len = nums.length;
  if (len < 2) return nums;

  const cur = nums[len - 1];
  const left = nums.filter((ele, index) => ele <= cur && index !== len - 1);
  const right = nums.filter((ele) => ele > cur);

  return [...quickSort(left), cur, ...quickSort(right)];
};

/**
 * 如果每次都开两个数组，会消耗很多内存空间，数据量大时可能造成内存溢出，我们要避免开新的内存空间，即原地完成排序
 * 我们可以用元素交换来取代开新数组，在每一次分区的时候直接在原数组上交换元素，
 *
 */
// 这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
const quickSort2 = function (arr, left, right) {
  if (left < right) {
    let pos = left - 1; // pos即“被置换的位置”，第一趟为-1

    for (let i = left; i <= right; i++) {
      //循环遍历数组，置换元素
      let pivot = arr[right]; // 选取数组最后一位作为基准数

      if (arr[i] <= pivot) {
        // 若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
        pos++;
        let temp = arr[pos];
        arr[pos] = arr[i];
        arr[i] = temp;
      }
    }

    // 一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
    quickSort2(arr, left, pos - 1);
    quickSort2(arr, pos + 1, right);
  }

  return arr; // 数组只包含1或0个元素时(即left>=right)，递归终止
};

var arr = [5,1,4,2,3]
var start = 0;
var end = arr.length - 1;
console.log(quickSort2(arr, start, end))

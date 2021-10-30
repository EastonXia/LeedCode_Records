/**
  LeetCode56---合并区间
  
  以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。
  请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。

  示例 1：
  输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
  输出：[[1,6],[8,10],[15,18]]
  解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

  示例 2：
  输入：intervals = [[1,4],[4,5]]
  输出：[[1,5]]
  解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

  提示：
    1 <= intervals.length <= 10^4
    intervals[i].length == 2
    0 <= starti <= endi <= 10^4

*/

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 *
 * 由于给定数组里面的元素区间都是随机的，要考虑的情况太多了
 * 所以我们以区间的左元素为标准进行排序，这样问题就简单很多
 * 
 */ 
var merge = function (intervals) {
  if (intervals.length === 1) return intervals;

  intervals.sort((a, b) => a[0] - b[0]); // 左元素为标准进行排序
  // 初始化结果数组
  var res = [intervals[0]];
  var resIndex = 0;

  // 如果当前区间的左端点在数组 res 中最后一个元素区间的右端点之后，那么它们不会重合，我们可以直接将这个区间加入 res 的末尾；
  // 否则，它们重合，我们需要用当前区间的右端点更新数组 merged 中最后一个区间的右端点，将其置为二者的较大值
  for (var i = 1; i < intervals.length; i++) {
    if (
      intervals[i][0] >= res[resIndex][0] &&
      intervals[i][0] <= res[resIndex][1]
    ) {
      res[resIndex][1] = Math.max(intervals[i][1], res[resIndex][1]);
    }else{
      res.push(intervals[i])
      resIndex++
    }
  }

  return res;
};

function main() {
  console.log(
    merge([
      [1, 3],
      [2, 6],
      [8, 10],
      [15, 18],
    ])
  );
  console.log(
    merge([
      [1, 4],
      [4, 5],
    ])
  );
}

main();

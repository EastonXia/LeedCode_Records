/**
  LeetCode347--- 前 K 个高频元素
  
  给你一个整数数组 nums 和一个整数 k ，请你返回其中出现频率前 k 高的元素。你可以按 任意顺序 返回答案。

  示例 1:
  输入: nums = [1,1,1,2,2,3], k = 2
  输出: [1,2]

  示例 2:
  输入: nums = [1], k = 1
  输出: [1]

  提示：
    1 <= nums.length <= 10^5
    k 的取值范围是 [1, 数组中不相同的元素的个数]
    题目数据保证答案唯一，换句话说，数组中前 k 个高频元素的集合是唯一的
   
  进阶：你所设计算法的时间复杂度 必须 优于 O(n log n) ，其中 n 是数组大小。

*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 *
 * 小根堆
 *
 * 1、要统计元素出现频率，利用map
 * 2、对频率排序，利用小根堆进行排序，可以达到由优于O(nlogn)
 * 3、找出前K个高频元素，小根堆每次都会弹出最小的，所有到最后最大的值都会留在堆里面，我们取堆里面的值就好
 *
 * 这道题时对大(小)根堆这种数据结构的应用，不是堆排序
 *
 */
var topKFrequent = function (nums, k) {
  const len = nums.length;
  const map = new Map();

  for (let num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  // 创建小顶根堆，注意compare函数的写法，a和b是一个[key, value]的数组
  const priorityQueue = new PriorityQueue((a, b) => a[1] - b[1]);

  // 把频率结果放到小根堆里，对频率进行排序，并只留下前K大的数。
  for (let item of map.entries()) {
    priorityQueue.push(item);
    if (priorityQueue.size() > k) {
      priorityQueue.pop();
    }
  }

  const result = new Array(k);

  for (let i = priorityQueue.size() - 1; i >= 0; i--) {
    result[i] = priorityQueue.pop()[0];
  }

  return result;
};

// 实现大(小)根堆的类
class PriorityQueue {
  constructor(compareFn) {
    this.queue = [];
    this.compareFn = compareFn;
  }

  // 使用传入的 compareFn 比较两个位置的元素
  // 会被后面的函数用到，所以后面的函数中需要比较两元素大小直接传入下标就好
  compare(index1, index2) {
    if (this.queue[index1] === undefined) return 1;

    if (this.queue[index2] === undefined) return -1;

    return this.compareFn(this.queue[index1], this.queue[index2]);
  }

  // 上浮
  push(item) {
    this.queue.push(item);

    let index = this.queue.length - 1; // 当前插入元素的下标
    let parent = Math.floor((index - 1) / 2); // 当前插入元素的下标的父节点下标

    while (parent >= 0 && this.compare(parent, index) > 0) {
      // 父元素与当前元素比较，当前元素比父元素大(小)，则交换
      [this.queue[index], this.queue[parent]] = [
        this.queue[parent],
        this.queue[index],
      ];

      // 更新下标
      index = parent;
      parent = Math.floor((index - 1) / 2);
    }
  }

  // 获取堆顶元素并移除
  pop() {
    const res = this.queue[0];
    this.queue[0] = this.queue.pop(); // 需要把最后一个元素放到头部，然后让堆重新调整

    let index = 0; // 堆顶元素下标
    let left = 1; // 堆顶元素左子元素下标
    let selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left; // 左子元素和右子元素，谁的值更大(小)，就选中谁的下标，

    // 当前元素与子元素比较，子元素比父元素大(小)，则交换
    while (
      selectedChild !== undefined &&
      this.compare(index, selectedChild) > 0
    ) {
      [this.queue[index], this.queue[selectedChild]] = [
        this.queue[selectedChild],
        this.queue[index],
      ];

      // 更新下标
      index = selectedChild;
      left = index * 2 + 1;
      selectedChild = this.compare(left, left + 1) > 0 ? left + 1 : left;
    }

    return res;
  }

  size() {
    return this.queue.length;
  }
}

function main() {
  console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));
  console.log(topKFrequent([1], 1));
}

main();

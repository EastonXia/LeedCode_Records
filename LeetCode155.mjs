/**
  LeetCode155---最小栈

  设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。

  实现 MinStack 类:
  MinStack() 初始化堆栈对象。
  void push(int val) 将元素val推入堆栈。
  void pop() 删除堆栈顶部的元素。
  int top() 获取堆栈顶部的元素。
  int getMin() 获取堆栈中的最小元素。
   
  示例 1:
  输入：
  ["MinStack","push","push","push","getMin","pop","top","getMin"]
  [[],[-2],[0],[-3],[],[],[],[]]

  输出：
  [null,null,null,null,-3,null,0,-2]

  解释：
  MinStack minStack = new MinStack();
  minStack.push(-2);
  minStack.push(0);
  minStack.push(-3);
  minStack.getMin();   --> 返回 -3.
  minStack.pop();
  minStack.top();      --> 返回 0.
  minStack.getMin();   --> 返回 -2.
   
  提示：
    -2^31 <= val <= 2^31 - 1
    pop、top 和 getMin 操作总是在 非空栈 上调用
    push, pop, top, and getMin最多被调用 3 * 10^4 次
*/

/**
 * 辅助栈
 *
 * 主要需要考虑的是获取最小值的方法
 *
 * 当一个元素要入栈时，我们取当前辅助栈的栈顶存储的最小值，与当前元素比较得出最小值，将这个最小值插入辅助栈中；
 * 当一个元素要出栈时，我们把辅助栈的栈顶元素也一并弹出；
 * 在任意一个时刻，栈内元素的最小值就存储在辅助栈的栈顶元素中。
 *
 */
var MinStack = function () {
  this.stack = [];
  this.minStack = [Infinity];
};

/**
 * @param {number} val
 * @return {void}
 *
 * 将元素val推入堆栈。
 *
 */
MinStack.prototype.push = function (val) {
  this.stack.push(val);
  this.minStack.push(Math.min(val, this.minStack[this.minStack.length - 1]));
};

/**
 * @return {void}
 *
 * 删除堆栈顶部的元素。
 *
 */
MinStack.prototype.pop = function () {
  this.stack.pop();
  this.minStack.pop();
};

/**
 * @return {number}
 *
 * 获取堆栈顶部的元素。
 *
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 *
 * 获取堆栈中的最小元素。
 *
 */
MinStack.prototype.getMin = function () {
  return this.minStack[this.minStack.length - 1];
};

function main() {
  var obj = new MinStack();
  obj.push(val);
  obj.pop();
  var param_3 = obj.top();
  var param_4 = obj.getMin();
}

main();

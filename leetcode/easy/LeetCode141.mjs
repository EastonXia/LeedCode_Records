/**
  LeetCode141---环形链表

  给你一个链表的头节点 head ，判断链表中是否有环。
  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
  为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。注意：pos 不作为参数进行传递 。仅仅是为了标识链表的实际情况。
  如果链表中存在环 ，则返回 true 。 否则，返回 false 。

  示例 1：
  输入：head = [3,2,0,-4], pos = 1
  输出：true
  解释：链表中有一个环，其尾部连接到第二个节点。
  示例 2：
  输入：head = [1,2], pos = 0
  输出：true
  解释：链表中有一个环，其尾部连接到第一个节点。
  示例 3：
  输入：head = [1], pos = -1
  输出：false
  解释：链表中没有环。

  提示：
    链表中节点的数目范围是 [0, 10^4]
    -10^5 <= Node.val <= 10^5
    pos 为 -1 或者链表中的一个 有效索引 。
   

  进阶：你能用 O(1)（即，常量）内存解决此问题吗？
 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 *
 * 快慢指针(龟兔赛跑算法)
 *
 * 假想「乌龟」和「兔子」在链表上移动，「兔子」跑得快，「乌龟」跑得慢。
 * 当「乌龟」和「兔子」从链表上的同一个节点开始移动时，如果该链表中没有环，那么「兔子」将一直处于「乌龟」的前方；如果该链表中有环，那么「兔子」会先于「乌龟」进入环，并且一直在环内移动。
 * 等到「乌龟」进入环时，由于「兔子」的速度快，它一定会在某个时刻与乌龟相遇，即套了「乌龟」若干圈。
 *
 */
var hasCycle = function (head) {
  if (head === null || head.next === null) {
    return false;
  }

  // 因为下面使用while循环，所以不能让fast指向head
  var slow = head;
  var fast = head.next;

  while (slow !== fast) {
    if (fast === null || fast.next === null) { // 符合此条件之一则不是环
      return false;
    }
    slow = slow.next; // 慢指针移动一次模拟乌龟
    fast = fast.next.next; // 快指针移动两次模拟兔子
  }
  
  return true;
};

function main() {
  var link1 = new ListNode(3);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(0);
  link1.next.next.next = new ListNode(-4);
  link1.next.next.next.next = link1.next;

  var link2 = new ListNode(1);
  link2.next = new ListNode(2);
  link2.next.next = link2;

  var link3 = new ListNode(1);

  console.log(hasCycle(link1));
  console.log(hasCycle(link2));
  console.log(hasCycle(link3));
}

main();

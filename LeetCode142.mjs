/**
  LeetCode142---环形链表II

  给定一个链表的头节点  head ，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
  如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 
  为了表示给定链表中的环，评测系统内部使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。
  如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。
  不允许修改链表。

  示例 1：
  输入：head = [3,2,0,-4], pos = 1
  输出：返回索引为 1 的链表节点
  解释：链表中有一个环，其尾部连接到第二个节点。

  示例 2：
  输入：head = [1,2], pos = 0
  输出：返回索引为 0 的链表节点
  解释：链表中有一个环，其尾部连接到第一个节点。

  示例 3：
  输入：head = [1], pos = -1
  输出：返回 null
  解释：链表中没有环。

  提示：
    链表中节点的数目范围在范围 [0, 10^4] 内
    -10^5 <= Node.val <= 10^5
    pos 的值为 -1 或者链表中的一个有效索引

 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 *
 * 本题理论性比较强，直接看题解
 * https://leetcode.cn/problems/linked-list-cycle-ii/solution/linked-list-cycle-ii-kuai-man-zhi-zhen-shuang-zhi-/
 *
 */
var detectCycle = function (head) {
  let slow = head;
  let fast = head;

  // 第一次相遇，slow走一步，fast走两步
  while (true) {
    // 注意这里是两个fast的判断
    if (fast === null || fast === null) return null;

    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  // 第二次相遇，fast先指回头部，然后slow走一步，fast走一步，直到相遇。
  fast = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return fast;
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

  console.log(detectCycle(link1));
  console.log(detectCycle(link2));
  console.log(detectCycle(link3));
}

main();

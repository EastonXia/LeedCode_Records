/**
  LeetCode19---删除链表的倒数第 N 个结点

  给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。
  进阶：你能尝试使用一趟扫描实现吗？

  示例 1：
  输入：head = [1,2,3,4,5], n = 2
  输出：[1,2,3,5]

  示例 2：
  输入：head = [1], n = 1
  输出：[]

  示例 3：
  输入：head = [1,2], n = 1
  输出：[1]
   
  提示：
  链表中结点的数目为 sz
    1 <= sz <= 30
    0 <= Node.val <= 100
    1 <= n <= sz
*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * 
 * 除了双指针法，可以考虑一下使用栈，毕竟这道题和栈的性质很类似
 */
var removeNthFromEnd = function (head, n) {
  if(head.next === null ) return null; // 长度为1直接返回null

  var deleteFrontNode = head; // 作用：删除结点的前一个结点，用于链表拼接。如果不用这个结点，则right = left + n + 1，删除的时候删除left.next
  var left = head; // 作用：表示删除结点
  var right = head; // 作用：获取链表长度

  // 初始时left与right重合的
  while (n > 1 && right.next !== null) {
    right = right.next;
    n--;
  }

  while (right.next !== null) {
    deleteFrontNode = left;
    left = left.next;
    right = right.next;
  }

  if(left === head) return head.next; // 如果left始终没移动，则直接删除head
  deleteFrontNode.next = left.next; // 删除left

  return head;
};

function main() {
  var link1 = new ListNode(1);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(3);
  link1.next.next.next = new ListNode(4);
  link1.next.next.next.next = new ListNode(5);

  var link2 = new ListNode(1);
  link2.next = new ListNode(2);

  var link3 = new ListNode(1);

  console.log(removeNthFromEnd(link1, 2));
  console.log(removeNthFromEnd(link2, 2));
  console.log(removeNthFromEnd(link3, 1));
}

main();

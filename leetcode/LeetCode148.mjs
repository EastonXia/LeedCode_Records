/**
  LeetCode148---排序链表

  给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表 。

  示例 1：
  输入：head = [4,2,1,3]
  输出：[1,2,3,4]
  示例 2：
  输入：head = [-1,5,3,4,0]
  输出：[-1,0,3,4,5]
  示例 3：
  输入：head = []
  输出：[]

  提示：
  链表中节点的数目在范围 [0, 5 * 10^4] 内
  -10^5 <= Node.val <= 10^5
   
  进阶：你可以在 O(n log n) 时间复杂度和常数级空间复杂度下，对链表进行排序吗？
 */

function ListNode(val) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 * 
 * 归并排序（递归法）
 * 
 */
var sortList = function (head) {
  if (head === null || head.next === null) {
    return head;
  }

  // 我们使用快慢双指针法，奇数个节点找到中点，偶数个节点找到中心左边的节点
  var slow = head; // 慢指针的目的：找到链表的中点
  var fast = head.next // 快指针的目的：找到链表的终点
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  var tmp = slow.next; 
  slow.next = null; // 找到中点后，要切断中点后面的连接

  // 切割链表，开始递归，分成左右两部分
  var left = sortList(head);
  var right = sortList(tmp);

  // 定义结果链表的头节点
  var h = new ListNode(0);
  var res = h;

  // 开始合并左右子链表，并排序
  while (left !== null && right !== null) {
    if (left.val < right.val) {
      h.next = left;
      left = left.next;
    } else {
      h.next = right;
      right = right.next;
    }
    h = h.next;
  }
  h.next = left !== null ? left : right; // 因为上面的循环时左、右子链表其中之一位null就结束的，所以需要把另一个没合并完成的链表节点合并

  return res.next; // 因为头节点是我们自己定义的，所以不能直接返回res
};

function main() {
  var link1 = new ListNode(4);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(1);
  link1.next.next.next = new ListNode(3);

  var link2 = new ListNode(-1);
  link2.next = new ListNode(5);
  link2.next.next = new ListNode(3);
  link2.next.next.next = new ListNode(4);
  link2.next.next.next.next = new ListNode(0);

  var link3 = null;

  console.log(sortList(link1));
  console.log(sortList(link2));
  console.log(sortList(link3));
}

main();

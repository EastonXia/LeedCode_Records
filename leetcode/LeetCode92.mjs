/**
  LeetCode92---反转链表II

  给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
  请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
 
  示例 1：
  输入：head = [1,2,3,4,5], left = 2, right = 4
  输出：[1,4,3,2,5]

  示例 2：
  输入：head = [5], left = 1, right = 1
  输出：[5]

  提示：
    链表中节点数目为 n
    1 <= n <= 500
    -500 <= Node.val <= 500
    1 <= left <= right <= n
 
*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 *
 * 递归:
 * 首先实现反转链表前N个节点
 * 然后假设链表头节点是head，在m、n节点反转
 * 则可以转化为，head.next(m次)，在1、n - m节点反转。
 *
 */
var reverseBetween = function (head, m, n) {
  if (m === 1) {
    return reverseN(head, n);
  }

  head.next = reverseBetween(head.next, m - 1, n - 1);

  return head;
};

// 实现反转链表前N个节点
var reverseN = function (head, n) {
  let successor = null; // n + 1位置的节点

  const reverse = (headNode, num) => {
    if (num === 1) {
      // 记录第 n + 1 个节点
      successor = headNode.next;
      return headNode;
    }

    // 以 head.next 为起点，需要反转前 n - 1 个节点
    const last = reverse(headNode.next, num - 1);

    headNode.next.next = headNode;
    // 让反转之后的 head 节点和后面的节点连起来
    headNode.next = successor;

    return last;
  };

  return reverse(head, n);
};

function main() {
  var link1 = new ListNode(1);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(3);
  link1.next.next.next = new ListNode(4);
  link1.next.next.next.next = new ListNode(5);

  var link2 = new ListNode(5);

  console.log(reverseBetween(link1, 2, 4));
  console.log(reverseBetween(link2, 1));
}

main();

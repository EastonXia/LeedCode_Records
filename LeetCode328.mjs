/**
  LeetCode328---奇偶链表
  
  给定单链表的头节点 head ，将所有索引为奇数的节点和索引为偶数的节点分别组合在一起，然后返回重新排序的列表。
  第一个节点的索引被认为是 奇数 ， 第二个节点的索引为 偶数 ，以此类推。
  请注意，偶数组和奇数组内部的相对顺序应该与输入时保持一致。
  你必须在 O(1) 的额外空间复杂度和 O(n) 的时间复杂度下解决这个问题。

  示例 1:
  输入: head = [1,2,3,4,5]
  输出: [1,3,5,2,4]

  示例 2:
  输入: head = [2,1,3,5,6,4,7]
  输出: [2,3,6,7,1,5,4]

  提示:
    n ==  链表中的节点数
    0 <= n <= 10^4
    -10^6 <= Node.val <= 10^6

*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 多指针法
 *
 */
var oddEvenList = function (head) {
  if (head === null || head.next === null) return head;

  // 初始化奇数、偶数的头尾指针
  let oddHead = head,
    oddTail = head;
  let evenHead = head.next,
    evenTail = head.next;

  // 用一个p指针作为遍历链表的指针，处理一次奇数、一次偶数为一次循环
  let p = head.next.next;
  while (p !== null) {
    // 处理奇数链表
    oddTail.next = p;
    oddTail = p;
    p = p.next;

    // 处理偶数链表
    if (p !== null) {
      evenTail.next = p;
      evenTail = p;
      p = p.next;
    }
  }

  // 拼接链表
  oddTail.next = evenHead;
  evenTail.next = null;

  return oddHead;
};

function main() {}

main();

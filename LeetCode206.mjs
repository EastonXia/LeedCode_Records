/**
  LeetCode206---反转链表

  给你单链表的头节点 head ，请你反转链表，并返回反转后的链表。
 
  示例 1：
  输入：head = [1,2,3,4,5]
  输出：[5,4,3,2,1]

  示例 2：
  输入：head = [1,2]
  输出：[2,1]

  示例 3：
  输入：head = []
  输出：[]

  提示：
    链表中节点的数目范围是 [0, 5000]
    -5000 <= Node.val <= 5000
   
  进阶：链表可以选用迭代或递归方式完成反转。你能否用两种方法解决这道题？

*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 迭代
 *
 * 在遍历链表时，将当前节点的 next 指针改为指向前一个节点。
 * 由于节点没有引用其前一个节点，因此必须事先存储其前一个节点。
 * 在更改引用之前，还需要存储后一个节点。最后返回新的头引用
 *
 */
var reverseList = function (head) {
  var prev = null;
  var curr = head;

  while (curr !== null) {
    var next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev
};

/**
 * @param {ListNode} head
 * @return {ListNode}
 *
 * 递归
 *
 * 假设链表的其余部分已经被反转，现在应该如何反转它前面的部分？
 * 
 * 假设 n1 → … → nk−1 → nk → nk+1 → … → nm → ∅
 * 若从节点 nk+1 到 nm 已经被反转，而我们正处于 nk。   n1 → … → nk−1 → nk → nk+1 ← … ← nm
 * 我们希望 nk+1 的下一个节点指向 nk 所以，nk.next.next = nk。
 * 
 */
var reverseList2 = function (head) {
  if(head === null || head.next === null){
    return head;
  }

  var newHead = reverseList2(head.next)
  head.next.next = head  
  head.next = null;

  return newHead;
};

function main() {
  var link1 = new ListNode(1);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(3);
  link1.next.next.next = new ListNode(4);
  link1.next.next.next.next = new ListNode(5);

  var link2 = new ListNode(1);
  link2.next = new ListNode(2);

  var link3 = null;

  console.log(reverseList(link1));
  console.log(reverseList(link2));
  console.log(reverseList(link3));
}

main();

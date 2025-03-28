/**
  LeetCode21---合并两个有序链表

  将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 
  示例 1：
  输入：l1 = [1,2,4], l2 = [1,3,4]
  输出：[1,1,2,3,4,4]

  示例 2：
  输入：l1 = [], l2 = []
  输出：[]

  示例 3：
  输入：l1 = [], l2 = [0]
  输出：[0]
   
  提示：
    两个链表的节点数目范围是 [0, 50]
    -100 <= Node.val <= 100
    l1 和 l2 均按 非递减顺序 排列
*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  if (l1 === null && l2 === null) return null;
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  var dummy = null;

  // 递归轻松应对
  if (l1.val < l2.val) {
    dummy = l1;
    dummy.next = mergeTwoLists(l1.next, l2);
  } else {
    dummy = l2;
    dummy.next = mergeTwoLists(l1, l2.next);
  }

  return dummy;
};

function main() {
  var link1 = new ListNode(1);
  link1.next = new ListNode(2);
  link1.next.next = new ListNode(4);
  var link2 = new ListNode(1);
  link2.next = new ListNode(3);
  link2.next = new ListNode(4);

  var link3 = null;
  var link4 = null;

  var link5 = null;
  var link6 = new ListNode(0);

  console.log(mergeTwoLists(link1, link2));
  console.log(mergeTwoLists(link3, link4));
  console.log(mergeTwoLists(link5, link6));
}

main();

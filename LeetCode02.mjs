/**
  给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字.
  请你将两个数相加，并以相同形式返回一个表示和的链表。
  你可以假设除了数字 0 之外，这两个数都不会以 0 开头

  2 -> 4 -> 3
  5 -> 6 -> 4

  示例 1：
  输入：l1 = [2,4,3], l2 = [5,6,4]
  输出：[7,0,8]
  解释：342 + 465 = 807.

  示例 2：
  输入：l1 = [0], l2 = [0]
  输出：[0]

  示例 3：
  输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
  输出：[8,9,9,9,0,0,0,1]

  提示：
    每个链表中的节点数在范围 [1, 100] 内
    0 <= Node.val <= 9
    题目数据保证列表表示的数字不含前导零
*/

// 定义单链表节点
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  // 定义头尾指针
  var head = null;
  var tail = null;
  var carry = 0; // 进位
  // 两数相加
  while (l1 || l2) {
    // 判断l1、l2是否为空
    var num1 = l1 ? l1.val : 0;
    var num2 = l2 ? l2.val : 0;
    var sum = num1 + num2 + carry;

    if (!head) {
      head = tail = new ListNode(sum % 10);
    } else {
      tail.next = new ListNode(sum % 10);
      tail = tail.next;
    }
    carry = Math.floor(sum / 10);

    l1 = l1?.next;
    l2 = l2?.next;
  }
  
  // 如果进位大于0，则再加一个节点
  tail.next = carry ? new ListNode(carry) : null;
  
  return head;
};

function main() {
  var link1 = new ListNode(2);
  link1.next = new ListNode(4);
  link1.next.next = new ListNode(3);

  var link2 = new ListNode(5);
  link2.next = new ListNode(6);
  link2.next.next = new ListNode(4);

  console.log(addTwoNumbers(link1, link2));

}

main();

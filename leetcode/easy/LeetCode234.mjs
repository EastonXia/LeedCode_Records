
/**
  LeetCode234---回文链表
  
  给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

  示例 1：
  输入：head = [1,2,2,1]
  输出：true

  示例 2：
  输入：head = [1,2]
  输出：false

  提示：
    链表中节点数目在范围[1, 10^5] 内
    0 <= Node.val <= 9
   
  进阶：你能否用 O(n) 时间复杂度和 O(1) 空间复杂度解决此题？

*/

function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {boolean}
 *
 * 把值复制到数组中然后判断
 *
 */
var isPalindrome = function (head) {
  const arr = [];

  while (head !== null) {
    arr.push(head.val);
    head = head.next;
  }

  // 双指针法判断
  for (let i = 0, j = arr.length - 1; i < j; i++, j--) {
    if (arr[i] !== arr[j]) {
      return false;
    }
  }

  return true;
};

/**
 * @param {*} head
 *
 * 快慢指针
 *
 * 整个流程可以分为以下五个步骤：
 *  1、找到前半部分链表的尾节点。
 *  2、反转后半部分链表。
 *  3、判断是否回文。
 *  4、恢复链表。
 *  5、返回结果。
 *
 * 空间复杂度O(1);
 *
 */
var isPalindrome2 = function (head) {
  // 找到前半部分链表的尾节点
  const firstHalfEnd = endOfFirstHalf(head);
  // 反转后半部分链表
  const secondHalfStart = reverseList(firstHalfEnd.next);

  // 判断是否回文
  let p1 = head;
  let p2 = secondHalfStart;
  let result = true;

  while (result && p2 !== null) {
    if (p1.val !== p2.val) {
      result = false;
    }
    p1 = p1.next;
    p2 = p2.next;
  }

  // 恢复链表
  firstHalfEnd.next = reverseList(secondHalfStart)

  return result;
};

/**
 * @param {*} head
 * @returns
 *
 * 把链表分成两份，并把第一部分的最后一个节点返回
 * 如果长度是奇数，则中间的节点算作第一部分
 *
 */
const endOfFirstHalf = function (head) {
  let slow = head;
  let fast = head;

  while (fast.next !== null && fast.next.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
};

/**
 * @param {*} head
 * @returns
 *
 * 反转链表
 *
 */
const reverseList = function (head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  return prev;
};

function main() {
  console.log(isPalindrome([1, 2, 3, 1]));
  console.log(isPalindrome([1, 2, 3, 4]));
}

main();

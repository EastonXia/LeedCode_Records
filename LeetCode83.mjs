/**
  LeetCode83---删除排序链表中的重复元素  

  给定一个已排序的链表的头 head ， 删除所有重复的元素，使每个元素只出现一次 。返回 已排序的链表 。

  示例 1：
  输入：head = [1,1,2]
  输出：[1,2]

  示例 2：
  输入：head = [1,1,2,3,3]
  输出：[1,2,3]

  提示：
    链表中节点数目在范围 [0, 300] 内
    -100 <= Node.val <= 100
    题目数据保证链表已经按升序 排列

*/

// 定义单链表节点
function ListNode(val, next) {
  this.val = val === undefined ? 0 : val;
  this.next = next === undefined ? null : next;
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function(head) {
  if(head === null) return head;

  let value = head.val;
  let cur = head;

  while(cur !== null && cur.next !== null) {
      if(cur.val === cur.next.val) {
          cur.next = cur.next.next;
      } else {
          cur = cur.next
      }
  }

  return head;
};

function main() {
  var link1 = new ListNode(2);
  link1.next = new ListNode(1);
  link1.next.next = new ListNode(2);

  var link2 = new ListNode(1);
  link2.next = new ListNode(1);
  link2.next.next = new ListNode(2);
  link2.next.next.next = new ListNode(3);
  link2.next.next.next.next = new ListNode(3);

  console.log(deleteDuplicates(link1));
  console.log(deleteDuplicates(link1));
}

main();

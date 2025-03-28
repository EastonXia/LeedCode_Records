/**
  LeetCode160---相交链表

  给你两个单链表的头节点 headA 和 headB ，请你找出并返回两个单链表相交的起始节点。如果两个链表不存在相交节点，返回 null 。

  图示两个链表在节点 c1 开始相交：
  题目数据 保证 整个链式结构中不存在环。
  注意，函数返回结果后，链表必须 保持其原始结构 。

  自定义评测：
  评测系统 的输入如下（你设计的程序 不适用 此输入）：
    intersectVal - 相交的起始节点的值。如果不存在相交节点，这一值为 0
    listA - 第一个链表
    listB - 第二个链表
    skipA - 在 listA 中（从头节点开始）跳到交叉节点的节点数
    skipB - 在 listB 中（从头节点开始）跳到交叉节点的节点数
  评测系统将根据这些输入创建链式数据结构，并将两个头节点 headA 和 headB 传递给你的程序。如果程序能够正确返回相交节点，那么你的解决方案将被 视作正确答案 。

  示例 1：
  输入：intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5], skipA = 2, skipB = 3
  输出：Intersected at '8'
  解释：相交节点的值为 8 （注意，如果两个链表相交则不能为 0）。
  从各自的表头开始算起，链表 A 为 [4,1,8,4,5]，链表 B 为 [5,6,1,8,4,5]。
  在 A 中，相交节点前有 2 个节点；在 B 中，相交节点前有 3 个节点。

  示例 2：
  输入：intersectVal = 2, listA = [1,9,1,2,4], listB = [3,2,4], skipA = 3, skipB = 1
  输出：Intersected at '2'
  解释：相交节点的值为 2 （注意，如果两个链表相交则不能为 0）。
  从各自的表头开始算起，链表 A 为 [1,9,1,2,4]，链表 B 为 [3,2,4]。
  在 A 中，相交节点前有 3 个节点；在 B 中，相交节点前有 1 个节点。

  示例 3：
  输入：intersectVal = 0, listA = [2,6,4], listB = [1,5], skipA = 3, skipB = 2
  输出：null
  解释：从各自的表头开始算起，链表 A 为 [2,6,4]，链表 B 为 [1,5]。
  由于这两个链表不相交，所以 intersectVal 必须为 0，而 skipA 和 skipB 可以是任意值。
  这两个链表不相交，因此返回 null 。

  提示：
    listA 中节点数目为 m
    listB 中节点数目为 n
    1 <= m, n <= 3 * 10^4
    1 <= Node.val <= 10^5
    0 <= skipA <= m
    0 <= skipB <= n
    如果 listA 和 listB 没有交点，intersectVal 为 0
    如果 listA 和 listB 有交点，intersectVal == listA[skipA] == listB[skipB]

  进阶：你能否设计一个时间复杂度 O(m + n) 、仅用 O(1) 内存的解决方案？
*/

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 *
 * 哈希表
 *
 * 首先遍历链表 headA，并将链表 headA 中的每个节点加入哈希集合中。然后遍历链表 headB，对于遍历到的每个节点，判断该节点是否在哈希集合中：
 * 如果当前节点不在哈希集合中，则继续遍历下一个节点；
 *  如果当前节点在哈希集合中，则后面的节点都在哈希集合中，即从当前节点开始的所有节点都在两个链表的相交部分，因此在链表 headB 中遍历到的第一个在哈希集合中的节点就是两个链表相交的节点，返回该节点。
 *  如果链表 headB 中的所有节点都不在哈希集合中，则两个链表不相交，返回 null。
 *
 */
var getIntersectionNode = function (headA, headB) {
  var visited = new Set();

  // 先遍历链表A
  var temp = headA;
  while (temp !== null) {
    visited.add(temp);
    temp = temp.next;
  }

  // 再遍历链表B，在hash表中找节点
  temp = headB;
  while (temp !== null) {
    if (visited.has(temp)) {
      return temp;
    }
    temp = temp.next;
  }
  return null;
};

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 *
 * 双指针
 *
 * 如果两个链表相交，那么相交点之后的长度是相同的
 * 我们需要做的事情是，让两个链表从同距离末尾同等距离的位置开始遍历。这个位置只能是较短链表的头结点位置。
 *
 * 为此，我们必须消除两个链表的长度差
 *  指针 pA 指向 A 链表，指针 pB 指向 B 链表，依次往后遍历
 *  如果 pA 到了末尾，则 pA = headB 继续遍历
 *  如果 pB 到了末尾，则 pB = headA 继续遍历
 *  比较长的链表指针指向较短链表head时，长度差就消除了
 * 如此，只需要将最短链表遍历两次即可找到位置
 *
 */
var getIntersectionNode2 = function (headA, headB) {
  // 判断头节点是否为空
  if (headA === null || headB === null) {
    return null;
  }

  var pA = headA;
  var pB = headB;

  // pA、pB遍历
  while (pA !== pB) {
    pA = pA === null ? headB : pA.next;
    pB = pB === null ? headA : pB.next;
  }

  return pA;
};

function main() {}

main();

/**
  LeetCode207---课程表

  你这个学期必须选修 numCourses 门课程，记为 0 到 numCourses - 1 。
  在选修某些课程之前需要一些先修课程。 先修课程按数组 prerequisites 给出，其中 prerequisites[i] = [ai, bi] ，表示如果要学习课程 ai 则 必须 先学习课程  bi 。
  例如，先修课程对 [0, 1] 表示：想要学习课程 0 ，你需要先完成课程 1 。
  请你判断是否可能完成所有课程的学习？如果可以，返回 true ；否则，返回 false 。

  示例 1：
  输入：numCourses = 2, prerequisites = [[1,0]]
  输出：true
  解释：总共有 2 门课程。学习课程 1 之前，你需要完成课程 0 。这是可能的。

  示例 2：
  输入：numCourses = 2, prerequisites = [[1,0],[0,1]]
  输出：false
  解释：总共有 2 门课程。学习课程 1 之前，你需要先完成​课程 0 ；并且学习课程 0 之前，你还应先完成课程 1 。这是不可能的。

  提示：
    1 <= numCourses <= 10^5
    0 <= prerequisites.length <= 5000
    prerequisites[i].length == 2
    0 <= ai, bi < numCourses
    prerequisites[i] 中的所有课程对 互不相同

*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 *
 * 拓扑排序问题
 *
 * 这类问题通常是用图来解决，本题用的是有向无环图
 * 有向图最想要的是理解入度和出度的概念，如果存在一条有向边 A --> B，则这条边给 A 增加了 1 个出度，给 B 增加了 1 个入度。
 *
 * 我们用bfs的思想去做
 * 让入度为 0 的课入列，它们是能直接选的课。
 * 然后逐个出列，出列代表着课被选，需要减小相关课的入度。
 * 如果相关课的入度新变为 0，安排它入列、再出列……直到没有入度为 0 的课可入列。
 *
 * 需要用到的数据结构
 * 入度数组：课号 0 到 n - 1 作为索引，通过遍历先决条件表求出对应的初始入度。
 * 邻接表：用哈希表记录依赖关系（也可以用二维矩阵，但有点大）
 *   key：课号
 *   value：依赖这门课的后续课（数组）
 *
 * 用一个变量 count 记录入列的顶点个数，最后判断 count 是否等于总课程数，来判断是否修完所有课
 *
 */
var canFinish = function (numCourses, prerequisites) {
  const inDegree = new Array(numCourses).fill(0); // 入度数组
  const map = {}; // 邻接表

  // 初始化入度数组和邻接表
  for (let [first, second] of prerequisites) {
    inDegree[first] += 1;
    if (map[second]) {
      map[second].push(first); // 添加依赖它的后续课
    } else {
      map[second] = [first];
    }
  }

  // bfs 数据准备，入度为0的都进队列
  const quene = [];
  for (let i = 0; i < inDegree.length; i++) {
    if (inDegree[i] === 0) quene.push(i);
  }

  let count = 0; // 已修课程
  while (quene.length) {
    const selected = quene.shift(); // 获取已选择的课程
    count += 1;
    const followCourses = map[selected]; // 获取已修课程的后续可修课程
    if (followCourses && followCourses.length) {
      // 确实有后续课
      for (let item of followCourses) {
        inDegree[item] -= 1; // 依赖它的后续课的入度-1
        if (inDegree[item] === 0) {
          // 如果因此减为0，入列
          quene.push(item);
        }
      }
    }
  }

  return count === numCourses;
};

function main() {
  console.log(canFinish(2, [[1, 0]]));
  console.log(
    canFinish(2, [
      [1, 0],
      [0, 1],
    ])
  );
}

main();

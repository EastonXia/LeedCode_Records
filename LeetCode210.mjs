/**
  LeetCode210---课程表 II

  现在你总共有 numCourses 门课需要选，记为 0 到 numCourses - 1。给你一个数组 prerequisites ，其中 prerequisites[i] = [ai, bi] ，表示在选修课程 ai 前 必须 先选修 bi 。

  例如，想要学习课程 0 ，你需要先完成课程 1 ，我们用一个匹配来表示：[0,1] 。
  返回你为了学完所有课程所安排的学习顺序。可能会有多个正确的顺序，你只要返回 任意一种 就可以了。如果不可能完成所有课程，返回 一个空数组 。

  示例 1：
  输入：numCourses = 2, prerequisites = [[1,0]]
  输出：[0,1]
  解释：总共有 2 门课程。要学习课程 1，你需要先完成课程 0。因此，正确的课程顺序为 [0,1] 。

  示例 2：
  输入：numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
  输出：[0,2,1,3]
  解释：总共有 4 门课程。要学习课程 3，你应该先完成课程 1 和课程 2。并且课程 1 和课程 2 都应该排在课程 0 之后。
  因此，一个正确的课程顺序是 [0,1,2,3] 。另一个正确的排序是 [0,2,1,3] 。

  示例 3：
  输入：numCourses = 1, prerequisites = []
  输出：[0]
   
  提示：
    1 <= numCourses <= 2000
    0 <= prerequisites.length <= numCourses * (numCourses - 1)
    prerequisites[i].length == 2
    0 <= ai, bi < numCourses
    ai != bi
    所有[ai, bi] 互不相同

*/

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 * 
 * 和207题思路一样，只不过在出队列得时候加个出队记录
 * 
 */
var findOrder = function (numCourses, prerequisites) {
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

  const result = new Array(numCourses); // 课程出队列记录

  let count = 0; // 已修课程
  while (quene.length) {
    const selected = quene.shift(); // 获取已选择的课程
    result[count] = selected; // 已选择课程记录
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

  if (count === numCourses) {
    return result;
  }

  return [];
};

function main() {
  console.log(findOrder(2, [[1, 0]]));
  console.log(
    findOrder(4, [
      [1, 0],
      [2, 0],
      [3, 1],
      [3, 2],
    ])
  );
  console.log(findOrder(1, []));
}

main();

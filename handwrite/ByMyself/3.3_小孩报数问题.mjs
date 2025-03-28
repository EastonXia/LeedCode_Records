/**
 * 有30个小孩儿，编号从1-30，围成一圈依此报数，1、2、3 数到 3 的小孩儿退出这个圈，
 * 然后下一个小孩 重新报数 1、2、3，问最后剩下的那个小孩儿的编号是多少?
 *
 */

// 该函数拓展到num个小孩，数到count个的小孩退出
const childNum = function (num, count) {
  // 初始化数组记录小孩的编号，如果小孩退出，则编号为0
  const allPlayer = [];
  for (let i = 0; i < num; i++) {
    allPlayer[i] = i + 1;
  }

  let exitCount = 0; // 离开人数
  let counter = 0;   // 记录报数
  let curIndex = 0;  // 当前数组下标

  while (exitCount < num - 1) {
    if (allPlayer[curIndex] !== 0) counter += 1; // 不为0则没退出，报数

    // 报数达到数量，则该小孩出队，离开人数 +1 ，重置记录报数
    if (counter === count) {
      allPlayer[curIndex] = 0;
      counter = 0;
      exitCount += 1;
    }

    curIndex += 1; // 数组下标必 +1 

    // 如果报数到了最后一个小孩的下一个小孩，则重置为0，模拟围成一个圈
    if (curIndex === num) curIndex = 0; 
  }

  // 获得剩下的小孩的编号
  for (let i = 0; i < num; i++) {
    if (allPlayer[i] !== 0) return allPlayer[i];
  }
};

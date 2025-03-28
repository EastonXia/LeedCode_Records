/**
 * 实现版本号排序方法
 *
 * 有一组版本号如下['0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']。
 * 现在需要对其进行排序，排序的结果为 ['4.3.5','4.3.4.5', '4.2', '2.3.3','0.302.1','0.1.1']
 *
 */

const patchSort = function (nums) {
  return nums.sort((a, b) => {
    const arr1 = a.split('.');
    const arr2 = b.split('.');

    let i = 0;
    while (true) {
      const s1 = arr1[i];
      const s2 = arr2[i];
      i += 1;

      if (s1 === undefined || s2 === undefined) {
        return arr2.length - arr1.length;
      }

      if (s1 === s2) continue;

      return s2 - s1;
    }
  });
};

/**
 * 主要的实现思路就是：
 *  - 取出数组的第一个元素，随机产生一个索引值，将该第一个元素和这个索引对应的元素进行交换。
 *  - 第二次取出数据数组第二个元素，随机产生一个除了索引为1的之外的索引值，并将第二个元素与该索引值对应的元素进行交换
 *  - 按照上面的规律执行，直到遍历完成
 *
 */

const shuffleArray = function (arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]];
  }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console(shuffleArray(arr));

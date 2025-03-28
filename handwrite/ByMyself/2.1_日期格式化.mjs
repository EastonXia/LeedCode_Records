/**
 * 实现日期格式化函数
 *
 */

const dateFormat = function (dateInput, format) {
  // 分别获取年月日
  const year = dateInput.getFullYear();
  const month = dateInput.getMonth() + 1;
  const day = dateInput.getDate();

  // 分别格式化
  format = format.replace(/yyyy/, year);
  format = format.replace(/MM/, month);
  format = format.replace(/dd/, day);

  return format;
};

dateFormat(new Date('2020-12-01'), 'yyyy/MM/dd'); // 2020/12/01
dateFormat(new Date('2020-04-01'), 'yyyy/MM/dd'); // 2020/04/01
dateFormat(new Date('2020-04-01'), 'yyyy年MM月dd日'); // 2020年04月01日

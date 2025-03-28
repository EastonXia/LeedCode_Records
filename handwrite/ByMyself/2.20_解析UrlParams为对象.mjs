/**
 * 解析 URL Params 为对象
 *
 */

const parseParam = function (url) {
  const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
  const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中

  const paramsObj = {};

  paramsArr.forEach((param) => {
    if (/=/.test(param)) { // 处理有 value 的参数
      let [key, val] = param.split('=');

      val = decodeURIComponent(val);
      val = /^\d+/.test(val) ? parseFloat(val) : val; // 判断是否转为数字

      // 如果对象有 key，则添加一个值
      if (paramsObj.hasOwnProperty(key)) {
        paramsObj[key] = [].concat(paramsObj[key], val); // concat会对传入的数组做一次扩展操作
      } else {
        paramsObj[key] = val;
      }
    } else {  
      paramsObj[param] = true;
    }
  });

  return paramsObj;
};

let url =
  'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';

parseParam(url);
/* 结果
 { user: 'anonymous',
   id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文需解码
   enabled: true, // 未指定值得 key 约定为 true
 }
 */

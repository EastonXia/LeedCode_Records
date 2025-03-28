const axios = (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(url);
    }, 1000);
  });
};

const mRequest = (urls, max) => {
  return new Promise((resolve) => {
    const result = [];
    let curIndex = 0;
    let doneCount = 0;

    function _request() {
      const url = urls[curIndex];
      if (!url) return;

      const reqIndex = curIndex;
      curIndex++;

      axios(url).then((res) => {
        console.log(reqIndex, res);
        result[reqIndex] = res;

        if (doneCount >= url.length) {
          resolve(result);
          return;
        }

        _request();
      });
    }

    for (let i = 0; i < Math.min(urls.length, max); i++) {
      _request();
    }
  });
};

const urls = [
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
  "www.baidu.com/xx/yy/zz",
];
mRequest(urls, 3).then((res) => {
  console.log(res);
});

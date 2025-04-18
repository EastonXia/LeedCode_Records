/**
  LeetCode93---复原 IP 地址

  有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。
  例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
  给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。
  你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。

  示例 1：
  输入：s = "25525511135"
  输出：["255.255.11.135","255.255.111.35"]

  示例 2：
  输入：s = "0000"
  输出：["0.0.0.0"]

  示例 3：
  输入：s = "101023"
  输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
   
  提示：
  1 <= s.length <= 20
  s 仅由数字组成

*/

/**
 * 边界条件太多了
 * 
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function(s) {
    const len = s.length;
    if(len < 4 || len > 12) return [];

    const res = [];

    // 复原从start开始的子串
    const dfs = (path, start) => {                 
      if (path.length === 4 && start === len) { // 片段满4段，且耗尽所有字符
        res.push(path.join('.'));                  // 拼成字符串，加入解集
        return;                     // 返不返回都行，指针已经到头了，严谨的说还是返回
      }

      if (path.length == 4 && start < len) {  // 满4段，字符未耗尽，不用往下选了
        return;
      }

      for (let i = 1; i <= 3; i++) {           // 枚举出选择，三种切割长度
        if (start + i - 1 >= len) return;     // 加上要切的长度就越界，不能切这个长度
        if (i != 1 && s[start] == '0') return;     // 不能切出'0x'、'0xx'
  
        const str = s.substring(start, start + i); // 当前选择切出的片段
        if (i == 3 && +str > 255) return;          // 不能超过255
  
        path.push(str);                            // 作出选择，将片段加入path
        dfs(path, start + i);                    // 基于当前选择，继续选择，注意更新指针
        path.pop(); // 上面一句的递归分支结束，撤销最后的选择，进入下一轮迭代，考察下一个切割长度
      }
    };
  
    dfs([], 0);       // dfs入口
    return res;
};


function main() {
  console.log(restoreIpAddresses('25525511135'));
  console.log(restoreIpAddresses('0000'));
  console.log(restoreIpAddresses('101023'));
}

main();

/**
 * 实现 b 函数，使得 b.then 中能打印出 cb 的参数值
 */

// 说明，这里要打印出 Math.random() 的值
const fn = (cb) => {
    setTimeout(() => {
        cb(Math.random());
    }, 1000);
}

// 实现 b 函数
const b = () => {
    return new Promise((resolve) => {
        fn(resolve);
    });
}

// 效果
b.then((res) => {
    console.log(res); //  Math.random() 的值
})


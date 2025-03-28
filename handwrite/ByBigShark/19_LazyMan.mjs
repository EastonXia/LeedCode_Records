/**
 * 实现LazyMan
 * 
 * 几个关键点：
 * 1、定义任务队列，方便添加任务到头部或尾部
 * 2、通过return this实现链式调用
 * 3、constructor时使用setTimeout保证等到链式调用完成再开始执行task中的任务
 * 4、每个任务都在最后执行next()，保证能够继续执行下一个任务
 *
 */

class _LazyMan {
  constructor(name) {
    this.tasks = [];
    const task = () => {
      console.log(`Hi! This is ${name}`);
      this.next();
    };

    this.tasks.push(task);
 
    // 放到宏任务中，等链式都调用完了再触发
    setTimeout(() => {
      this.next();
    }, 0);
  }

  // 执行一个任务
  next() {
    const task = this.tasks.shift();
    task && task();
  }

  _sleepWrapper(time, first) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wake up after ${time}`);
        this.next();
      }, time * 1000);
    };

    if (first) {
      this.tasks.unshift(task);
    } else {
      this.tasks.push(task);
    }
  }

  sleepFirst(time) {
    this._sleepWrapper(time, true);
    return this; // 链式调用，返回的是当前实例，与promise不同
  }

  sleep(time) {
    this._sleepWrapper(time, false);
    return this;
  }

  eat(name) {
    const task = () => {
      console.log(`Eat ${name}`);
      this.next();
    };

    this.tasks.push(task);

    return this;
  }
}

function LazyMan(name) {
  return new _LazyMan(name);
}

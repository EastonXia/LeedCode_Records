/**
 * 实现响应式数据 + 依赖收集
 *
 */

class Component{
  _data = { name: '' };
  pending = false; // 合并 render 执行

  constructor() {
    this.data = new Proxy(this._data, {
      set: (target, key, value) => {
        target[key] = value;

        if(!this.pending) {
          this.pending = true;
          Promise.resolve().then(() => {
            this.pending = false;
            this.render();
          })
        }

        return true;  // 添加返回值
      },
      get: (target, key) => {
        return target[key];
      }
    })
  }

  render() {
    console.log(`render - name: ${this._data.name}`)
  }
}

// 要求以下代码需要触发 render，且同步变更需要合并。
const com = new Component();
com.data.name = '1';
com.data.name = '2';
com.data.name = '3';
// 第一次触发 render

setTimeout(() => {
  com.data.name = '4'; 
}, 0)
// 第二次触发 render
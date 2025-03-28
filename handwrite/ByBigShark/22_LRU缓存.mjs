/**
 * 实现LRU缓存算法
 *
 */

class LRU {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const tempVal = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, tempVal);
      return tempVal;
    }

    return -1;
  }

  put(key, value) {
    if (this.cache.has(key)) { // key存在，仅修改值
      this.cache.delete(key);
      this.cache.set(key, value);
    } else if (this.cache.size < this.capacity) {  // key不存在，cache未满
      this.cache.set(key, value);
    } else { // 添加新key，删除旧key
      this.cache.set(key, value);
      this.cache.delete(this.cache.keys().next.value);
    }
  }
}

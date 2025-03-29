/**
 * 实现深拷贝（考虑到复制 Symbol 类型）
 *
 */

// 方案1
JSON.parse(JSON.stringify());

// 方案2
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  let copyObj;
  if (Array.isArray(obj)) {
    copyObj = [];
    for (let i = 0; i < obj.length; i++) {
      copyObj[i] = deepClone(obj[i]); 
    } 
  } else if(obj instanceof Set) {
    copyObj = new Set([...obj]);
  } else if(obj instanceof Map) {
    copyObj = new Map([...obj]); 
  } else {
    copyObj = {};
    Reflect.ownKeys(obj).forEach(key => {
      copyObj[key] = deepClone(obj[key]);
    })
  }

  return copyObj;
}

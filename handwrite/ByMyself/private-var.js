/**
 * 实现一个私有变量，用 get、set 可以访问，不能直接访问
 */

// 方法1：使用闭包，缺点：可能造成内存泄漏
function createCounter() {
    let privateVar = 0;  // 私有变量
    
    return {
        get: function() {
            return privateVar;
        },
        set: function(value) {
            privateVar = value;
        }
    };
}

// 方法2：使用Symbol，缺点：不是真正的私有，可以通过 Object.getOwnPropertySymbols() 获取
const privateVar = Symbol('privateVar');
class Example {
    constructor() {
        this[privateVar] = 0;
    }
    
    get value() {
        return this[privateVar];
    }
    
    set value(val) {
        this[privateVar] = val;
    }
}

// 方法3：使用WeakMap，缺点：稍微复杂一些，性能略差
const privateStore = new WeakMap();
class Example {
    constructor() {
        privateStore.set(this, {
            value: 0
        });
    }
    
    get value() {
        return privateStore.get(this).value;
    }
    
    set value(val) {
        privateStore.get(this).value = val;
    }
}

// 方法4：使用私有字段，是真正的私有，缺点：需要较新的 JavaScript 环境支持
class Example {
    #privateVar = 0;  // 私有字段
    
    get value() {
        return this.#privateVar;
    }
    
    set value(val) {
        this.#privateVar = val;
    }
}


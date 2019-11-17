console.log('------ 手写call方法 ------')

var a = 'window'
function test () {
    console.log('this指向：', this.a, [...arguments])
}

var obj = {
    a: 'obj'
}

// 手写call
Function.prototype.myCall = function (context, ...args) {
    let isObj = typeof context === 'object'
    context = isObj ? context : window
    let fn = Symbol('fn') // 创建个独一无二的方法名
    context[fn] = this // 方法变换执行对象
    let res = context[fn](...args)
    delete context[fn] // 删除对象属性
    return res
}

// 测试
test.myCall(this, 1, 2) // this指向： window (2) [1, 2]
test.myCall(obj, 1, 2) // this指向： obj (2) [1, 2]

test.call(this, 1, 2) // this指向： window (2) [1, 2]
test.call(obj, 1, 2) // this指向： obj (2) [1, 2]

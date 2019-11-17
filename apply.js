console.log('------ 手写apply方法 ------')

var a = 'window'
function test () {
    console.log('this指向：', this.a, [...arguments])
}

var obj = {
    a: 'obj'
}

// 手写apply
Function.prototype.myApply = function (context, args) {
    let fn = Symbol('fn') // 创建个独一无二的方法名
    context[fn] = this // 方法变换执行对象
    let res = context[fn](...args) 
    delete context[fn] // 删除对象属性
    return res
}

// 测试
test.myApply(this, [1,2]) // this指向： window (2) [1, 2]
test.myApply(obj, [1,2]) // this指向： obj (2) [1, 2]

test.apply(this, [1,2]) // this指向： window (2) [1, 2]
test.apply(obj, [1,2]) // this指向： obj (2) [1, 2]
console.log('------ 手写bind方法 ------')

var a = 'window'
function test () {
    console.log('this指向：', this.a, [...arguments])
}

var obj = {
    a: 'obj'
}

Function.prototype.myBind = function (context = window) {
    let _self = this
    let args = [...arguments].slice(1)
    return function fn () { // 返回一个绑定了this指向的方法，闭包
        _self.call(context, ...args.concat(...arguments))
    }
}

test.bind(obj, 0)(1, 2) // this指向： obj (3) [0, 1, 2]
test.myBind(obj, 0)(1, 2) // this指向： obj (3) [0, 1, 2]

/**
 * 1、已知 ES5 中 func.bind(context, 1, 2)(3, 4) 等价于 func.call(context, 1, 2, 3, 4)
 * 请用 ES3 实现一个 bind 的 polyfill
 */

// 兼容版本
Function.prototype.my_bind = function (context = window) {
    // var args = Array.from(arguments) // 类数组转数组(es6) console.log(args instanceof Array)
    var argumentsArr = Array.prototype.slice.call(arguments) // 类数组转数组
    var args = argumentsArr.slice(1) // 后面的参数
    var self = this // 调用的方法本身
    return function () {
        var newArgs = Array.prototype.slice.call(arguments) // 返回函数的arguments
        self.apply(context, args.concat(newArgs)) // 合并两args
    }
}

//  测试
var name2 = 'window name'
var obj2 = {
    name2: 'obj name',
}
var fn = function () {
    console.log(this.name2, [...arguments])
}

fn.my_bind(obj2)(2, 3)
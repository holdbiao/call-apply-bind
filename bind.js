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
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
    return function fn () { // 返回一个绑定了this指向的方法，闭包
        _self.call(context, ...arguments)
    }
}

test.bind(obj)(1, 2) // this指向： obj (2) [1, 2]
test.myBind(obj)(1, 2) // this指向： obj (2) [1, 2]
// 装饰者模式
function decker () {
  Function.prototype.before = function (beforefn) {
    var self = this // 保存原函数引用
    return function () { // 返回包含了原函数和新函数的 '代理函数'
      beforefn.apply(this, arguments) // 执行新函数，修正this
      return self.apply(this, arguments) // 执行原函数
    }
  }
  Function.prototype.after = function (afterfn) {
    var self = this
    return function () {
      var ret = self.apply(this, arguments)
      afterfn.apply(this, arguments)
      return ret
    }
  }
  var func = function () {
    console.log('2')
  }
  // func1和func3为挂载函数
  var func1 = function () {
    console.log('1')
  }
  var func3 = function () {
    console.log('3')
  }
  func = func.before(func1).after(func3)
  func()

  /* 作者：考拉海购前端团队
  链接：https://juejin.im/post/59df4f74f265da430f311909
  来源：掘金
  著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
}
decker()

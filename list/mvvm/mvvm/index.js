class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1. 创建观察者
      // new Observer(this.$data);
      // 2. 编译模版
      new Compiler(this.$el, this);
    }
  }
}

const compileUtil = {
  getValue(expr, vm) {
    // 处理 person.name 类似的对象 
    return expr.split('.').reduce((data, currentVal) => {
      return data[currentVal];
    }, vm.$data)
  },
  setVal(expr, vm, inputValue) {
    let exprs = expr.split('.'), len = expr.length;
    exprs.reduce((data, currentVal, idx) => {
      if (idx == len -1) {
        data[currentVal] = inputValue
      } else {
        return data[currentVal]
      }
    }, vm.$data)
  },
  text(node, expr, vm) {
    let value
    if (expr.indexOf('{{') != -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // text的 Watcher应在此绑定，因为是对插值{{}}进行双向绑定
        // Watcher的构造函数的 getOldVal()方法需要接受数据或者对象，而{{person.name}}不能接收
        console.log('121212')
        console.log(args)
        return this.getValue(args[1], vm);
      });
    } else {
      value = this.getValue(expr, vm)
    }
    this.updater.textUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm);
    // 
    // 视图 => 数据 => 视图
    node.addEventListener('input', (e) => {
      this.setVal(expr, vm, e.target.value)
    })
    this.updater.modelUpdater(node, value);
  },
  updater: {
    textUpdater(node, value) {
      node.textContent = value
    },
    modelUpdater(node, value) {
      node.value = value
    }
  }
}

class Compiler {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el)
    this.vm = vm
    // 预编的文档放入文档碎片中
    const fragments = this.node2fragments(this.el)
    this.compile(fragments)
    this.el.appendChild(fragments);
  }
  compile(fragments) {
    // 获取子节点
    const childNodes = fragments.childNodes;
    // 递归循环编译
    [...childNodes].forEach(child => {
      if (this.isElementNode(child)) {
        // 如果是元素节点
        this.compileElement(child);
      } else {
        // 文本节点
        this.compileText(child);
      }
      if(child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
  compileElement(node) {
    // 解析dom元素
    console.log('编译HTML')
    let attributes = node.attributes;
    // 对于每个属性 进行遍历
    [...attributes].forEach(attr => {
      let { name, value } = attr; // v-text="text"  type="text"
      if (this.isDirector(name)) { // v-html v-model v-on:click v-bind:href=''
        let [, directive] = name.split('-');
        let [compileKey, detailStr] = directive.split(':');
        // 更新数据 数据驱动视图
        compileUtil[compileKey](node, value, this.vm, detailStr)
      }
    })
  }
  isDirector(attrName) {
    // 判断是否为vue指令标签
    return attrName.startsWith('v-')
  }
  compileText(node) {
    // 解析text
    // 解析文本中的 {{person.name}}
    const content = node.textContent;
    const reg = /\{\{.+?\}\}/;
    if (reg.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }
  node2fragments(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment()
    let firstChild
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild)
    }
    return f
  }
  isElementNode(node) {
    // 元素节点的nodeType属性为 1
    return node.nodeType === 1;
  }
}

class Observer {
  constructor(data) {
    this.observe(data)
  }
  // data 是一个对象  可能嵌套对象 需要递归处理
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }
  }
  // 通过 Object.defineProperty 对数据进行劫持
  defineReactive(obj, key, value) {
    this.observe(value);
    Object.defineProperties(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        return value;
      },
      set(newVal) {
        if (value === newVal) return;
        value = newVal;
      }
    })
  }
}

class Watcher {
  constructor(expr, vm, cb) {

  }
}

// Dep类存储watch对象
class Dep {
  constructor() {

  }
}
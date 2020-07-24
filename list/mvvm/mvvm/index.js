class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 1. 创建观察者
      new Observer(this.$data);
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
    let exprs = expr.split('.'), len = exprs.length;
    exprs.reduce((data, currentVal, idx) => {
      if (idx == len -1) {
        data[currentVal] = inputValue;
      } else {
        return data[currentVal];
      }
    }, vm.$data)
  },
  getContent(expr, vm) {
    // {{person.name}}--{{person.age}}
    // 防止修改person.name使得所有值全部被替换
    return expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
      return this.getValue(args[1], vm);
    });
  },
  text(node, expr, vm) {
    let value;
    if (expr.indexOf('{{') != -1) {
      value = expr.replace(/\{\{(.+?)\}\}/g, (...args) => {
        // text的 Watcher应在此绑定，因为是对插值{{}}进行双向绑定
        // Watcher的构造函数的 getOldVal()方法需要接受数据或者对象，而{{person.name}}不能接收
        console.log('121212')
        console.log(node)
        console.log(args)
        new Watcher(args[1], vm, () => {
          this.updater.textUpdater(node, this.getContent(expr, vm));
        });
        return this.getValue(args[1], vm);
      });
      console.log(value)
    } else {
      value = this.getValue(expr, vm)
    }
    this.updater.textUpdater(node, value);
  },
  model(node, expr, vm) {
    const value = this.getValue(expr, vm);
    // v-model 绑定对应的 watcher 数据驱动视图
    new Watcher(expr, vm, (newVal) => {
      this.updater.modelUpdater(node, newVal);
    })
    // 视图 => 数据 => 视图
    node.addEventListener('input', (e) => {
      console.log('v-model 数据变化了：' + e.target.value);
      console.log(this)
      this.setVal(expr, vm, e.target.value);
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
    this.vm = vm;
    // 预编的文档放入文档碎片中
    const fragments = this.node2fragments(this.el);
    this.compile(fragments);
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
    console.log(node)
    let attributes = node.attributes;
    // 对于每个属性 进行遍历
    [...attributes].forEach(attr => {
      let { name, value } = attr; // v-text="text"  type="text"
      if (this.isDirector(name)) { // v-html v-model v-on:click v-bind:href=''
        let [, directive] = name.split('-');
        let [compileKey, detailStr] = directive.split(':');
        // 更新数据 数据驱动视图
        compileUtil[compileKey](node, value, this.vm, detailStr);
        // 删除有指令的标签属性 v-text v-html等，普通的value等原生html标签不必删除
        node.removeAttribute('v-' + directive);
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
    console.log('文本节点数据：');
    console.log(node)
    console.log(node.textContent)
    const content = node.textContent;
    const reg = /\{\{.+?\}\}/;
    if (reg.test(content)) {
      compileUtil['text'](node, content, this.vm);
    }
  }
  node2fragments(el) {
    // 创建文档碎片
    const f = document.createDocumentFragment();
    let firstChild;
    while (firstChild = el.firstChild) {
      f.appendChild(firstChild);
    }
    return f
  }
  isElementNode(node) {
    // 元素节点的nodeType属性为 1
    return node.nodeType === 1;
  }
}
// 观察者
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
    // 递归
    this.observe(value);
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: false,
      get() {
        console.log('获取值：' + value)
        console.log(value)
        // 订阅数据变化，汪dep中添加观察者
        Dep.target && dep.addWatcher(Dep.target);
        return value;
      },
      set: (newVal) => {
        console.log('设置了新值：' + newVal)
        if (value === newVal) return;
        this.observe(newVal);
        value = newVal;
        // 通知watcher 数据发生了变化
        dep.notify();
      }
    })
  }
}

class Watcher {
  constructor(expr, vm, cb) {
    // 通过回调函数实现更新的数据通知到视图
    this.expr = expr;
    this.vm = vm;
    this.cb = cb;
    this.oldVal = this.getOldVal();
  }
  // 获取旧数据
  getOldVal() {
    console.log('获取了旧数据')
    // 再利用getValue获取数据调用getter()方法时先把当前观察者挂载
    Dep.target = this;
    const oldVal = compileUtil.getValue(this.expr, this.vm);
    // 挂载完毕之后需要注销  防止重复挂载 (数据一更新就会挂载)
    Dep.target = null;
    return oldVal;
  }
  // 通过回调函数更新数据
  update() {
    const newVal = compileUtil.getValue(this.expr, this.vm);
    if (newVal !== this.oldVal) {
      this.cb(newVal)
    }
  }
}

// Dep类存储watch对象 并在数据变化时通知watcher
class Dep {
  constructor() {
    this.watcherCollector = [];
  }
  // 添加watcher
  addWatcher(watcher) {
    console.log('添加watch')
    console.log(watcher)
    this.watcherCollector.push(watcher);
  }
  // 数据变化时通知watcher更新
  notify() {
    console.log('通知数据变化了');
    this.watcherCollector.forEach(w => w.update());
  }
}
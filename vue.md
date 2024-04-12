# v-model

## vue2

1. vue 在初始化的时候会对 data 中所有已经定义的对象及其子属性进行遍历，使用 Object.defineProperty 统一给他们添加 getter 和 setter，
   使得他们变成响应式的，但是 vue 不能检测对象属性的添加或删除
2. 当输入框监听到 input 事件的时候，会对 info 中的 message 进行 Vue.set()操作，从而变成响应式数据

```vue
<template>
  <div>
    <div class="message">{{ info.message }}</div>
    <div><input v-model="info.message" type="text" /></div>
    <button @click="change">click</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    change() {
      this.info.message = "hello world";
    },
  },
};
</script>
```

3.  最终渲染出来的标签

```html
<input
  v-bind:value="info.message"
  v-on:input="info.message=$event.target.value"
/>
```

4.  简易 vue 模型

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <div id="container"></div>

  <div id="app">
    <input v-model="message" />
    <p>{{ message }}</p>
  </div>

  <body>
    <script>
      class Watcher {
        constructor(vm, key, updateCallback) {
          this.vm = vm; // Vue 实例
          this.key = key; // 属性名
          this.updateCallback = updateCallback; // 更新回调函数
          Dep.target = this; // 将该Watcher实例添加到 Dep 的订阅列表中
          this.vm[this.key]; // 通过访问 key 来触发依赖收集
          Dep.target = null; // 重置 Dep 的目标为 null
        }
        update() {
          const value = this.vm[this.key]; // 获取属性的最新值
          this.updateCallback(value); // 调用更新回调函数，更新视图
        }
      }

      class Dep {
        constructor() {
          this.subscribers = []; // 订阅者列表(绑定vm属性的DOM节点)
        }
        depend() {
          if (Dep.target && !this.subscribers.includes(Dep.target)) {
            this.subscribers.push(Dep.target); // 将当前Watcher实例添加到订阅者列表中
          }
          console.log(Dep.target, this.subscribers);
        }
        notify() {
          for (const subscriber of this.subscribers) {
            subscriber.update(); // 通知订阅者执行更新操作
          }
        }
      }

      function observe($data) {
        if (!$data || typeof $data !== "object") {
          // 数组暂时不考虑，因为数组是通过重写数组方法来实现双向数据绑定的
          return;
        }
        Object.keys($data).forEach((key) => {
          let value = $data[key];
          observe(value); // 递归观察子属性
          const dep = new Dep(); // 创建依赖对象
          // new Vue 的时候data中的属性赋值给了$data,只会数据劫持初始化的属性。后续新增的属性只能通过重新赋值或者$set再添加数据劫持
          Object.defineProperty($data, key, {
            // 给$data中的所有属性添加get和set
            enumerable: true,
            configurable: true,
            get() {
              console.log("observe——get-----");
              dep.depend(); // 依赖收集，在当前闭包中添加Watcher实例到订阅者列表中
              return value; // 返回属性值
            },
            set(newValue) {
              if (value !== newValue) {
                console.log("observe——set-----");
                value = newValue; // 更新 vm.$data 的属性值
                dep.notify(); // 通知依赖 Watcher实例执行更新操作
              }
            },
          });
        });
      }

      function proxy($data, vm) {
        Object.keys($data).forEach((key) => {
          // 将$data上所有的属性代理到vm上
          Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get() {
              console.log("proxy——get---"); // 通过代理，实现对 $data 中属性的读取
              return $data[key];
            },
            set(newValue) {
              console.log("proxy——set---");
              $data[key] = newValue; // 通过代理，实现对 $data 中属性的修改
            },
          });
        });
      }

      function compile(el, vm) {
        const root = document.querySelector(el); // 获取根元素 root  -->  app
        compileNode(root); // 编译根元素及其子元素

        function compileNode(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            compileText(node); // 编译文本节点
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            compileElement(node); // 编译元素节点
          }
        }

        function compileText(node) {
          const text = node.textContent; // 获取文本节点的内容
          const reg = /\{\{(.*)\}\}/; // 正则表达式，匹配双花括号内的内容
          if (reg.test(text)) {
            const key = RegExp.$1.trim(); // 提取属性名
            node.textContent = vm[key]; // 将节点的文本内容设置为属性的值

            new Watcher(vm, key, (value) => {
              node.textContent = value; // 创建Watcher实例，绑定更新回调函数，实现响应式更新
            });
          }
        }

        function compileElement(node) {
          const attrs = node.attributes; // 获取元素节点的属性列表
          for (let attr of attrs) {
            const attrName = attr.name; // 属性名
            if (attrName.startsWith("v-")) {
              const directive = attrName.substring(2); // 提取指令名称
              // attr -->  v-model="message"
              const key = attr.value; // 提取指令绑定的属性名 key  --> message
              if (directive === "model") {
                node.value = vm[key]; // 将节点的值设置为vm.属性的值
                node.addEventListener("input", (event) => {
                  vm[key] = event.target.value; // 监听输入事件，更新vm.属性的值
                });
                new Watcher(vm, key, (value) => {
                  node.value = value; // 创建Watcher实例，绑定更新回调函数，实现响应式更新
                });
              }
            }
          }

          if (node.childNodes && node.childNodes.length > 0) {
            // 递归编译元素节点的子节点
            node.childNodes.forEach(compileNode);
          }
        }
      }

      class Vue {
        constructor(options) {
          this.$data = options.data;
          this.$options = options;
          // 数据劫持
          observe(this.$data);
          // 属性代理
          proxy(this.$data, this);
          // 模板编译
          compile(options.el, this);
        }
      }

      const vm = new Vue({
        el: "#app",
        data: {
          message: "Hello Vue!",
        },
      });
    </script>
  </body>
</html>
```

递归深层对象

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <div id="container"></div>

  <div id="app">
    <input v-model="obj.message" />
    <p>{{ obj.message }}</p>
  </div>

  <body>
    <script>
      class Watcher {
        constructor(vm, key, updateCallback) {
          this.vm = vm; // Vue 实例
          this.key = key; // 属性名
          this.updateCallback = updateCallback; // 更新回调函数
          Dep.target = this; // 将该Watcher实例添加到 Dep 的订阅列表中
          // this.vm[this.key]; // 通过访问 key 来触发依赖收集
          key.split(".").reduce((newobj, k) => newobj[k], vm); // 通过访问 key 来触发依赖收集
          Dep.target = null; // 重置 Dep 的目标为 null
        }
        update() {
          const value = this.key
            .split(".")
            .reduce((newobj, k) => newobj[k], this.vm); // 获取属性的最新值
          this.updateCallback(value); // 调用更新回调函数，更新视图
        }
      }

      class Dep {
        constructor() {
          this.subscribers = []; // 订阅者列表(绑定vm属性的DOM节点)
        }
        depend() {
          if (Dep.target && !this.subscribers.includes(Dep.target)) {
            // console.log(Dep.target, this.subscribers);
            this.subscribers.push(Dep.target); // 将当前Watcher实例添加到订阅者列表中
          }
        }
        notify() {
          for (const subscriber of this.subscribers) {
            subscriber.update(); // 通知订阅者执行更新操作
          }
        }
      }

      function observe($data) {
        if (!$data || typeof $data !== "object") {
          // 数组暂时不考虑，因为数组是通过重写数组方法来实现双向数据绑定的
          return;
        }
        Object.keys($data).forEach((key) => {
          let value = $data[key];
          observe(value); // 递归观察子属性
          const dep = new Dep(); // 创建依赖对象
          // new Vue 的时候data中的属性赋值给了$data,只会数据劫持初始化的属性。后续新增的属性只能通过重新赋值或者$set再添加数据劫持
          Object.defineProperty($data, key, {
            // 给$data中的所有属性添加get和set
            enumerable: true,
            configurable: true,
            get() {
              // console.log("observe——get-----");
              dep.depend(); // 依赖收集，在当前闭包中添加Watcher实例到订阅者列表中
              return value; // 返回属性值
            },
            set(newValue) {
              if (value !== newValue) {
                // console.log("observe——set-----");
                value = newValue; // 更新 vm.$data 的属性值
                dep.notify(); // 通知依赖 Watcher实例执行更新操作
              }
            },
          });
        });
      }

      function proxy($data, vm) {
        Object.keys($data).forEach((key) => {
          // 将$data上所有的属性代理到vm上
          Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get() {
              // console.log("proxy——get---"); // 通过代理，实现对 $data 中属性的读取
              return $data[key];
            },
            set(newValue) {
              // console.log("proxy——set---");
              $data[key] = newValue; // 通过代理，实现对 $data 中属性的修改
            },
          });
        });
      }

      function compile(el, vm) {
        const root = document.querySelector(el); // 获取根元素 root  -->  app
        compileNode(root); // 编译根元素及其子元素

        function compileNode(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            compileText(node); // 编译文本节点
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            compileElement(node); // 编译元素节点
          }
        }

        function compileText(node) {
          const text = node.textContent; // 获取文本节点的内容
          const reg = /\{\{(.*)\}\}/; // 正则表达式，匹配双花括号内的内容
          if (reg.test(text)) {
            const key = RegExp.$1.trim(); // 提取属性名
            // node.textContent = vm[key]; // 将节点的文本内容设置为属性的值
            const value = key.split(".").reduce((newobj, k) => newobj[k], vm);
            node.textContent = value;
            console.log(key);
            new Watcher(vm, key, (value) => {
              node.textContent = value; // 创建Watcher实例，绑定更新回调函数，实现响应式更新
            });
          }
        }

        function compileElement(node) {
          const attrs = node.attributes; // 获取元素节点的属性列表
          for (let attr of attrs) {
            const attrName = attr.name; // 属性名
            if (attrName.startsWith("v-")) {
              const directive = attrName.substring(2); // 提取指令名称
              // attr -->  v-model="message"
              const key = attr.value; // 提取指令绑定的属性名 key  --> message
              if (directive === "model") {
                // node.value = vm[key]; // 将节点的值设置为vm.属性的值
                const value = key
                  .split(".")
                  .reduce((newobj, k) => newobj[k], vm);
                node.value = value;
                node.addEventListener("input", (event) => {
                  // vm[key] = event.target.value; // 监听输入事件，更新vm.属性的值
                  const keys = key.split(".");
                  const keysLen = keys.length;
                  const obj = keys
                    .slice(0, keysLen - 1)
                    .reduce((newobj, k) => newobj[k], vm);
                  obj[keys[keysLen - 1]] = event.target.value;
                });
                console.log(key);
                new Watcher(vm, key, (value) => {
                  node.value = value; // 创建Watcher实例，绑定更新回调函数，实现响应式更新
                });
              }
            }
          }
          if (node.childNodes && node.childNodes.length > 0) {
            // 递归编译元素节点的子节点
            node.childNodes.forEach(compileNode);
          }
        }
      }

      class Vue {
        constructor(options) {
          this.$data = options.data;
          this.$options = options;
          // 数据劫持
          observe(this.$data);
          // 属性代理
          proxy(this.$data, this);
          // 模板编译
          compile(options.el, this);
        }
      }

      const vm = new Vue({
        el: "#app",
        data: {
          obj: {
            message: "Hello Vue!",
          },
        },
      });
    </script>
  </body>
</html>
```

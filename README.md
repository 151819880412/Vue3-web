# vue3 + Typescript

## docker + nginx 部署
  ```
    https://blog.csdn.net/u010784529/article/details/125007848
    docker run --name nginx -d -p 80:80 -v D:\Docker\nginx\nginx.conf:/etc/nginx/nginx.conf -v D:\Docker\nginx\conf.d:/etc/nginx/conf.d -v D:\Docker\nginx\html:/usr/share/nginx/html -v D:\Docker\nginx\cert:/etc/nginx/cert -v D:\Docker\nginx\logs:/var/log/nginx -e LANG=C.UTF-8 -e LC_ALL=C.UTF-8 --privileged=true --restart=always nginx
  ```

## Xshell连接VMware虚拟机（CentOs7）
    http://www.omica.com.cn/news/show-34468.html

## Linux安装Docker完整教程
    https://blog.csdn.net/m0_59196543/article/details/124749175

## centos7下使用docker安装nginx
    http://t.zoukankan.com/007sx-p-9964145.html

## centos7部署sentry
    https://juejin.cn/post/6844904144566910983#heading-3

## 项目结构
  + ### shims-vue.d.vue
    + TS不能识别vue文件。需要靠shims-vue.d.vue的支持
  + ### tsconfig.json
    + TS的配置文件

## 和Vue2相比的差异
  1. vue2对对象的响应式：通过Object.definePropety进行监视
  2. vue2数组重写方法进行监视
  3. vue2不能监视对象新增或删除的属性
  4. vue2通过修改数组下标和数组长度是不能监视的
  5. vue2通过$set手动把数据变为响应式
  6. vue3通过Proxy代理对象来实现数据响应式

## 与2.×版本生命周期相对应的组合式APl
  ```
    beforeCreate    ->  使用setup()
    created         ->  使用setup()
    beforeMount     ->  onBeforeMount 
    mounted         ->  onMounted
    beforeUpdate    ->  onBeforeUpdate
    updated         ->  onUpdated
    beforeDestroy   ->  onBeforeUnmount
    destroyted      ->  onUnmounted
    activated       ->  onActivated
    deactivated     ->  onDeactivated
    errorCaptured   ->  onErrorCaptured
  ```
## Vue3的新语法
  + ### watch
    ```
      watch(obj,(newValue,oldValue)=>{})
      watch([obj,()=>obj2.number],(newValue,oldValue)=>{})
      // immediate 默认会执行一次  deep 深度监视
      watch(obj.({a,b,c})=>{},{immediate:true,deep:true})   
      watchEffect(()=>{})   // 默认执行一次
    ```
  + ### 自定义hook函数
    ```
      import { ref,onMounted,onUnmounted }from 'vue'
        function useMousePosition(){
        const x = ref(0)
        const y = ref(0)
        const updateMouse = (e: MouseEvent) =>{
          x.value = e.pagex
          y.value = e. pageY
        }
        onMounted(()=>{
          document.addEventListener( 'click', updateMouse)
        })
        onUnmounted(()=>{
          document.removeEventListener( 'click' , updateMouse)
        })
        return {x, y}
      }
      export default useMousePosition
      // 其他模块使用
      import useMousePosition from 
      const {x,y}  = useMousePosition()
      return{
        x,
        y,
      }
    ```


# 1.vue3 中可以没有根标签
# 2.defineComponent 函数，目的是定义一个组件，内部可以传入一个配置对象
# 3.setup
    新的option, 所有的组合API函数都在此使用, 只在初始化时执行一次
    函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用
# 4.ref 函数，定义一个响应式数据，使用时需要访问 .value
    作用: 定义一个数据的响应式
    语法: const xxx = ref(initValue):
    创建一个包含响应式数据的引用(reference)对象
    js中操作数据: xxx.value
    模板中操作数据: 不需要.value
    一般用来定义一个基本类型的响应式数据
# 5.reactive 函数
    作用: 定义多个数据的响应式
    const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
    响应式转换是“深层的”：会影响对象内部所有嵌套的属性
    内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的
# 6.比较Vue2与Vue3的响应式(重要)
  ## vue2的响应式
    对象: 通过defineProperty对对象的已有属性值的读取和修改进行劫持(监视/拦截)。对象直接新添加的属性或删除已有属性, 界面不会自动更新
    数组: 通过重写数组更新数组一系列更新元素的方法来实现元素修改的劫持。直接通过下标替换元素或更新length, 界面不会自动更新 arr[1] = {}
  ## Vue3的响应式
    通过Proxy(代理): 拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...
    通过Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
    ```
    const user = {
      name: "John",
      age: 12
    };

    /* 
    proxyUser是代理对象, user是被代理对象
    后面所有的操作都是通过代理对象来操作被代理对象内部属性
    */
    const proxyUser = new Proxy(user, {
      // 获取对象的某个属性
      get(target, prop) {
        console.log('劫持get()', prop)
        return Reflect.get(target, prop)
      },
      // 修改目标对象的属性值/为目标对象添加新的属性
      set(target, prop, val) {
        console.log('劫持set()', prop, val)
        return Reflect.set(target, prop, val); // (2)
      },
      // 删除目标对象上的某个属性
      deleteProperty (target, prop) {
        console.log('劫持delete属性', prop)
        return Reflect.deleteProperty(target, prop)
      }
    });
    // 读取属性值
    console.log(proxyUser===user)
    console.log(proxyUser.name, proxyUser.age)
    // 设置属性值
    proxyUser.name = 'bob'
    proxyUser.age = 13
    console.log(user)
    // 添加属性
    proxyUser.sex = '男'
    console.log(user)
    // 删除属性
    delete proxyUser.sex
    console.log(user)
    ```
# 7.setup细节
 ## setup执行的时机
    在beforeCreate之前执行(一次), 此时组件对象还没有创建
    this是undefined, 不能通过this来访问data/computed/methods / props
    其实所有的composition API相关回调函数中也都不可以
  ## setup的返回值
    一般都返回一个对象: 为模板提供数据, 也就是模板中可以直接使用此对象中的所有属性/方法
    返回对象中的属性会与data函数返回对象的属性合并成为组件对象的属性
    返回对象中的方法会与methods中的方法合并成功组件对象的方法
    如果有重名, setup优先
    注意:
    一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
    setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据
  ## setup的参数
    setup(props, context) / setup(props, {attrs, slots, emit})
    props: 包含props配置声明且传入了的所有属性的对象
    attrs: 包含没有在props配置中声明的属性的对象, 相当于 this.$attrs
    slots: 包含所有传入的插槽内容的对象, 相当于 this.$slots
    emit: 用来分发自定义事件的函数, 相当于 this.$emit
    context：里面有 attrs 对象(获取当前组件标签上的属性，但是该属性是在props中没有声明接收的所有参数)
# 8.reactive与ref-细节
    是Vue3的 composition API中2个最重要的响应式API
    ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
    如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
    ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
    reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
    ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)
# 9.计算属性与监视
  ## computed函数:
    与computed配置功能一致
    只有getter
      ```
      // 只有getter的计算属性
      const fullName1 = computed(() => {
        console.log('fullName1')
        return user.firstName + '-' + user.lastName
      })
      ```
    有getter和setter
    ```
    // 有getter与setter的计算属性
    const fullName2 = computed({
      get () {
        console.log('fullName2 get')
        return user.firstName + '-' + user.lastName
      },
      set (value: string) {
        console.log('fullName2 set')
        const names = value.split('-')
        user.firstName = names[0]
        user.lastName = names[1]
      }
    })
    ```
  ## watch函数
    与watch配置功能一致
    监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调
    默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次
    通过配置deep为true, 来指定深度监视
    ```
    watch(user, () => {
      fullName3.value = user.firstName + '-' + user.lastName
    }, {
      immediate: true,  // 是否初始化立即执行一次, 默认是false
      deep: true, // 是否是深度监视, 默认是false
    })
    /* 
    watch多个数据: 
      使用数组来指定
      如果是ref对象, 直接指定
      如果是reactive对象中的属性,  必须通过函数来指定
    */
    watch([() => user.firstName, () => user.lastName, fullName3], (values) => {
      console.log('监视多个数据', values)
    })
    ```
  ## watchEffect函数
    不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
    默认初始时就会执行第一次, 从而可以收集需要监视的数据
    监视数据发生变化时回调
    ```
     watchEffect(() => {
      console.log('watchEffect')
      fullName3.value = user.firstName + '-' + user.lastName
    }) 
    ```
# 10.生命周期
  ## 与 2.x 版本生命周期相对应的组合式 API
    beforeCreate -> 使用 setup()
    created -> 使用 setup()
    beforeMount -> onBeforeMount
    mounted -> onMounted
    beforeUpdate -> onBeforeUpdate
    updated -> onUpdated
    beforeDestroy -> onBeforeUnmount
    destroyed -> onUnmounted
    errorCaptured -> onErrorCaptured
  ## 新增的钩子函数:组合式 API 还提供了以下调试钩子函数
    onRenderTracked
    onRenderTriggered
    两个钩子函数都接收一个 DebuggerEvent 与 watchEffect 参数选项中的 onTrack 和 onTrigger 类似
# 11.自定义hook函数
    使用Vue3的组合API封装的可复用的功能函数
    自定义hook的作用类似于vue2中的mixin技术
    自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂
# 12. toRefs
    把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
    应用: 当从合成函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应式的情况下对返回的对象进行分解使用
          reactive 包裹的对象使用 toRefs 可以直接转为每个 property 都是一个 ref 的对象。...toRefs(xxx), 可以在html中直接访问属性
    问题: reactive 对象取出的所有属性值都是非响应式的
    解决: 利用 toRefs 可以将一个响应式 reactive 对象的所有原始属性转换为响应式的 ref 属性
# 13.ref获取元素
    利用ref函数获取组件中的标签元素
# 14.shallowReactive 与 shallowRef
    shallowReactive : 只处理了对象内最外层属性的响应式(也就是浅响应式)
    shallowRef: 只处理了value的响应式, 不进行对象的reactive处理
    什么时候用浅响应式呢?
    一般情况下使用ref和reactive即可
    如果有一个对象数据, 结构比较深, 但变化时只是外层属性变化 ===> shallowReactive
    如果有一个对象数据, 后面会产生新的对象来替换 ===> shallowRef
# 15.readonly 与 shallowReadonly
    readonly:
    深度只读数据
    获取一个对象 (响应式或纯对象) 或 ref 并返回原始代理的只读代理。
    只读代理是深层的：访问的任何嵌套 property 也是只读的。
    shallowReadonly
    浅只读数据
    创建一个代理，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换
    应用场景:
    在某些特定情况下, 我们可能不希望对数据进行更新的操作, 那就可以包装生成一个只读代理对象来读取数据, 而不能修改或删除
# 16.toRaw 与 markRaw
    toRaw
    返回由 reactive 或 readonly 方法转换成响应式代理的普通对象。
    这是一个还原方法，可用于临时读取，访问不会被代理/跟踪，写入时也不会触发界面更新。
    markRaw
    标记一个对象，使其永远不会转换为代理。返回对象本身
    应用场景:
    有些值不应被设置为响应式的，例如复杂的第三方类实例或 Vue 组件对象。
    当渲染具有不可变数据源的大列表时，跳过代理转换可以提高性能。
# 17. toRef
    为源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
    区别ref: 拷贝了一份新的数据值单独操作, 更新时相互不影响
    应用: 当要将 某个prop 的 ref 传递给复合函数时，toRef 很有用
    作用:创建一个ref对象，其value值指向另一个对象中的某个属性。   let a = toRef(xxx,'xxx')
    语法:const name :toRef(person,，name')
    应用:要将响应式对象中的某 个属性单独提供给外部使用时。
    扩展: toRefs |与toRef 功能一致，但可以批量创建多 个ref对象，语法: toRefs (person)
# 18.customRef
    创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制
    ```
    /* 
    实现函数防抖的自定义ref
    */
    function useDebouncedRef<T>(value: T, delay = 200) {
      let timeout: number
      return customRef((track, trigger) => {
        return {
          get() {
            // 告诉Vue追踪数据
            track()
            return value
          },
          set(newValue: T) {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
              value = newValue
              // 告诉Vue去触发界面更新
              trigger()
            }, delay)
          }
        }
      })
    }
    ```
# 19.provide 与 inject
    provide和inject提供依赖注入，功能类似 2.x 的provide/inject
    实现跨层级组件(祖孙)间通信
# 20.响应式数据的判断
    isRef: 检查一个值是否为一个 ref 对象
    isReactive: 检查一个对象是否是由 reactive 创建的响应式代理
    isReadonly: 检查一个对象是否是由 readonly 创建的只读代理
    isProxy: 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
# 21.手写 shallowReactive 和 reactive
    // 定义一个 reactiveHandler 处理对象
    const reactiveHandler = {
      // 获取属性值
      get(target,prop){
        const result = Reflect.get(target,prop)
        consol.log('拦截到读取数据')
        return result
      }
      // 修改属性值或者是添加属性值
      set(target,prop,value){
        const result = Reflect.set(arget,prop,value)
        consol.log('拦截到修改数据或者是添加属性',prop,value)
        return result
      }
      // 删除某个属性
      deleteProperty(target,prop){
        const result = Reflect.deleteProperty(arget,prop)
        consol.log('拦截到删除属性',prop)
        return result
      }
    }

    // 定义一个 shallowReactive 函数，传入一个目标对象
    function shallowReactive(target){
      // 判断当前的目标对象是不是 object 类型(对象/数组)
      if(target && typeof target === 'object'){
        return new Proxy(target,reactiveHandler)
      }
      // 如果传入的数据是基本数据类型的数据，那么就直接返回
      return target
    }

    // 定义一个 reactive 函数，传入一个目标对象
    function reactive(target){
      // 判断当前的目标对象是不是 object 类型(对象/数组)
      if(target && typeof target === 'object'){
        // 对数组或者是对象中所有的数据进行 reactive 的递归处理
        // 1.先判断当前的数据是不是数组
        if(Array.isArray(target)){
          // 数组的数据要进行遍历操作
          target.forEach((item,index)=>{
            target[index] = reactive(item)
          })
        }else{
          // 2.再判断当前的数据是不是对象
          // 对象的数据也要进行遍历操作
          Object.keys(target).forEach(key=>{
            target[key] = reactive(target[key])
          })
        }
        return new Proxy(target,reactiveHandler)
      }
      // 如果传入的数据是基本数据类型的数据，那么就直接返回
      return target
    }
# 22.手写 shallowReaonly 和 reaonly
    // 定义了一个 readonlyHandler 处理器
    const readonlyHandler = {
      get(target,prop){
        const result = Reflect.get(target,prop)
        consol.log('拦截到读取数据',prop,result)
        return result
      },
      set(target,prop,value){
        console.warn('只能读取数据，不能修改数据或者添加属性')
        return true
      },
      deleteProperty(target,prop){
        console.warn('只能读取数据，不能删除属性')
        return true
      }
    }

    // 定义一个 shallowReaonly 函数
    function shallowReaonly (target){
      // 判断当前的目标对象是不是 object 类型(对象/数组)
      if(target && typeof target === 'object'){
        return new Proxy(target,reactiveHandler)
      }
      // 如果传入的数据是基本数据类型的数据，那么就直接返回
      return target
    }

    // 定义一个 reaonly 函数
    function reaonly (target){
      // 判断当前的目标对象是不是 object 类型(对象/数组)
      if(target && typeof target === 'object'){
        // 对数组或者是对象中所有的数据进行 reaonly 的递归处理
        // 1.先判断当前的数据是不是数组
        if(Array.isArray(target)){
          // 数组的数据要进行遍历操作
          target.forEach((item,index)=>{
            target[index] = reaonly(item)
          })
        }else{
          // 2.再判断当前的数据是不是对象
          // 对象的数据也要进行遍历操作
          Object.keys(target).forEach(key=>{
            target[key] = reaonly(target[key])
          })
        }
        return new Proxy(target,reactiveHandler)
      }
      // 如果传入的数据是基本数据类型的数据，那么就直接返回
      return target
    }
# 23.手写 shallow 和 ref
    // 定义一个 shallowRef 函数
    function shallowRef(target){
      return {
        // 保存 target 数据保存起来
        _value:target,
        get value(){
          console.log('劫持到了读取数据')
          return this._value
        },
        set value(val){
          console.log('劫持到了修改数据',value)
          this._value = val
        }
      }
    }

    // 定义一个 ref 函数
    function ref(target){
      target = reactive(target)
      return {
        // 保存 target 数据保存起来
        _value:target,
        get value(){
          console.log('劫持到了读取数据')
          return this._value
        },
        set value(val){
          console.log('劫持到了修改数据',value)
          this._value = val
        }
      }
    }
# 24.手写 isRef , isReactive ,isReadonly ,isProxy
    // 判断是否是ref对象
    function isRef(obj) {
      return obj && obj._is_ref
    }

    // 判断是否是reactive对象
    function isReactive(obj) {
      return obj && obj._is_reactive
    }

    // 判断是否是readonly对象
    function isReadonly(obj) {
      return obj && obj._is_readonly
    }

    // 是否是reactive或readonly产生的代理对象
    function isProxy (obj) {
      return isReactive(obj) || isReadonly(obj)
    }


    1：方法
      defineComponent 目的是定义一个组件,内部可以传入一个配置对象 export default defineComponent({})
      setup           组合API setup是组合API中第一个要使用的函数
      ref             定义一个响应式的数据,返回的是一个Ref对象,对象中有一个value属性,如果需要对数据进行操作,需要使用该Ref对象调用value属性的方式进行数据的操作
      reactive        定义多个深层数据的响应式
      toRef           把响应式数据state对象中的某个属性age变成了ref对象了 数据发生改变，界面也不会更新
      toRefs          可以把一个响应式对象转换成普通对象，该普通对象的每个 property 都是一个 ref
      shallowReactive 浅劫持(浅监视)----浅响应式
      shallowRef      浅劫持(浅监视)----浅响应式
      readonly        只读的数据---深度的只读
      shallowReadonly 只读的数据---浅只读的
      toRaw           把代理对象变成了普通对象了,数据变化,界面不变化
      markRaw         markRaw标记的对象数据,从此以后都不能再成为代理对象了
      customRef        customRef((track, trigger) => {
                        return {
                          // 返回数据的
                          get() {
                            // 告诉Vue追踪数据
                            track()
                            return value
                          },
                          // 设置数据的
                          set(newValue: T) {
                            // 清理定时器
                            clearTimeout(timeOutId)
                            // 开启定时器
                            timeOutId = setTimeout(() => {
                              value = newValue
                              // 告诉Vue更新界面
                              trigger()
                            }, delay)
                          },
                        }
                      })
      inject           把数据传给孙组件
      provide           把数据传给子组件
      isRef             检查一个值是否为一个 ref 对象
      isReactive        检查一个对象是否是由 reactive 创建的响应式代理
      isReadonly        检查一个对象是否是由 readonly 创建的只读代理
      isProxy           检查一个对象是否是由 reactive 或者 readonly 方法创建的代理

  2：响应式原理：
      利用ES6的Proxy 包装代理对象通过get、set、deleteProperty和Reflect.get/set/deleteProperty代理读取修改删除
        const proxyUser = new Proxy(user, {
          // 获取目标对象的某个属性值
          get(target, prop) {
            console.log('get方法调用了')
            return Reflect.get(target, prop)
          },
          // 修改目标对象的属性值/为目标对象添加新的属性
          set(target, prop, val) {
            console.log('set方法调用了')
            return Reflect.set(target, prop, val)
          },
          // 删除目标对象上的某个属性
          deleteProperty(target, prop) {
            console.log('delete方法调用了')
            return Reflect.deleteProperty(target,prop)
          }
        })
  3：setup细节问题
      // setup是在beforeCreate生命周期回调之前就执行了,而且就执行一次
      // 由此可以推断出:setup在执行的时候,当前的组件还没有创建出来,也就意味着:组件实例对象this根本就不能用
      // this是undefined,说明,就不能通过this再去调用data/computed/methods/props中的相关内容了
      // 其实所有的composition API相关回调函数中也都不可以
      // setup中的返回值是一个对象,内部的属性和方法是给html模版使用的
      // setup中的对象内部的属性和data函数中的return对象的属性都可以在html模版中使用
      // setup中的对象中的属性和data函数中的对象中的属性会合并为组件对象的属性
      // setup中的对象中的方法和methods对象中的方法会合并为组件对象的方法
      // 在Vue3中尽量不要混合的使用data和setup及methods和setup
      // 一般不要混合使用: methods中可以访问setup提供的属性和方法, 但在setup方法中不能访问data和methods
      // setup不能是一个async函数: 因为返回值不再是return的对象, 而是promise, 模板看不到return对象中的属性数据

  4：ref和reactive细节问题
      // 是Vue3的 composition API中2个最重要的响应式API(ref和reactive)
      // ref用来处理基本类型数据, reactive用来处理对象(递归深度响应式)
      // 如果用ref对象/数组, 内部会自动将对象/数组转换为reactive的代理对象
      // ref内部: 通过给value属性添加getter/setter来实现对数据的劫持
      // reactive内部: 通过使用Proxy来实现对对象内部所有数据的劫持, 并通过Reflect操作对象内部数据
      // ref的数据操作: 在js中要.value, 在模板中不需要(内部解析模板时会自动添加.value)

  5：计算属性和watch
   * computed
   *  fullName1 默认 get user.firstName + '_' + user.lastName
   *  fullName2 get user.firstName + '_' + user.lastName
   *            set 同时改变 user 的值
   * watch
   *  fullName3 mmediate 默认会执行一次watch
   * watchEffect 不需要配置immediate,本身默认就会进行监视,(默认执行一次)

  6：生命周期
    * 初始化执行顺序 setup beforeCreate created onBeforeMount beforeMount onMounted mounted
    * 更新执行顺序   onBeforeUpdate beforeUpdate onUpdated updated
    * 销毁执行顺序   onBeforeUnmount beforeUnmount onUnmounted unmounted

  7手写组合api
    // shallowReactive(浅的劫持,浅的监视,浅的响应数据) 与 reactive(深的)
    // 定义一个reactiveHandler处理对象
    const reactiveHandler = {
      // 获取属性值
      get (target, prop) {
        if (prop === '_is_reactive') return true
        const result = Reflect.get(target, prop)
        console.log('拦截了读取数据', prop, result)
        return result
      },
      // 修改属性值或者是添加属性
      set (target, prop, value) {
        const result = Reflect.set(target, prop, value)
        console.log('拦截了修改数据或者是添加属性', prop, value)
        return result
      },
      // 删除某个属性
      deleteProperty (target, prop) {
        const result = Reflect.deleteProperty(target, prop)
        console.log('拦截了删除数据', prop)
        return result
      }
    }
    // 定义一个shallowReactive函数,传入一个目标对象
    function shallowReactive (target) {
    // 判断当前的目标对象是不是object类型(对象/数组)
    if (target && typeof target === 'object') {
      return new Proxy(target, reactiveHandler)
    }
    // 如果传入的数据是基本类型的数据,那么就直接返回
    return target
    }
    // 定义一个reactive函数,传入一个目标对象
    function reactive (target) {
      // 判断当前的目标对象是不是object类型(对象/数组)
      if (target && typeof target === 'object') {
        // 对数组或者是对象中所有的数据进行reactive的递归处理
        // 先判断当前的数据是不是数组
        if (Array.isArray(target)) {
          // 数组的数据要进行遍历操作
          target.forEach((item, index) => {
            target[index] = reactive(item)
          })
        } else {
          // 再判断当前的数据是不是对象
          // 对象的数据也要进行遍历的操作
          Object.keys(target).forEach(key => {
            target[key] = reactive(target[key])
          })

        }
        return new Proxy(target, reactiveHandler)
      }
      // 如果传入的数据是基本类型的数据,那么就直接返回
      return target
    }

    // =================================
    // 定义了一个readonlyHandler处理器
    const readonlyHandler = {
      get (target, prop) {
        if (prop === '_is_readonly') return true
        const result = Reflect.get(target, prop)
        console.log('拦截到了读取数据了', prop, result)
        return result
      },
      set (target, prop, value) {
        console.warn('只能读取数据,不能修改数据或者添加数据')
        return true
      },
      deleteProperty (target, prop) {
        console.warn('只能读取数据,不能删除数据')
        return true
      }
      }

      // 定义一个shallowReadonly函数
      function shallowReadonly (target) {
      // 需要判断当前的数据是不是对象
      if (target && typeof target === 'object') {
        return new Proxy(target, readonlyHandler)
      }

      return target
    }

    // 定义一个readonly函数
    function readonly (target) {
      // 需要判断当前的数据是不是对象
      if (target && typeof target === 'object') {
        // 判断target是不是数组
        if (Array.isArray(target)) {
          // 遍历数组
          target.forEach((item, index) => {
            target[index] = readonly(item)
          })
        } else { // 判断target是不是对象
          // 遍历对象
          Object.keys(target).forEach(key => {
            target[key] = readonly(target[key])
          })
        }
        return new Proxy(target, readonlyHandler)
      }
      // 如果不是对象或者数组,那么直接返回
      return target
      }

      // 定义一个shallowRef函数
      function shallowRef (target) {
      return {
        // 保存target数据保存起来
        _value: target,
        get value () {
          console.log('劫持到了读取数据')
          return this._value
        },
        set value (val) {
          console.log('劫持到了修改数据,准备更新界面', val)
          this._value = val
        }

      }
    }

    // 定义一个ref函数
    function ref (target) {
      target = reactive(target)
      return {
        _is_ref: true, // 标识当前的对象是ref对象
        // 保存target数据保存起来
        _value: target,
        get value () {
          console.log('劫持到了读取数据')
          return this._value
        },
        set value (val) {
          console.log('劫持到了修改数据,准备更新界面', val)
          this._value = val
        }
      }
      }

      // 定义一个函数isRef,判断当前的对象是不是ref对象
      function isRef (obj) {
      return obj && obj._is_ref
      }
      // 定义一个函数isReactive,判断当前的对象是不是reactive对象
      function isReactive (obj) {
      return obj && obj._is_reactive
      }
      // 定义一个函数isReadonly,判断当前的对象是不是readonly对象
      function isReadonly (obj) {
      return obj && obj._is_readonly
      }
      // 定义一个函数isProxy,判断当前的对象是不是reactive对象或者readonly对象
      function isProxy (obj) {
      return isReactive(obj) || isReadonly(obj)
    }



响应式原理
https://www.bilibili.com/video/BV1SZ4y1x7a9
https://www.bilibili.com/video/BV1bS4y1T7ng?from=search&seid=3764866017126412880&spm_id_from=333.337.0.0
https://www.bilibili.com/video/BV1rC4y187Vw?from=search&seid=17880431761966986301&spm_id_from=333.337.0.0


# 1.非响应式的
  let price = 5
  let quantity = 2
  let total = pricr * quantity
  console.log(total ' = 10')
  quantity = 3
  console.log(total ' = 10')  // 件数变了总价格没变不是响应式更新的
# 2.想要当件数或者单价改变之后自动更新总价格
  let price = 5
  let quantity = 2
  let toal = 0
  let dep = new Set()
  let effect = () => { total = price * quantity }
  function track () { dep.add(effect) }
  function trigger () { dep.forEach( effect => effect() ) }
  track()
  effect()
  console.log(total ' = 10')
  quantity = 3
  console.log(total ' = 10')
  trigger()
  console.log(total ' = 15')
# 3. 单个响应式对象
  利用 map 的 key 来存要改变的属性， value 来存计算的方法，当这个属性改变时，来遍历调用这个 map value 上的方法重新计算
  const depsMap = new Map()
  function track(key){
    let dep = depsMap.get(key)
    if(!dep){
      depsMap.set(key, ( dep = new Set() ) )
    }
    dep.add(effect)
  }
  function trigger(key){
    let dep = depsMap.get(key)
    if(dep){
      dep.forEach(effect => {
        effect()
      })
    }
  }
  let product = { price: 5, quantity: 2 }
  let total = 0
  let effect = () => {
    total = product.price * product.quantity
  }
  track('quantity')
  effect()
  console.log(total ' = 10')
  product.quantity = 3
  trigger('quantity')
  console.log(total ' = 15')
# 4. 多个响应式对象
  // 三层依赖图
  1.targetMap(key:目标对象,value:depsMap)
  2.depsMap(key:目标属性,value:dep方法)
  3.dep:effect方法
  const targetMap = new WeakMap()
  // 用来保存 effect
  function track(target, key) {
    let depsMap = targetMap.get(target)
    if(!depsMap) {
      targetMap.set(target, ( depsMap = new Map() ))
    }
    let dep = depsMap.get(key)
    if(!dep) {
      depsMap.set(key, ( dep = new Set() ))
    }
    dep.add(effect)
  }
  // 用来调用 effect
  function trigger(target, key){
    const depsMap = targetMap.get(target)
    if(!depsMap) { return }
    let dep = depsMap.get(key)
    if(dep){
      dep.forEach(effect => {
        effect()
      })
    }
  }
  let product = { price: 5, quantity: 2 }
  let total = 0
  // effect：效果  
  let effect = () => {
    total = product.price * product.quantity
  }
  track('product', 'quantity')
  effect()
  console.log(total ' = 10')
  product.quantity = 3
  trigger(product, 'quantity')
  console.log(total ' = 15')
# 5.reactive
    const targetMap = new WeakMap()
    function track(target, key) {
      let depsMap = targetMap.get(target)
      if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
      }
      let dep = depsMap.get(key)
      if (!dep) {
        depsMap.set(key, (dep = new Set()))
      }
      dep.add(effect)
    }

    function trigger(target, key) {
      const depsMap = targetMap.get(target)
      if (!depsMap) {
        return
      }
      let dep = depsMap.get(key)
      if (dep) {
        dep.forEach(effect => {
          effect()
        })
      }
    }

    function reactive(target) {
      const handler = {
        get(target, key, recriver) {
          let result = Reflect.get(target, key, recriver)
          track(target, key)
          return result
        },
        set(target, key, value, recriver) {
          let oldValue = target[value]
          let result = Reflect.set(target, key, value, recriver)
          if (oldValue != value) {
            trigger(target, key)
          }
          return result
        }
      }
      return new Proxy(target, handler)
    }

    let product = reactive({
      price: 5,
      quantity: 2
    })
    let total = 0
    let effect = () => {
      total = product.price * product.quantity
    }

    effect()
    console.log(total)
    product.quantity = 3
    console.log(total)
  
    

// 常用配置
{
  "include": [
    "tests/**/*.ts",
    "src/**/*.ts",
    "src/**/*.d.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "types/**/*.d.ts",
    "types/**/*.ts",
    "build/**/*.ts",
    "build/**/*.d.ts",
    "mock/**/*.ts",
    "vite.config.ts"
  ],
  "exclude": ["node_modules", "tests/server/**/*.ts", "dist", "**/*.js"],
  /*
      tsconfig.json是ts编译器的配置文件，ts可以根据它的信息来对待吗进行编译 可以再tsconfig中写注释
      include : 用来指定哪些文件需要被编译
      exclude : 用来指定哪些文件不需要被编译 ：默认node_module
      extends : 用来指定继承的配置文件
      files   : 用来指定被编译的文件列表，只有编译少量文件才使用
      compilerOptions : 编译器的选项是配置文件中非常重要也是非常复杂的配置选项
  */

  // "extends": "./configs/base",
  // "files": [
  //   "1.ts"
  //   // "2.ts"
  // ],
  "compilerOptions": {
    "moduleResolution": "node",
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "jsx": "preserve",
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "lib": ["dom", "esnext"],

    "skipLibCheck": true, //跳过检查库的代码
    // "experimentalDecorators": true,
    "baseUrl": "./",
    "paths": {
      // "*":["./node_modules/@types", "./types/*"],
      "@/*": ["src/*"],
      "#/*": ["types/*"]
    },
    // 用来指定 ES 版本 ESNext : 最新版。 'ES3', 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019', 'ES2020', 'ESNext'
    "target": "esnext",
    // 指定要使用模块化的规范 : 'None', 'CommonJS', 'AMD', 'System', 'UMD', 'ES6'/'ES2015', 'ES2020' or 'ESNext'
    "module": "esnext",
    // 用来指定项目中要使用的库 'ES5', 'ES6', 'ES2015', 'ES7', 'ES2016', 'ES2017', 'ES2018', 'ESNext', 'DOM', 'DOM.Iterable',
    //                          'WebWorker', 'ScriptHost', 'ES2015.Core', 'ES2015.Collection', 'ES2015.Generator', 'ES2015.Iterable',
    //                          'ES2015.Promise', 'ES2015.Proxy', 'ES2015.Reflect', 'ES2015.Symbol', 'ES2015.Symbol.WellKnown',
    //                          'ES2016.Array.Include', 'ES2017.object', 'ES2017.Intl', 'ES2017.SharedMemory', 'ES2017.String',
    //                          'ES2017.TypedArrays', 'ES2018.Intl', 'ES2018.Promise', 'ES2018.RegExp', 'ESNext.AsyncIterable',
    //                          'ESNext.Array', 'ESNext.Intl', 'ESNext.Symbol'
    // 运行在浏览器中不用设置，运行在node或其他中才需要设置
    // "lib":[]，
    // 用来指定编译后文件的存放位置
    "outDir": "./dist",
    // 将代码合并为一个文件,设置之后所有的全局作用域中的代码会合并到同一个文件中 但是只能在  'amd' and 'system' 中才能使用
    // "outFile": "./dist/app.js",
    // 是否对js文件进行编译，默认false
    "allowJs": true,
    // 是否检查js代码是否符合语法规范，默认false
    "checkJs": false,
    // 是否移除注释，默认false
    "removeComments": false,
    // 是否不生成编译后文件，默认false
    "noEmit": false,
    // 当有错误时是否生成文件，默认false
    "noEmitOnError": false,
    // 是否生成sourceMap，默认false  这个文件里保存的，是转换后代码的位置，和对应的转换前的位置。有了它，出错的时候，通过断点工具可以直接显示原始代码，而不是转换后的代码。
    "sourceMap": false,

    // 所有的严格检查的总开关，默认false
    "strict": true,
    // 编译后的文件是否开启严格模式，默认false
    "alwaysStrict": true,
    // 不允许隐式的any，默认false(允许)
    "noImplicitAny": false,
    // 不允许隐式的this，默认false(允许)
    "noImplicitThis": false,
    // 是否严格的检查空值，默认false 检查有可能为null的地方
    "strictNullChecks": true,
    // 是否严格检查bind、call和apply的参数列表，默认false  检查是否有多余参数
    "strictBindCallApply": true,
    // 是否严格检查函数的类型，
    "strictFunctionTypes": true,
    // 是否严格检查属性是否初始化，默认false
    "strictPropertyInitialization": true,

    // 是否检查switch语句包含正确的break，默认false
    "noFallthroughCasesInSwitch": true,
    // 检查函数没有隐式的返回值，默认false
    "noImplicitReturns": true,
    // 是否检查检查未使用的局部变量，默认false
    "noUnusedLocals": true,
    // 是否检查未使用的参数，默认false
    "noUnusedParameters": true,

    // 是否检查不可达代码报错，默认false   true，忽略不可达代码 false，不可达代码将引起错误
    "allowUnreachableCode": false
  }
}
// 最全配置
// https://www.tslang.cn/docs/handbook/compiler-options.html

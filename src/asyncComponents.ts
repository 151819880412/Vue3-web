import {defineAsyncComponent, Plugin} from "vue";

// 要异步导入的全局组件
const asyncComponentPathArr = [
    {
        name: "DialogMask",
        path:'@/components/DialogMask/DialogMask.vue'
    }
]
// app.use一次性注册多个全局组件
const asyncComponentsPlugin: Plugin = {
    install(app) {
        for (const item of asyncComponentPathArr) {
            app.component(item.name, defineAsyncComponent(() => import('@/components/DialogMask/DialogMask.vue')))
        }
    }
}
export default asyncComponentsPlugin
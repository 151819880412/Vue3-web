import { defineStore } from "pinia";

interface DefaultActiveStoreState {
  defaultActive: string;
}

// 对外部暴露一个 use 方法，该方法会导出我们定义的 state
const useDefaultActiveStore = defineStore({
  // 每个 store 的 id 必须唯一
  id: 'defaultActive',
  // state 表示数据源
  state: (): DefaultActiveStoreState => ({
    defaultActive: ''
  }),
  // getters 类似于 computed，可对 state 的值进行二次计算
  getters: {
    // doubleCount: (state) => state.defaultActive * 2,
  },
  // actions 用来修改 state
  actions: {
    setDefaultActive(url: string) {
      this.defaultActive = url;
    },
  }
});

export default useDefaultActiveStore;

// // 重置
// store.$reset()
// // 使用 $patch 修改多个值
// store.$patch({
//   counter: store.counter + 1,
//   name: 'Abalam',
// })
// // 替换整个 state
// store.$state = {
//   name: 'Bob',
//   sex: '男'
// }
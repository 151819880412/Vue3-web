import { createApp } from "vue";

// 导入写好的Loading.vue文件
import Loading from "./Loading.vue";

export default {
  loading: {},
  // 每当这个插件被添加到应用程序中时，如果它是一个对象，就会调用 install 方法。如果它是一个 function，则函数本身将被调用。在这两种情况下——它都会收到两个参数：由 Vue 的 createApp 生成的 app 对象和用户传入的选项。
  install(app) {
    if (Object.keys(this.loading).length !== 0) {
      // 防止多次载入
      app.config.globalProperties.$Loading = this.loading;
      app.$Loading = this.loading;
      return;
    }
    // 创建Loading实例，用于挂载
    const instance = createApp(Loading);
    // 创建div元素装载Loading对象
    const div = document.createElement("div");
    const body = document.body;
    // 导入body中
    body.appendChild(div);
    this.loading = instance.mount(div) as object;
    // 挂载vue身上
    app.config.globalProperties.$Loading = this.loading;
    app.$Loading = this.loading;
  }
};
import { createApp ,App as AppType, defineAsyncComponent} from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import store from './store'
// import piniaStore from '@/piniaStore/index.js'


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
// import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './styles/index.stylus'
import 'element-plus/theme-chalk/dark/css-vars.css'


// import './assets/iconfont/iconfont.css';
// import './assets/icons/index.js';
import SvgIcon from '@/components/Icon/SvgIcon.vue'
import './assets/icons' // icon


import MainTable from '@/components/MainTable/MainTable.vue'
// import DialogMask from '@/components/DialogMask/DialogMask.vue'
const DialogMask = defineAsyncComponent(() => import('@/components/DialogMask/DialogMask.vue'))



import Loading from "@/components/Loading/index"

import { LoadingType } from './@types/loading';
import { setupStore } from './piniaStore';

// createApp(App).use(store).use(router).use(ElementPlus,{locale})
// .component('forms',forms)
// .mount('#app')
interface CustomApp extends AppType{
  $Loading:LoadingType
}

const app = createApp(App) as CustomApp;
  // 配置 store
  setupStore(app);
 // Configure routing
 setupRouter(app);

 // router-guard
 setupRouterGuard(router);

//  全局使用 icon
 for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 全局组件
app.component("MainTable",MainTable);
app.component("DialogMask",DialogMask);
app.component("SvgIcon",SvgIcon);

// 安装 Pinia
// app.use(createPinia())

app.use(store)
// app.use(router)
app.use(Loading)
app.use(ElementPlus,{locale})
app.mount('#app');


export default app
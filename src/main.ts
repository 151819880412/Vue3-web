import { createApp, App as AppType, defineAsyncComponent } from 'vue';
import App from './App.vue';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import store from './store';
// import piniaStore from '@/piniaStore/index.js'
// 初始化
import { initAppConfigStore } from '@/logics/initAppConfig';

// 异常监控
// import * as Sentry from "@sentry/vue";
// import { BrowserTracing } from "@sentry/tracing";


import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './styles/index.stylus';
import 'element-plus/theme-chalk/dark/css-vars.css';


// import './assets/iconfont/iconfont.css';
// import './assets/icons/index.js';
import SvgIcon from '@/components/Icon/SvgIcon.vue';
import './assets/icons'; // icon


import MainTable from '@/components/MainTable/MainTable.vue';
// import DialogMask from '@/components/DialogMask/DialogMask.vue'
const DialogMask = defineAsyncComponent(() => import('@/components/DialogMask/DialogMask.vue'));



import Loading from "@/components/Loading/index";

import { LoadingType } from './@types/loading';
import { setupStore } from './piniaStore';
import { setupErrorHandle } from './utils/logics/error-handle';
// import { Formt } from './utils/DateFormt';
// import { watchError } from './utils/watchError';

// createApp(App).use(store).use(router).use(ElementPlus,{locale})
// .component('forms',forms)
// .mount('#app')
interface CustomApp extends AppType {
  $Loading: LoadingType;
}

const app = createApp(App) as CustomApp;
// 配置 store
setupStore(app);
// Configure routing
setupRouter(app);

// 初始化内部系统配置
initAppConfigStore();

// router-guard
setupRouterGuard(router);

//  全局使用 icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 异常监控
// Sentry.init({
//   app,
//   dsn: "http://ae75d04bcdf8481eb3d6cbdd8ebb6805@192.168.226.3:9000/2",
//   release: 'pro@1.0.1',
//   integrations: [
//     new BrowserTracing({
//       routingInstrumentation: Sentry.vueRouterInstrumentation(router),
//       tracePropagationTargets: ["localhost", "my-site-url.com", /^\//],
//     }),
//   ],
//   tracesSampleRate: 1.0,
// });

// 配置全局错误处理
setupErrorHandle(app);

// 全局组件
app.component("MainTable", MainTable);
app.component("DialogMask", DialogMask);
app.component("SvgIcon", SvgIcon);

// 安装 Pinia
// app.use(createPinia())

app.use(store);
// app.use(router)
app.use(Loading);
app.use(ElementPlus, { locale });
app.mount('#app');
// watchError(app)

export default app;
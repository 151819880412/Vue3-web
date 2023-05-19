import { createApp,App as AppType } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/dark/css-vars.css';

import SvgIcon from '@/components/Icon/SvgIcon.vue';
// import './assets/icons/index'; // icon


interface CustomApp extends AppType {

}

const app = createApp(App) as CustomApp;

//  全局使用 icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component("SvgIcon", SvgIcon);


// 配置路由
setupRouter(app);
// 路由守卫
setupRouterGuard(router);
// ElementPlus
app.use(ElementPlus, { locale });


app.mount('#app')

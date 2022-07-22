import { createApp } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import store from './store'

import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import locale from 'element-plus/lib/locale/lang/zh-cn';

import Loading from "@/components/Loading/index"

import './styles/index.stylus'

// createApp(App).use(store).use(router).use(ElementPlus,{locale})
// .component('forms',forms)
// .mount('#app')


const app = createApp(App);

 // Configure routing
 setupRouter(app);

 // router-guard
 setupRouterGuard(router);


app.use(store)
// app.use(router)
app.use(Loading)
app.use(ElementPlus,{locale})
app.mount('#app');

export default app
import { createApp,App as AppType } from 'vue'
import App from './App.vue'
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';


interface CustomApp extends AppType {

}

const app = createApp(App) as CustomApp;
console.log(app)
// 配置路由
setupRouter(app);
// 路由守卫
setupRouterGuard(router);

createApp(App).use(router).mount('#app')

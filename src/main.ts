import { createApp,App as AppType } from 'vue'
import App from './App.vue'
import router from './router'


interface CustomApp extends AppType {

}

const app = createApp(App) as CustomApp;
console.log(app)

createApp(App).use(router).mount('#app')

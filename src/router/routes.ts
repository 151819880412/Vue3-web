
import { RouteRecordRaw } from 'vue-router';

const AppLayout = () => import('@/views/layout/AppLayout.vue')
const Login = () => import('@/views/login/login.vue')




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
    component: AppLayout,
    children:[],
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  // {
  //   path: '/aaa',
  //   name: 'AppLayout',
  //   component: AppLayout,
  //   children:[
  //     {
  //       path: '/a',
  //       name: 'A',
  //       component: A,
  //     },
  //     {
  //       path: '/b',
  //       name: 'B',
  //       component: B,
  //     },
  //   ]
  // },
];
export default routes;
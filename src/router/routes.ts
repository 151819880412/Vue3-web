
import { RouteRecordRaw } from 'vue-router';

// import AppLayout from '@/views/layout/AppLayout.vue'



const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
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

import { RouteRecordRaw } from 'vue-router';

const AppLayout = () => import('@/views/layout/AppLayout.vue')
const Login = () => import('@/views/login/login.vue')
const Home = () => import('@/views/home/home.vue')
const User = () => import('@/views/user/user.vue')
const Role = () => import('@/views/role/role.vue')




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
  {
    path: '/',
    component: AppLayout,
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home,
      },
    ],
  },
  {
    path: '/system',
    component: AppLayout,
    children:[
      {
        path: '/user',
        name: 'user',
        component: User,
      },
      {
        path: '/role',
        name: 'role',
        component: Role,
      },
    ],
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
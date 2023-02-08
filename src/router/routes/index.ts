import { AppRouteModule, AppRouteRecordRaw } from '../types';
import { ERROR_LOG_ROUTE, PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from './basic';
const Login = () => import('@/views/login/login.vue')
const AppLayout = () => import('@/views/layout/AppLayout.vue')
const Home = () => import('@/views/home/home.vue')




const modulesFiles = require.context('./modules', true, /\.ts$/)

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

// const modules =[];
const routeModuleList: AppRouteModule[] = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key] || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

export const asyncRoutes = [PAGE_NOT_FOUND_ROUTE, ...routeModuleList];

// 根路由
export const HomeRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Home',
  redirect: 'home',
  component: AppLayout,
  meta: {
    title: '首页',
  },
  children:[
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        // hideChildrenInMenu: true,
        // icon: 'simple-icons:about-dot-me',
        title: 'Home',
        // orderNo: 100000,
      },
    }
  ]
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: Login,
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '登录',
    // orderNo: 100000,
  },
};

export const RegisterRoute: AppRouteRecordRaw = {
  path: '/register',
  name: 'Register',
  component: Login,
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '登录',
    ignoreAuth:true,
    // orderNo: 100000,
  },
};

// Basic routing without permission
// 未经许可的基本路由
export const basicRoutes = [LoginRoute,RegisterRoute,HomeRoute, REDIRECT_ROUTE,PAGE_NOT_FOUND_ROUTE,ERROR_LOG_ROUTE];

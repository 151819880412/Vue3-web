import { AppRouteModule } from '../../types';
const AppLayout = () => import('@/views/layout/AppLayout.vue')


const login: AppRouteModule = {
  path: '/about',
  name: 'About',
  component: AppLayout,
  redirect: '/about/index',
  meta: {
    hideChildrenInMenu: true,
    icon: 'simple-icons:about-dot-me',
    title: '登录',
    orderNo: 100000,
  },
};

export default login;

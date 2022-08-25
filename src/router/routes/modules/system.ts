import { AppRouteModule } from '../../types';
const AppLayout = () => import('@/views/layout/AppLayout.vue')
const User = () => import('@/views/user/user.vue')
const Role = () => import('@/views/role/role.vue')

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  component: AppLayout,
  meta: {
    // hideChildrenInMenu: true,
    // icon: 'simple-icons:about-dot-me',
    title: '系统',
    // orderNo: 100000,
  },
  children:[
    {
      path: '/user',
      name: 'User',
      component: User,
      meta: {
        // hideChildrenInMenu: true,
        // icon: 'simple-icons:about-dot-me',
        title: '用户',
        // orderNo: 100000,
      },
    },
    {
      path: '/role',
      name: 'role',
      component: Role,
      meta: {
        // hideChildrenInMenu: true,
        // icon: 'simple-icons:about-dot-me',
        title: '角色',
        // orderNo: 100000,
      },
    },
  ],
};



export default system;


import { defineStore } from 'pinia';
import { store } from '@/piniaStore/index';



import { AppRouteRecordRaw} from '@/router/types';
import { useAppStoreWithOut } from './app';

const AppLayout = () => import('@/views/layout/AppLayout.vue');
const User = () => import('@/views/user/user.vue');
const Role = () => import('@/views/role/role.vue');


interface PermissionState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  // 触发菜单更新
  lastBuildMenuTime: number;
  // 菜单列表
  MenuList: AppRouteRecordRaw[];
}

export const usePermissionStore = defineStore({
  id: 'app-permission',
  state: (): PermissionState => ({
    // 路由是否动态添加
    isDynamicAddedRoute: false,
    // 触发菜单更新
    lastBuildMenuTime: 0,
    // 菜单列表
    MenuList: [],
  }),
  getters: {
    getMenuList(): AppRouteRecordRaw[] {
      return this.MenuList;
    },
    getLastBuildMenuTime(): number {
      return this.lastBuildMenuTime;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    setMenuList(list: AppRouteRecordRaw[]) {
      this.MenuList = list;
      list?.length > 0 && this.setLastBuildMenuTime();
    },
    setLastBuildMenuTime() {
      this.lastBuildMenuTime = new Date().getTime();
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    resetState(): void {
      this.isDynamicAddedRoute = false;
      this.MenuList = [];
      this.lastBuildMenuTime = 0;
    },

    // 构建路由
    async buildRoutesAction(): Promise<AppRouteRecordRaw[]> {
      // const userStore = useUserStore();
      const appStore = useAppStoreWithOut();
      console.log(appStore)

      let routes: AppRouteRecordRaw[] = [];
      const roleList = [];
      // const roleList = toRaw(userStore.getRoleList) || [];
      // const permissionMode = PermissionModeEnum.ROUTE_MAPPING
      console.log(roleList);
      console.log(JSON.parse(JSON.stringify(routes)));


      /**
       * @description 根据设置的首页path，修正routes中的affix标记（固定首页）
       * */
      const patchHomeAffix = (routes: AppRouteRecordRaw[]) => {
        if (!routes || routes.length === 0) return;
        let homePath = 'home';
        // let homePath: string = userStore.getUserInfo.homePath || 'home';

        function patcher(routes: AppRouteRecordRaw[], parentPath = '') {
          if (parentPath) parentPath = parentPath + '/';
          routes.forEach((route: AppRouteRecordRaw) => {
            const { path, children, redirect } = route;
            const currentPath = path.startsWith('/') ? path : parentPath + path;
            if (currentPath === homePath) {
              if (redirect) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                homePath = route.redirect! as string;
              } else {
                route.meta = Object.assign({}, route.meta, { affix: true });
                throw new Error('end');
              }
            }
            children && children.length > 0 && patcher(children, currentPath);
          });
        }

        try {
          patcher(routes);
        } catch (e) {
          // 已处理完毕跳出循环
        }
        return;
      };

      console.log(JSON.parse(JSON.stringify(routes)));
      routes = [{
        path: '/system',
        name: 'System',
        component: AppLayout,
        meta: {
          // hideChildrenInMenu: true,
          icon: '<span class="iconfont icon-zhanghaoquanxianguanli"/>',
          title: '系统',
          // orderNo: 100000,
        },
        children: [
          {
            path: '/user',
            name: 'User',
            component: User,
            meta: {
              // hideChildrenInMenu: true,
              icon: '<span class="iconfont icon-yonghu"/>',
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
              icon: '<span class="iconfont icon-jiaose"/>',
              title: '角色',
              // orderNo: 100000,
            },
          },
        ],
      }];
      this.setMenuList(routes);
      patchHomeAffix(routes);
      return routes;
    },
  },
});

// 需要在设置之外使用
export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}

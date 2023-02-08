
import { defineStore } from 'pinia';
import { store } from '@/piniaStore/index';
import { AppRouteRecordRaw, Menu } from '@/router/types';
// import { useAppStoreWithOut } from './app';
import { USER_INFO_KEY } from '@/enums/cacheEnum';
import { Persistent } from '@/utils/cache/persistent';
import { UserInfo } from '../../../types/store';

// const AppLayout = () => import('@/views/layout/AppLayout.vue');
// const User = () => import('@/views/user/user.vue');
// const Role = () => import('@/views/role/role.vue');
// const Menu = () => import('@/views/menu/menu.vue')
// import files from './file';
const files = require.context('@/views', true, /\.vue$/)

interface PermissionState {
  // 路由是否动态添加
  isDynamicAddedRoute: boolean;
  // To trigger a menu update
  // 触发菜单更新
  lastBuildMenuTime: number;
  // 菜单列表
  MenuList: Menu[];
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
    getMenuList(): Menu[] {
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
      // const appStore = useAppStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      // const roleList = [];
      // const roleList = toRaw(userStore.getRoleList) || [];
      // const permissionMode = PermissionModeEnum.ROUTE_MAPPING


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

      const arr = Persistent.getLocal<UserInfo>(USER_INFO_KEY)?.auth ? Persistent.getLocal<UserInfo>(USER_INFO_KEY)?.auth : [];
      // 待优化
      const renderComponent = (str: string) => {
        switch (str) {
          case 'LAYOUT':
            return () => import('@/views/layout/AppLayout.vue');
            default:
            return () => import(`@/views${files.keys().filter(item => item == '.' + str + '.vue')[0].slice(1)}`);
        }
      };
      const treeFor = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          if (arr[i]?.children) {
            treeFor(arr[i]?.children);
          }
          arr[i].meta = {
            title: arr[i].menuName
          };
          arr[i].component = renderComponent(arr[i].componentPath);
          arr[i].name = arr[i].componentName
          arr[i].title = arr[i].menuName
        }
      };
      // arr[1].component = ()=>import('@/views/home/home.vue');
      treeFor(arr);
      routes = arr as unknown as Array<AppRouteRecordRaw>;

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

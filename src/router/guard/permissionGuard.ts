import type { Router, RouteRecordRaw } from 'vue-router';

import { usePermissionStoreWithOut } from '@/piniaStore/modules/permission';

import { PageEnum } from '@/enums/pageEnum';
import { useAppStoreWithOut } from '@/piniaStore/modules/app';
import { useUserStoreWithOut } from '@/piniaStore/modules/user';

const PAGE_NOT_FOUND_ROUTE = {
  name: 'PageNotFound'
};

const LOGIN_PATH = PageEnum.BASE_LOGIN;

// 根路由
const ROOT_PATH = '/home';

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  // const userStore = {
  //   getUserInfo: {
  //     homePath: ''
  //   },
  //   getToken: '',
  //   getSessionTimeout: 1,
  //   // eslint-disable-next-line @typescript-eslint/no-empty-function
  //   afterLoginAction: () => { },
  //   getLastUpdateTime: (): number => {
  //     return 1;
  //   }
  // };
  const userStore = useUserStoreWithOut();

  const permissionStore = usePermissionStoreWithOut();

  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME &&
      userStore.getUserInfo.homePath &&
      userStore.getUserInfo.homePath !== PageEnum.BASE_HOME
    ) {
      next(userStore.getUserInfo.homePath);
      return;
    }

    // 设置菜单默认选中页面
    const appStore = useAppStoreWithOut();
    // store.setDefaultActive(to.path)
    appStore.setProjectConfig({ menuSetting: { defaultActive: to.path } });
    // store.dispatch(SidebarActionTypes.DEFAULT_ACTIVE,to.path)

    const token = userStore.getToken;

    // 白名单
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    // token
    if (!token.token) {
      // 您可以在未经许可的情况下访问。您需要设置路由元。ignoreAuth为true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // 重定向到登录页面
      const redirectData: { path: string; replace: boolean; query?: Recordable<string>; } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === PAGE_NOT_FOUND_ROUTE.name &&
      to.fullPath !== (userStore.getUserInfo.homePath || PageEnum.BASE_HOME)
    ) {
      next(userStore.getUserInfo.homePath || PageEnum.BASE_HOME);
      return;
    }

    // 判断如果是动态路由就跳过，避免死循环
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }
    const routes = await permissionStore.buildRoutesAction();

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });

    permissionStore.setDynamicAddedRoute(true);

    if (to.name === PAGE_NOT_FOUND_ROUTE.name) {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }

  });
}

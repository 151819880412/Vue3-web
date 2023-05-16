import type { Router, RouteLocationNormalized } from 'vue-router';
// import { useAppStoreWithOut } from '@/store/modules/app';
// import { useUserStoreWithOut } from '@/store/modules/user';
// import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting';
import { AxiosCanceler } from '@/utils/http/axiosCancel';
import { unref } from 'vue';
// import { setRouteChange } from '@/logics/mitt/routeChange';
import { createPermissionGuard } from './permissionGuard';
import { createStateGuard } from './stateGuard';
import nProgress from 'nprogress';
// import projectSetting from '@/settings/projectSetting';
import { createParamMenuGuard } from './paramMenuGuard';

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createParamMenuGuard(router); // must after createPermissionGuard (menu has been built.)
  createStateGuard(router);
}

/**
 * 处理页面状态的钩子
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由更改
    // setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

//用于处理页面加载状态
function createPageLoadingGuard(router: Router) {
  console.log(router)
  // const userStore = useUserStoreWithOut();
  // const appStore = useAppStoreWithOut();
  // const { getOpenPageLoading } = useTransitionSetting();
  // router.beforeEach(async (to) => {
  //   if (!userStore.getToken) {
  //     return true;
  //   }
  //   if (to.meta.loaded) {
  //     return true;
  //   }

  //   if (unref(getOpenPageLoading)) {
  //     appStore.setPageLoadingAction(true);
  //     return true;
  //   }

  //   return true;
  // });
  // router.afterEach(async () => {
  //   if (unref(getOpenPageLoading)) {
  //     // TODO Looking for a better way
  //     // The timer simulates the loading time to prevent flashing too fast,
  //     setTimeout(() => {
  //       appStore.setPageLoading(false);
  //     }, 220);
  //   }
  //   return true;
  // });
}

/**
 * 切换路由时，用于关闭当前页面以完成请求的界面
 * @param router
 */
function createHttpGuard(router: Router) {
  // const { removeAllHttpPending } = projectSetting;
  const removeAllHttpPending = true
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // 切换路由将删除上一个请求
    axiosCanceler?.removeAllPending();
    return true;
  });
}

// 路由开关返回顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const body = document.body;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0);
    return true;
  });
}

/**
 * 用于在切换路由时关闭消息实例
 * @param router
 */
export function createMessageGuard(router: Router) {
  // const { closeMessageOnSwitch } = projectSetting;

  router.beforeEach(async () => {
    // try {
    //   if (closeMessageOnSwitch) {
    //     Modal.destroyAll();
    //     notification.destroy();
    //   }
    // } catch (error) {
    //   warn('message guard error:' + error);
    // }
    return true;
  });
}

export function createProgressGuard(router: Router) {
  // const { getOpenNProgress } = useTransitionSetting();
  const getOpenNProgress = true
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}

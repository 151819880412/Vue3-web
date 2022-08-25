import type { Router } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { usePermissionStore } from '@/piniaStore/modules/permission';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // const tabStore = useMultipleTabStore();
    // const userStore = useUserStore();
    // const appStore = useAppStore();
    const permissionStore = usePermissionStore();
    // 只需进入登录页面并清除身份验证信息
    if (to.path === PageEnum.BASE_LOGIN) {
      // appStore.resetAllState();
      permissionStore.resetState();
      // tabStore.resetState();
      // userStore.resetState();
      // removeTabChangeListener();
    }
  });
}

import { usePermissionStoreWithOut } from '@/piniaStore/modules/permission';
import type { Router } from 'vue-router';
import { Menu } from '../types';


export function createParamMenuGuard(router: Router) {
  const permissionStore = usePermissionStoreWithOut();
  router.beforeEach(async (to, _, next) => {
    // 筛选无名称路由
    if (!to.name) {
      next();
      return;
    }

    // 菜单已经建立
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    let menus: Menu[] = [];
    menus = permissionStore.getMenuList;
    console.log(menus)
    next();
  });
}


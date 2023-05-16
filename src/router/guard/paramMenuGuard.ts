import type { Router } from 'vue-router';


export function createParamMenuGuard(router: Router) {
  // const permissionStore = usePermissionStoreWithOut();
  router.beforeEach((to, _, next) => {
    to;
    // // 筛选无名称路由
    // if (!to.name) {
    //   next();
    //   return;
    // }

    // // 菜单已经建立
    // if (permissionStore.getIsDynamicAddedRoute) {
    //   next();
    //   return;
    // }

    // let menus: Menu[] = [];
    // menus = permissionStore.getMenuList;
    // console.log(menus)
    next();
  });
}


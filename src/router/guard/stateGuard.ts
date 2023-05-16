import type { Router } from 'vue-router';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    to;
    // 只需进入登录页面并清除身份验证信息
  });
}
